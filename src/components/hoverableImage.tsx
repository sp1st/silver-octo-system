"use client"

import { useState } from "react"

export default function HoverableImage({hovered, nothovered, roomName}:{hovered : string, nothovered : string, roomName : string}){
    const [isHover, setIsHover] = useState(false);

    return(
        <div className="w-[150px] h-[150px]" onMouseEnter={()=>setIsHover(true)} onMouseLeave={()=>setIsHover(false)}>
            <img src={isHover ? hovered : nothovered} alt={`Link to ${roomName}`}/>
        </div>
    )
}