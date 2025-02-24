"use client"

import Link from "next/link";

export default function Result() {
    return (
        <div className="flex flex-col items-center justify-center my-32">
            <h1 className="text-4xl font-bold mb-4">討伐完了！</h1>
            <p className="text-lg mb-8">おめでとう！魔物は討伐された</p>
            <Link href="/" className="text-blue-500 underline">
                マップに戻る
            </Link>
        </div>
    );
}