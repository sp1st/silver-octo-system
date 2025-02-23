import { useState } from "react"

export default function CleaningDetail({params} : { params : {cleaningId : number} }){

    const [selected, setSelected] = useState("たたかう");

    return (
        <div className="p-3">
            <div className="text-[10px]">cleaningIdが{params.cleaningId}のお掃除の詳細がこのページに表示されたら嬉しいな～というページです</div>
            <div className="text-[26px] md:text-[32px]">めぐりくる蒼き風</div>
            <div className="m-1">📍キッチンの換気扇を掃除する</div>
            <div className="border-yellow-700 border-4 p-2 border-double bg-yellow-100 m-2 text-[14px] md:text-[18px]">とざされし煙の牢獄。とりはずして清めれば、1年分の煙が解き放たれ、新たな蒼き風を招きいれるであろう。</div>
            <div className="bg-black text-white p-1">
                <div className="py-1 px-4"><span className="visible">▶</span> たたかう</div>
                <div className="py-1 px-4"><span className="invisible">▶</span> ヒントをみる</div>
                <div className="py-1 px-4"><span className="invisible">▶</span> にげる</div>
            </div>
        </div>
    )
}