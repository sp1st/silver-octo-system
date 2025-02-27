import Link from "next/link";

export default function DoneQuest(){
    const randomMurabitoWords = ["あの伝説の戦闘の日から、この地では、勇者のウワサで、もちきりなのです。",
        "長年放置されてきた汚れにも、ひるまず立ち向かう姿、勇ましゅうございました。",
        "勇者の力で、この地に、正義と清潔が取り戻されたのでございます。"
    ]

    const randomMurabitoWord = randomMurabitoWords[Math.floor(Math.random() * randomMurabitoWords.length)]

    return(
        <div className="text-center text-[20px]">
            討伐済みのクエストです
            <div className="flex">
                <div className="m-1">
                    <div className="bg-gray-100 text-black w-[100px] h-[100px] text-[10px]">村人の顔のイラスト</div>
                    村人
                </div>
                <div className="text-[15px] p-2 m-2">
                    {randomMurabitoWord}
                </div>
            </div>
            <div className="flex justify-center">
                <Link href={"./"}>
                    <img src="/area-button.png" alt="エリア画面にもどる" className="w-[200px]"/>
                </Link>
            </div>
        </div>
    )
}