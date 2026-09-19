import { useEffect, type RefObject } from 'react'

const REVERSE_STEP = 1 / 60

/**
 * Seamless ping-pong playback: forward to the end, then back to 0, forever.
 *
 * Negative `playbackRate` is the obvious implementation but neither Safari nor
 * Chrome honours it reliably — both silently clamp it back to a positive value.
 * So we try it, read it back, and when it did not stick we drive the rewind
 * ourselves by stepping `currentTime` down one frame per rAF tick.
 *
 * When `enabled` is false (reduced motion, or mobile where we show the poster
 * instead) the video is parked on frame 0 and nothing animates.
 */
export function usePingPongVideo(
  ref: RefObject<HTMLVideoElement | null>,
  enabled = true,
) {
  useEffect(() => {
    const video = ref.current
    if (!video) return

    if (!enabled) {
      video.pause()
      try {
        video.currentTime = 0
      } catch {
        /* metadata not in yet — the poster covers us */
      }
      return
    }

    let raf = 0
    let rewinding = false
    let cancelled = false

    const stepBack = () => {
      if (cancelled || !rewinding) return
      const next = video.currentTime - REVERSE_STEP

      if (next <= 0) {
        // Back at the head: hand control to normal forward playback.
        video.currentTime = 0
        rewinding = false
        raf = 0
        video.playbackRate = 1
        void video.play().catch(() => {})
        return
      }

      video.currentTime = next
      raf = requestAnimationFrame(stepBack)
    }

    const startRewind = () => {
      const end = Number.isFinite(video.duration) ? video.duration : 0
      video.currentTime = Math.max(0, end - REVERSE_STEP)
      raf = requestAnimationFrame(stepBack)
    }

    const onEnded = () => {
      if (rewinding) return
      rewinding = true

      // Attempt the native route first.
      try {
        video.playbackRate = -1
      } catch {
        /* throws on some engines instead of clamping */
      }

      if (video.playbackRate === -1) {
        void video.play().catch(() => {
          video.playbackRate = 1
          video.pause()
          startRewind()
        })
        return
      }

      // Clamped back to a positive rate — rewind by hand.
      video.playbackRate = 1
      video.pause()
      startRewind()
    }

    // Pause the rAF rewind while the tab is hidden; rAF stalls there anyway,
    // this just keeps us from resuming mid-rewind with a stale frame.
    const onVisibility = () => {
      if (document.hidden) {
        if (raf) cancelAnimationFrame(raf)
        raf = 0
      } else if (rewinding && !raf) {
        raf = requestAnimationFrame(stepBack)
      } else if (!rewinding) {
        void video.play().catch(() => {})
      }
    }

    video.addEventListener('ended', onEnded)
    document.addEventListener('visibilitychange', onVisibility)
    void video.play().catch(() => {})

    return () => {
      cancelled = true
      rewinding = false
      if (raf) cancelAnimationFrame(raf)
      video.removeEventListener('ended', onEnded)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [ref, enabled])
}
