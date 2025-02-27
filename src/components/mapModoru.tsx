import Link from "next/link";

export default function MapModoruLink(){
    return(
        <Link href="/">
            <img src="/map-button.png" alt="マップに戻る" className="w-[150px] m-3"/>
        </Link>
    )
}