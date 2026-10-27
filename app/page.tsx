'use client'

import { useEffect, useRef, useState } from 'react'
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock3,
  Compass,
  Heart,
  House,
  MapPin,
  Share2,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react'

const mapsUrl = 'https://maps.app.goo.gl/gvWs74KFF6YfDXgS7?g_st=ac'
const eventDate = new Date('2026-12-05T11:00:00+05:30')
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

function Countdown() {
  const [remaining, setRemaining] = useState<ReturnType<typeof getRemaining> | null>(null)

  useEffect(() => {
    setRemaining(getRemaining())
    const timer = window.setInterval(() => setRemaining(getRemaining()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const items = [
    ['Days', remaining?.days ?? '--'],
    ['Hours', remaining?.hours ?? '--'],
    ['Minutes', remaining?.minutes ?? '--'],
    ['Seconds', remaining?.seconds ?? '--'],
  ]

  return (
    <div className="countdown" aria-label="Countdown to the housewarming ceremony">
      {items.map(([label, value], index) => (
        <div className="countdown-item" key={label}>
          <strong>{String(value).padStart(2, '0')}</strong>
          <span>{label}</span>
          {index < items.length - 1 && <i aria-hidden="true">:</i>}
        </div>
      ))}
    </div>
  )
}

function getRemaining() {
  const difference = Math.max(0, eventDate.getTime() - Date.now())
  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference / 3600000) % 24),
    minutes: Math.floor((difference / 60000) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

export default function Page() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const musicEnabledRef = useRef(true)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [musicError, setMusicError] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isOpening, setIsOpening] = useState(true)
  const [language, setLanguage] = useState<'en' | 'ml'>('en')
  const isMalayalam = language === 'ml'
  const copy = isMalayalam ? {
    invited: 'താങ്കളെയും കുടുംബത്തെയും സ്നേഹപൂർവ്വം ക്ഷണിക്കുന്നു',
    invitation: 'സ്നേഹപൂർവ്വം',
    title: 'ഗൃഹപ്രവേശനം',
    ceremony: 'ഞങ്ങളുടെ പുതിയ ഭവനത്തിന്റെ ഗൃഹപ്രവേശന ചടങ്ങിലേക്ക് താങ്കളെയും കുടുംബത്തെയും സ്നേഹപൂർവ്വം ക്ഷണിക്കുന്നു.',
    date: 'തീയതി', time: 'സമയം', location: 'സ്ഥലം',
    until: 'നാം ഒരുമിക്കുന്നതുവരെ',
    directions: 'വഴി കാണുക', save: 'തീയതി ഓർമ്മിക്കുക', share: 'ക്ഷണം പങ്കിടുക', copied: 'ലിങ്ക് പകർത്തി',
    regards: 'സ്നേഹപൂർവ്വം', blessing: 'സ്നേഹം നിറഞ്ഞ ഭവനം, അനുഗ്രഹീതമായ തുടക്കം.',
  } : {
    invited: 'You are cordially invited', invitation: 'You are warmly invited', title: 'Housewarming',
    ceremony: 'Warmly invite you and your family to the housewarming ceremony of our new home.',
    date: 'Date', time: 'Time', location: 'Location', until: 'Until we gather',
    directions: 'Get Directions', save: 'Save the date', share: 'Share invitation', copied: 'Link copied',
    regards: 'Warm regards', blessing: 'A blessed beginning, a home filled with love.',
  }

  function openInvitation() {
    setIsOpening(false)
  }

  async function playMusic() {
    if (!audioRef.current) return
    setMusicError(false)
    audioRef.current.volume = 0.3
    try {
      await audioRef.current.play()
    } catch {
      setMusicError(true)
    }
  }

  function toggleMusic() {
    if (isMusicPlaying) {
      musicEnabledRef.current = false
      audioRef.current?.pause()
    } else {
      musicEnabledRef.current = true
      void playMusic()
    }
  }

  async function shareInvitation() {
    const shareData = { title: 'Housewarming at AL – NIMAH', text: 'You are warmly invited to our housewarming ceremony.', url: window.location.href }
    if (navigator.share) {
      await navigator.share(shareData).catch(() => undefined)
      return
    }
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2200)
  }

  return (
    <main className="invitation-page" lang={language} style={{ backgroundImage: `url('${basePath}/courtyard-backdrop.png')` }}>
      <audio ref={audioRef} src={`${basePath}/invitation-music.mp3`} loop preload="auto" onPlay={() => setIsMusicPlaying(true)} onPause={() => setIsMusicPlaying(false)} onError={() => { setIsMusicPlaying(false); setMusicError(true) }} />
      <div className="music-control">
        <button type="button" onClick={toggleMusic} aria-pressed={isMusicPlaying} aria-label={isMusicPlaying ? (isMalayalam ? 'സംഗീതം നിർത്തുക' : 'Pause music') : (isMalayalam ? 'സംഗീതം കേൾക്കുക' : 'Play music')}>
          {isMusicPlaying ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
          <span>{isMalayalam ? 'സംഗീതം' : 'Music'}</span>
        </button>
        {musicError && <p role="status">{isMalayalam ? 'വീണ്ടും ശ്രമിക്കുക' : 'Tap to try music again'}</p>}
      </div>
      <div className="language-toggle" role="group" aria-label="Choose language">
        <button type="button" className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')} aria-pressed={language === 'en'}>EN</button>
        <button type="button" className={language === 'ml' ? 'active' : ''} onClick={() => setLanguage('ml')} aria-pressed={language === 'ml'}>മലയാളം</button>
      </div>
      <div className={`opening-screen${isOpening ? '' : ' opening-screen--closed'}`} aria-hidden={!isOpening}>
        <div className="opening-arch" aria-hidden="true"><div className="opening-star" /><div className="opening-moon" /></div>
        <div className="opening-content">
          <p className="opening-arabic" dir="rtl">أهلاً وسهلاً</p>
          <p className="opening-subtitle">{isMalayalam ? copy.invited : 'You are warmly invited'}</p>
          <div className="opening-rule"><span /> <i>✦</i> <span /></div>
          <p className="opening-name">AL – NIMAH</p>
          <p className="opening-date">{isMalayalam ? 'ഗൃഹപ്രവേശന ആഘോഷം' : 'A housewarming celebration'}</p>
          <button className="opening-button" type="button" onClick={() => { openInvitation(); if (musicEnabledRef.current) void playMusic() }} autoFocus={isOpening}>{isMalayalam ? 'ക്ഷണം തുറക്കുക' : 'Open Invitation'} <ArrowUpRight aria-hidden="true" /></button>
          <p className="opening-hint">{isMalayalam ? 'തുറക്കാന്‍ ടാപ്പ് ചെയ്യുക' : 'Tap to open with music'}</p>
        </div>
      </div>
      <div className="arch-glow" aria-hidden="true" />
      <div className="leaf-spray leaf-spray-top" aria-hidden="true"><span /><span /><span /><span /><span /></div>
      <div className="leaf-spray leaf-spray-bottom" aria-hidden="true"><span /><span /><span /><span /></div>
      {['left', 'right'].map(side => (
        <div className={`lantern lantern--${side}`} key={side} aria-hidden="true"><div className="lantern-chain" /><div className="lantern-hook" /><div className="lantern-cap" /><div className="lantern-body"><span /><span /><span /><span /></div><div className="lantern-base" /><div className="lantern-tassel" /></div>
      ))}

      <section className="invitation-shell">
        <div className="arch-frame">
          <div className="arch-inner">
            <header className="welcome-header">
              <div className="moon" aria-hidden="true" />
              <p className="arabic" dir="rtl">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
              <p className="translation">In the name of Allah, the Most Gracious, the Most Merciful.</p>
              <div className="ornament"><span /> <Sparkles aria-hidden="true" /> <span /></div>
            </header>

            <div className="intro-copy">
              <p className="eyebrow">{isMalayalam ? copy.invitation : copy.invited}</p>
              {!isMalayalam && <h1>{copy.title}</h1>}
              {!isMalayalam && <div className="gold-rule"><span /> <Heart aria-hidden="true" fill="currentColor" /> <span /></div>}
              <h2>Mr. Haris MK <em>&amp;</em> Mrs. Ruveena VR</h2>
              {isMalayalam && <h1>{copy.title}</h1>}
              {isMalayalam && <div className="gold-rule"><span /> <Heart aria-hidden="true" fill="currentColor" /> <span /></div>}
              {!isMalayalam && <p className="invitation-text">{copy.ceremony}</p>}
            </div>

            {isMalayalam && <p className="invitation-text malayalam invitation-message">{copy.ceremony}</p>}
            <div className="home-name"><span className="home-flourish">❧</span><strong>AL – NIMAH</strong><span className="home-flourish flip">❧</span></div>

            <div className="event-details">
              <div className="detail-item"><CalendarDays aria-hidden="true" /><div><span>{copy.date}</span><strong>{isMalayalam ? 'ശനിയാഴ്ച, 5 ഡിസംബർ 2026' : 'Saturday, 5 December 2026'}</strong></div></div>
              <div className="detail-item"><Clock3 aria-hidden="true" /><div><span>{copy.time}</span><strong>{isMalayalam ? 'രാവിലെ 11:00 മുതൽ' : '11:00 AM onwards'}</strong></div></div>
              <div className="detail-item"><House aria-hidden="true" /><div><span>{copy.location}</span><strong>Manikkoth kandi, Kummamkode</strong></div></div>
            </div>

            <div className="countdown-block"><p className="section-kicker">{copy.until}</p><Countdown /></div>

            <div className="actions">
              <a className="button primary" href={mapsUrl} target="_blank" rel="noreferrer"><MapPin data-icon="inline-start" /> {copy.directions} <ArrowUpRight data-icon="inline-end" /></a>
              <button className="button secondary" type="button" onClick={() => { const blob = new Blob(['BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:20261205T053000Z\nDTEND:20261205T083000Z\nSUMMARY:Housewarming at AL – NIMAH\nLOCATION:Manikkoth kandi, Kummamkode\nEND:VEVENT\nEND:VCALENDAR'], { type: 'text/calendar' }); const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = 'al-nimah-housewarming.ics'; link.click(); URL.revokeObjectURL(url) }}><CalendarDays data-icon="inline-start" /> {copy.save}</button>
              <button className="button quiet" type="button" onClick={shareInvitation}>{copied ? <Check data-icon="inline-start" /> : <Share2 data-icon="inline-start" />} {copied ? copy.copied : copy.share}</button>
            </div>

            <footer className="closing"><div className="ornament"><span /> <Sparkles aria-hidden="true" /> <span /></div><p className="script">{copy.regards}</p><p>Haleema, Aamil Imran &amp; Dua Daneen</p><small><Compass aria-hidden="true" /> {copy.blessing}</small></footer>
          </div>
        </div>
        <p className="site-credit" lang="en">Created by <a href="https://kadathanadtimes.com/about" target="_blank" rel="noopener noreferrer">Team Kadathanad Times</a></p>
      </section>
    </main>
  )
}
