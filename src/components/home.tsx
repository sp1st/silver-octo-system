import Image from "next/image";

export default async function Home() {
  return (
    <div className="flex flex-col justify-center my-4">
      <div className="text-4xl font-extrabold text-center my-11">
        Room Pikapika Game
      </div>
      <div className="flex justify-center">～クエストをクリアして、年始までに大掃除を終わらせよう！～</div>
      <div className="flex justify-center my-8">
          <Image src="/yusha.gif" alt="勇者のGIF" width={200} height={300} unoptimized />
      </div>
    </div>
  )
}
