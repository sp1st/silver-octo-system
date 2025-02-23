import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
        <Link href="/room/kitchen"><Image src="/map-kitchen.png" alt="キッチンへのリンク" width={410} height={290}></Image></Link>
        <Link href="/room/bathroom"><Image src="/map-bathroom.png" alt="お風呂へのリンク" width={330} height={255}></Image></Link>
    </div>
  );
}
