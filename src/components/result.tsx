import MapModoruLink from "./mapModoru";

export default function Result(){
    return(
        <div className="flex flex-col items-center justify-center my-24">
            <h1 className="text-4xl font-bold mb-4">討伐完了！</h1>
            <p className="text-lg mb-8">おめでとう！魔物は討伐された</p>
            <MapModoruLink />
        </div>
    )
}