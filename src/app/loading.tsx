import Image from "next/image";

export default function Loading(){
    return (
        <div className="m-10 text-[30px] text-center">
            Loading...
            <div className="m-5 mx-auto flex items-center justify-center">
                <Image src="/riceball_coffee.gif" alt="Loading animation" className="m-2" width={150} height={200} unoptimized />
            </div>
        </div>
    )
}