"use client"

import Loading from "@/app/loading";
import Link from "next/link";
import { useEffect, useState } from "react";
import Hint from "@/components/hint";
import Image from "next/image";
import DoneQuest from "@/components/doneQuest";
import Result from "@/components/result";
import { useSession } from "next-auth/react";
import Command from "@/components/command";

export default function CleaningDetail({params} : { params : Promise<{ cleaningId: number, roomId: string}> }){

    interface CleaningData {
        roomId: string;
        cleaningId: string;
        cleaningName: string;
        cleaningDetail: string;
        Description: string;
        hint: string;
    }

    const [isShowHint, setIsShowHint] = useState(false);
    const [cleaningData, setCleaningData] = useState<CleaningData | null>(null);
    const [fightingStatus, setFightingStatus] = useState("未着手");
    const [userId, setUserId] = useState<string | null>(null);

    const {data : session} = useSession();
    const userEmail = session?.user?.email;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    useEffect(
        ()=>{
            async function getCleaningData(){

                if (!userEmail) return;

                const { cleaningId, roomId } = await params;
                const _cleaningDatas_ = await fetch(`${baseUrl}/api/v1/room/${roomId}/${cleaningId}`);
                const cleaningDatas = await _cleaningDatas_.json();

                const userIdObj = await fetch(`${baseUrl}/api/v1/user/${userEmail}`);
                const userIdData = await userIdObj.json();
                const userId = userIdData.id;
                setUserId(userId);

                const userCleaning = await fetch(`${baseUrl}/api/v1/room/${roomId}/${cleaningId}/${userId}`);
                const userCleaningData = await userCleaning.json();
                if (userCleaningData[0].done){
                    setFightingStatus("討伐済み")
                };

                setCleaningData(cleaningDatas[0]);
            }
            getCleaningData();
        }, [userEmail]
    )

    function CommandsArea(){
        return (
            <div className="bg-black text-white p-4 border-double border-8 border-white rounded-md">
            {fightingStatus === "未着手" ? <div onClick={()=>{setFightingStatus("討伐中")}}>
                <Command label="たたかう"/>
            </div> : ""}

            {isShowHint ? "" :
             <div onClick={()=>setIsShowHint(true)}>
                <Command label="ヒントをみる"/>
            </div>}

            {fightingStatus === "討伐中" ? 
            <div onClick = {async ()=>{
                await fetch(`${baseUrl}/api/v1/user_cleaning/done`, {
                    method : "PUT",
                    body : JSON.stringify({
                            userId: userId,
                            cleaningId: cleaningData?.cleaningId,
                            done: true }),
                    headers : {"Content-Type":"application/json"}
                });
                setFightingStatus("リザルト画面");
            }}>
                     <Command label="討伐完了"/>
            </div> : ""}

            <Link href="./">
                <Command label="にげる"/>
            </Link>
        </div>
        )
    }

    return (
        <>
        { cleaningData === null ? <Loading />: 
        <div className="p-3">
            <div className="text-[26px] md:text-[32px]">{cleaningData.cleaningName}</div>
            <div className="m-1">📍{cleaningData.cleaningDetail}</div>
            <div className="border-yellow-700 border-4 p-2 border-double bg-yellow-100 m-2 text-black text-[14px] md:text-[18px]">{cleaningData.Description}</div>

            { fightingStatus === "討伐済み" ? <DoneQuest /> : "" }

            {fightingStatus === "討伐中" ? 
            <div className="m-2 text-center my-4">
                <div className="text-[24px]">討伐中...</div>
                <div className="flex justify-center my-4">
                    <Image src="/battle.gif" alt="戦っているGIF" width={400} height={300} unoptimized />
                </div>
            </div>
            : ""}

            {isShowHint ? <Hint hintText = {cleaningData.hint} /> : ""}

            {fightingStatus === "未着手" || fightingStatus === "討伐中" 
            ? <CommandsArea />
            : "" }

            {fightingStatus === "リザルト画面" ? <Result /> : ""}

        </div>
        } </>
    )
}