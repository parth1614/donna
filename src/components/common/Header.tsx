import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getServerAuthSession } from "~/server/auth";

const Header = async () => {
  const session = await getServerAuthSession();
  return (
    <div className="flex justify-between p-4">
      <Link href="/" className="text-2xl font-bold flex items-center">
        <Image className="mr-2" src="/logo.svg" alt="Smart Donna" width={25} height={25} /> Smart Donna
      </Link>
      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/spaces">Spaces</Link>
        <Link href="/library">Library</Link>
        {!process.env.ADMIN_USER_ID!.includes(session?.user?.id as string) ? null : <Link href="/coupons">Coupons</Link>}
      </div>
    </div>
  );
};

export default Header;
