import React, { useState, useEffect } from 'react';


export default function Sprite({
  frameHeight=16,
  frameWidth=16,
  frames,
  repeat=true,
  sheetHeight=64,
  sheetWidth=64,
  spritesheet,
  tickSpeed=234,
}) {
  const [position, setPosition] = useState('0px 0px')
  
  let animation
  
  
  const frameX = I=>(I * frameWidth) % sheetWidth
  
  const frameY = I=>Math.floor((I * frameWidth) / sheetWidth) * frameHeight
  
  
  const drawCurrentFrame = I => {
    const X = frameX(I)
    const Y = frameY(I)
    
    console.log('drawing frame', I, frames, X, Y, frameWidth, frameHeight, sheetHeight, sheetWidth)
    
    setPosition(`left ${X}px top ${Y}px`)
    
    if (repeat) {
      if (I >= frames.length) {
        animation = setTimeout(()=>drawCurrentFrame(0), tickSpeed)
      } else {
        animation = setTimeout(()=>drawCurrentFrame(I+1), tickSpeed)
      }
    } else {
      if (I < frames.length) {
        animation = setTimeout(()=>drawCurrentFrame(I+1), tickSpeed)
      }
    }
  }


  useEffect(() => {
    return () => {
      clearInterval(animation);
    }
  }, [])


  useEffect(() => {
    if (Array.isArray(frames)) {
      drawCurrentFrame(0)
    } else {
      console.error('Sprite frames must be an array of 1 or more', frames)
    }
  }, [frames])


  return <div style={{
      width: `${frameWidth}px`,
      height: `${frameHeight}px`,
      backgroundImage: `url(${spritesheet})`,
      backgroundPosition: `${position}`,
    }}
  />
}