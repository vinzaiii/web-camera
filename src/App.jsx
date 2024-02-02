import React, { useEffect, useRef, useState } from 'react'

const App = () => {
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const [tanlash, setTanlash] = useState(false)

    const startStream = () => {
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
      }).then((stream) => {
        videoRef.current.srcObject = stream
        videoRef.current.onloadedmetadata =() => videoRef.current.play()
      }).catch((err) => {
        alert(err)
      })
    }

    const stopStream = () => {
      if (streamRef.current) {
        streamRef.current.getTracks().map((el) => el.stop())
      }
    }

    useEffect(() => {
      stopStream()
      if (tanlash) startStream()
    },[tanlash])

  return (
    <>
    <div className="wrapper">
      <video 
      muted 
      autoPlay 
      playsInline 
      ref={videoRef}
      style={{display: tanlash ? 'block' : 'none'}}
      ></video>
      <div className="controls">
        <button onClick={() => setTanlash(!tanlash)}>
          {tanlash ? 'Off' : 'On'}
        </button>
      </div>
    </div>
    </>
  )
}

export default App