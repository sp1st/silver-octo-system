interface HintProps {
    hintText : string;
}

export default function Hint({hintText} : HintProps){

    const juso = hintText.includes("重曹");
    const kuensan = hintText.includes("クエン酸");
    const senzai = hintText.includes("洗剤");

    return (
        <div className="m-2 flex p-2">
                <img src="/kenja.png" className="m-1 w-[70px] h-[70px] sm:w-[100px] sm:h-[100px]" alt="賢者"/>
                <div className="text-[14px] sm:text-[18px]">
                    <div><div className="bg-blue-700 text-white inline-block p-1 px-2 rounded">賢者のひとこと</div></div>
                    {hintText}
                    <div className="flex">効果◎
                        {juso ? <div className="text-[12px] m-1"><img src="/重曹.png" alt="重曹" className="w-[40px]"/>ｼﾞｭｰｿｰ</div> : ""}
                        {kuensan ? <div className="text-[12px] m-1"><img src="/クエン酸.png" alt="クエン酸" className="w-[40px]"/>ｸｴﾝｻﾝ</div> : ""}
                        {senzai ? <div className="text-[12px] m-1"><img src="/洗剤.png" alt="洗剤" className="w-[40px]"/>ｾﾝｻﾞｲ</div> : ""}

                    </div>
                </div>
            </div>
    )
}