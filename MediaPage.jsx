import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import './MediaPage.css'

const MediaPage = () => {
  const [media, setMedia] = useState({ photo: [], video: [], others: [] })
  const [activeMenu, setActiveMenu] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const menuRefs = useRef([])
  const location = useLocation()

  const queryParams = new URLSearchParams(location.search)
  const type = queryParams.get('type')

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('media') || '{}')
    setMedia(stored)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!menuRefs.current.some((ref) => ref?.contains(event.target))) {
        setActiveMenu(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleDelete = (index) => {
    const updated = { ...media }
    updated[type].splice(index, 1)
    setMedia(updated)
    localStorage.setItem('media', JSON.stringify(updated))
    setActiveMenu(null)
  }

  const handleDownload = (url) => {
    const a = document.createElement('a')
    a.href = url
    a.download = 'downloaded-file'
    a.click()
  }

  const handleShare = async (url) => {
    try {
      await navigator.share({ title: 'Media Share', url })
    } catch {
      alert('Sharing failed or not supported in this browser.')
    }
  }

  const renderMedia = () => {
    const items = media[type] || []

    if (type === 'photo') {
      return (
        <div className="media-grid">
          {items.map((url, i) => (
            <div className="media-item" key={i}>
              <img
                src={url}
                alt={`uploaded-${i}`}
                onClick={() => setPreviewUrl(url)}
              />
              <div className="menu-wrapper" ref={(el) => (menuRefs.current[i] = el)}>
                <button
                  className="menu-dots"
                  onClick={() => setActiveMenu(activeMenu === i ? null : i)}
                >
                  ⋮
                </button>
                {activeMenu === i && (
                  <div className="dropdown">
                    <button onClick={() => handleDelete(i)}>🗑️</button>
                    <button onClick={() => handleDownload(url)}>⬇️</button>
                    <button onClick={() => handleShare(url)}>🔗</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )
    }

    if (type === 'video') {
      return (
        <div className="media-grid">
          {items.map((url, i) => (
            <div className="media-item" key={i}>
              <video src={url} controls />
            </div>
          ))}
        </div>
      )
    }

    if (type === 'others') {
      return (
        <ul className="others-list">
          {items.map((url, i) => (
            <li key={i}>
              <a href={url} download target="_blank" rel="noreferrer">
                Download File {i + 1}
              </a>
            </li>
          ))}
        </ul>
      )
    }

    return <p>No media type selected.</p>
  }

  return (
    <div className="media-container">
      <button className="back-button" onClick={() => (window.location.href = '/')}>
        ⬅ Back
      </button>
      <h2>
        {type === 'photo' ? '📷 Photos' : type === 'video' ? '🎥 Videos' : '📎 Others'}
      </h2>

      {renderMedia()}

      {previewUrl && (
        <div className="preview-overlay" onClick={() => setPreviewUrl(null)}>
          <div className="preview-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setPreviewUrl(null)}>✖</button>
            <img src={previewUrl} alt="Preview" />
          </div>
        </div>
      )}
    </div>
  )
}

export default MediaPage