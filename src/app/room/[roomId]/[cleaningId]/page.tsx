"use client"

import Loading from "@/components/loading";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import Hint from "@/components/hint";

export default function CleaningDetail({params} : { params : Promise<{cleaningId : number, roomId:string}> }){

    const [selected, setSelected] = useState("たたかう");
    const [isShowHint, setIsShowHint] = useState(false);
    const [cleaningData, setCleaningData] = useState(null);
    const [isFighting, setIsFighting] = useState(false);

    useEffect(
        ()=>{
            async function getCleaningData(){
                const id = (await params).cleaningId;
                const _cleaningDatas_ = await fetch(`http://localhost:3000/api/v1/room/kitchen/${id}`);
                const cleaningDatas = await _cleaningDatas_.json();
                setCleaningData(cleaningDatas[0]);
            }
            getCleaningData();
        }, []
    )

    function Command(props){
        const label = props.label;

        return (
            <div className="py-1 px-4 cursor-pointer" onMouseEnter={()=>setSelected(label)}>
                <span className={selected === label ? "visible" : "invisible"}>▶</span>
                {props.label}
            </div>
        )
    }

    return (
        <>
        { cleaningData === null ? <Loading />: 
        <div className="p-3">
            <div className="text-[26px] md:text-[32px]">{cleaningData.cleaningName}</div>
            <div className="m-1">📍{cleaningData.cleaningDetail}</div>
            <div className="border-yellow-700 border-4 p-2 border-double bg-yellow-100 m-2 text-[14px] md:text-[18px]">{cleaningData.Description}</div>
            {isShowHint ? <Hint hintText = {cleaningData.hint} /> : ""}

            <div className="bg-black text-white p-1">
                {isFighting ? "": <div onClick={()=>{setIsFighting(true)}}>
                    <Command label="たたかう"/>
                </div>}

                {isFighting ? <div onClick={()=>{setIsFighting(false)}}>
                    <Command label="討伐完了"/>
                </div> : ""}

                {isShowHint ? "" :
                 <div onClick={()=>setIsShowHint(true)}>
                    <Command label="ヒントをみる"/>
                </div>}

                <Link href="./">
                    <Command label="にげる"/>
                </Link>
            </div>

            {isFighting ? 
            <div className="m-2 text-center">
                <div className="text-[24px]">討伐中...</div>
                <div className="bg-gray-500 m-2 p-2 h-[100px]">ここに戦っていそうなGIFが出てくる</div>
            </div>
            : ""}
        </div>
        } </>
    )
}