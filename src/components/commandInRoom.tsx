"use client"

import { FC, useState } from "react";

interface CommandProps {
    label: string;
    done: boolean
}

const CommandInRoom: FC<CommandProps> = (props) => {
    const [selected, setSelected] = useState<boolean>();

    return (
        <div className="py-1 px-4 cursor-pointer flex items-center" onMouseEnter={() => setSelected(true)} onMouseLeave={()=>setSelected(false)}>
            <span className={selected === true ? "visible" : "invisible"}>▶ </span>
            {props.label}
            {props.done 
            ? <div><img src="/CLEAR.png" alt="CLEAR" className="w-[70px] mx-3"/></div> 
            : ""}

        </div>
    );
};

export default CommandInRoom;