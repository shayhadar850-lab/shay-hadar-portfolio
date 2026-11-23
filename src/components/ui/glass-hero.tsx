import { useEffect, useRef, useState } from "react"
import { GlassFold } from "./glass-fold"

export function GlassHero() {
  const [available, setAvailable] = useState<boolean | null>(null)
  const [paused, setPaused] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (available !== false || !video) return

    const motion = matchMedia("(prefers-reduced-motion: reduce)")
    let visible = false
    const update = () => {
      if (motion.matches || paused || !visible || document.hidden) {
        video.pause()
        return
      }
      if (!video.hasAttribute("src")) {
        const format = video.canPlayType('video/webm; codecs="vp9"') ? "webm" : "mp4"
        video.src = new URL("media/glass-fold." + format, document.baseURI).href
      }
      void video.play().catch((error: DOMException) => {
        if (error.name === "NotAllowedError") setPaused(true)
      })
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      update()
    })
    observer.observe(video)
    motion.addEventListener("change", update)
    document.addEventListener("visibilitychange", update)
    return () => {
      observer.disconnect()
      motion.removeEventListener("change", update)
      document.removeEventListener("visibilitychange", update)
      video.pause()
    }
  }, [available, paused])

  return (
    <>
      <div className="glass-hero-art" aria-hidden="true">
        {available === false && <video ref={videoRef} muted loop playsInline preload="none" className="glass-hero-video" />}
        <GlassFold color1="#1e3cc8" color2="#06081e" color3="#96d7ff" speed={paused ? 0 : 1.25} noise={0.12} scale={1} onAvailabilityChange={setAvailable} className={available === true ? "block size-full" : "block size-full opacity-0"} />
      </div>
      {available !== null && (
        <button type="button" className="glass-motion-toggle" aria-label="השהיית אנימציית הבאנר" aria-pressed={paused} title={paused ? "הפעלת אנימציית הבאנר" : "השהיית אנימציית הבאנר"} onClick={() => setPaused(!paused)}>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            {paused
              ? <path d="M7.5 5.5 14 10l-6.5 4.5z" stroke="currentColor" strokeWidth="1.65" strokeLinejoin="round" />
              : <path d="M7 5v10m6-10v10" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" />}
          </svg>
        </button>
      )}
    </>
  )
}
