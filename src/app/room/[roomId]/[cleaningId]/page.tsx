"use client"

import Loading from "@/components/loading";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import Hint from "@/components/hint";
import Image from "next/image";

export default function CleaningDetail({params} : { params : Promise<{cleaningId : number, roomId:string}> }){

    interface CleaningData {
        roomId: string;
        cleaningId: string;
        cleaningName: string;
        cleaningDetail: string;
        Description: string;
        hint: string;
    }

    const [selected, setSelected] = useState("たたかう");
    const [isShowHint, setIsShowHint] = useState(false);
    const [cleaningData, setCleaningData] = useState<CleaningData | null>(null);
    const [isFighting, setIsFighting] = useState(false);

    useEffect(
        ()=>{
            async function getCleaningData(){
                const id = (await params).cleaningId;
                const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
                const _cleaningDatas_ = await fetch(`${baseUrl}/api/v1/room/kitchen/${id}`);
                const cleaningDatas = await _cleaningDatas_.json();
                setCleaningData(cleaningDatas[0]);
            }
            getCleaningData();
        }, []
    )

    interface CommandProps {
        label: string;
    }
    
    const Command: FC<CommandProps> = (props) => {
        const label = props.label;
    
        return (
            <div className="py-1 px-4 cursor-pointer" onMouseEnter={() => setSelected(label)}>
                <span className={selected === label ? "visible" : "invisible"}>▶</span>
                {props.label}
            </div>
        );
    };

    return (
        <>
        { cleaningData === null ? <Loading />: 
        <div className="p-3">
            <div className="text-[26px] md:text-[32px]">{cleaningData.cleaningName}</div>
            <div className="m-1">📍{cleaningData.cleaningDetail}</div>
            <div className="border-yellow-700 border-4 p-2 border-double bg-yellow-100 m-2 text-black text-[14px] md:text-[18px]">{cleaningData.Description}</div>

            {isFighting ? 
            <div className="m-2 text-center my-4">
                <div className="text-[24px]">討伐中...</div>
                <div className="flex justify-center my-4">
                    <Image src="/battle.gif" alt="戦っているGIF" width={400} height={300} unoptimized />
                </div>
            </div>
            : ""}
            
            {isShowHint ? <Hint hintText = {cleaningData.hint} /> : ""}

            <div className="bg-black text-white p-4 border-double border-8 border-white rounded-md">
                {isFighting ? "": <div onClick={()=>{setIsFighting(true)}}>
                    <Command label="たたかう"/>
                </div>}

                {isFighting ? <div onClick={()=>{
                        setIsFighting(false)
                    }}>
                        <Link href={`/room/${cleaningData.roomId}/${cleaningData.cleaningId}/result`}>
                            <Command label="討伐完了"/>
                        </Link>
                </div> : ""}

                {isShowHint ? "" :
                 <div onClick={()=>setIsShowHint(true)}>
                    <Command label="ヒントをみる"/>
                </div>}

                <Link href="./">
                    <Command label="にげる"/>
                </Link>
            </div>
        </div>
        } </>
    )
}