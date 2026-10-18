import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Music, VolumeX } from 'lucide-react'
import { config } from '../config'

/**
 * Floating play/pause button for optional background music.
 * Hidden entirely when config.musicFile is null or the audio fails to load.
 * Never autoplays — the user must click to start.
 */
const MusicToggle = () => {
  const [playing, setPlaying] = useState(false)
  const [errored, setErrored] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    if (!config.musicFile) return

    const audio = new Audio(config.musicFile)
    audio.loop = true
    audio.volume = 0.3
    audio.preload = 'none'

    const onError = () => setErrored(true)
    audio.addEventListener('error', onError)
    audioRef.current = audio

    return () => {
      audio.pause()
      audio.removeEventListener('error', onError)
      audioRef.current = null
    }
  }, [])

  if (!config.musicFile || errored) return null

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().catch(() => setErrored(true))
      setPlaying(true)
    }
  }

  return (
    <motion.button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-30 p-3.5 rounded-full glass border border-rose-gold/20 cursor-pointer select-none"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.9 }}
      aria-label={playing ? 'Pause music' : 'Play music'}
      title={playing ? 'Pause music' : 'Play music'}
    >
      {playing ? (
        <Music className="text-rose-gold" size={20} />
      ) : (
        <VolumeX className="text-rose-gold/45" size={20} />
      )}
    </motion.button>
  )
}

export default MusicToggle

