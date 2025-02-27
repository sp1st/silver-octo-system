"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

export default function DoneQuest(){
    const randomMurabitoWords = ["あの伝説の戦闘の日から、この地では、勇者のウワサで、もちきりなのです。",
        "長年放置されてきた汚れにも、ひるまず立ち向かう姿、勇ましゅうございました。",
        "勇者の力で、この地に、正義と清潔が取り戻されたのでございます。"
    ]

    const [ randomMurabitoWord, setRandomMurabitoWord ] = useState("");

    useEffect(
        ()=>{
            setRandomMurabitoWord(randomMurabitoWords[Math.floor(Math.random() * randomMurabitoWords.length)]);
        }, []
    )

    return(
        <div className="text-center text-[20px] my-10">
            討伐済みのクエストです
            <div className="flex my-4">
                <div className="m-1">
                    <div className=" text-black w-[100px] h-[100px] text-[10px]">
                        <img src="/noka.png" className="m-1 w-[70px] h-[70px] sm:w-[100px] sm:h-[100px]" alt="村人"/>
                    </div>
                    村人
                </div>
                <div className="test-y-center text-[15px] p-2 m-2">
                    {randomMurabitoWord}
                </div>
            </div>
            <div className="flex justify-center m-5">
                <Link href={"./"}>
                    <img src="/area-button.png" alt="エリア画面にもどる" className="w-[200px]"/>
                </Link>
            </div>
        </div>
    )
}