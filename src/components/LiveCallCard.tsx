import { LoopingWave } from './AudioWave'

export function LiveCallCard({ className = '' }: { className?: string }) {
  return (
    <div className={`liquid-glass rounded-2xl p-5 max-w-sm ${className}`}>
      <div className="flex items-center gap-3">
        <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
          <span className="aria-pulse absolute inline-flex h-full w-full rounded-full bg-[#3BB7A8]" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3BB7A8]" />
        </span>
        <p className="text-xs font-light tracking-wide text-[#F2F6F5]/90">
          En llamada <span className="text-[#8FA09E]">· 02:14</span>
        </p>
      </div>

      <LoopingWave bars={24} className="mt-5 h-7 w-full" />

      <p className="mt-4 text-xs font-light leading-relaxed text-[#8FA09E]">
        «Tengo un turno mañana a las 16:40 con la Dra. Sosa. ¿Se lo confirmo?»
      </p>
    </div>
  )
}
