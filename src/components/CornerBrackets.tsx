/**
 * Four 20x20 L-brackets, one per corner, drawn from a single path that is
 * rotated into place. The corner is rounded with a 5px quadratic.
 */
const PATH = 'M 2 18 L 2 7 Q 2 2 7 2 L 18 2'

const CORNERS = [
  { pos: 'left-0 top-0', rotate: 0 },
  { pos: 'right-0 top-0', rotate: 90 },
  { pos: 'right-0 bottom-0', rotate: 180 },
  { pos: 'left-0 bottom-0', rotate: 270 },
]

export function CornerBrackets() {
  return (
    <>
      {CORNERS.map(({ pos, rotate }) => (
        <svg
          key={pos}
          aria-hidden="true"
          focusable="false"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          className={`pointer-events-none absolute ${pos}`}
          style={{ transform: `rotate(${rotate}deg)` }}
        >
          <path
            d={PATH}
            fill="none"
            stroke="rgba(59,183,168,0.4)"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </svg>
      ))}
    </>
  )
}
