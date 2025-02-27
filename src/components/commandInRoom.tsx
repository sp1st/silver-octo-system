"use client"

import { FC, useState } from "react";

interface CommandProps {
    label: string;
    done: boolean
}

const Command: FC<CommandProps> = (props) => {
    const [selected, setSelected] = useState<boolean>();

    return (
        <div className="py-1 px-4 cursor-pointer" onMouseEnter={() => setSelected(true)} onMouseLeave={()=>setSelected(false)}>
            <span className={selected === true ? "visible" : "invisible"}>▶ </span>
            {props.label}
            {props.done 
            ? <div className="bg-gray-100 p-1 w-[50px] h-[50px] text-black text-[10px]">完了<br/>バッジ</div> 
            : ""}

        </div>
    );
};

export default Command;