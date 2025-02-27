"use client"

import { FC, useState } from "react";

interface CommandProps {
    label: string;
}

const Command: FC<CommandProps> = (props) => {
    const [selected, setSelected] = useState<boolean>();

    return (
        <div className="py-1 px-4 cursor-pointer" onMouseEnter={() => setSelected(true)} onMouseLeave={()=>setSelected(false)}>
            <span className={selected === true ? "visible" : "invisible"}>▶ </span>
            {props.label}
        </div>
    );
};

export default Command;