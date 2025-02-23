import Link from "next/link";

export default function Room({params} : {params:{roomId : string}}){

    const cleaningNames = ["めぐりくる蒼き風","荒廃せし5つの徳", "美食家には美しき舞台（ダンスホール）を"];

    return (
        <div>
            テスト用のdivです {params.roomId}
            <h1>キッチン</h1>
            {cleaningNames.map(
                (cleaningName, index) => (
                    <Link href={`/room/${params.roomId}/${2}`}>
                        <div className="p-2 bg-black text-white" key={index}>{cleaningName}</div>
                    </Link>
                )
            )}
        </div>
    )
}