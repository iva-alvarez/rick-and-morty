"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Logo() {
  const router = useRouter()
  return (
    <div
      className="min-h-20 h-20 flex items-center px-6 border-b cursor-pointer gap-2"
      onClick={() => router.push("/")}
    >
      <Image src="/logo.svg" alt="logo" height={30} width={30} priority />
      <p className="text-3xl font-extrabold">Rick and Morty</p>
    </div>
  );
}
