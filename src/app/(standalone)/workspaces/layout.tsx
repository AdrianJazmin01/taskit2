import { UserButton } from "@/features/auth/components/user-button";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

interface StandaloneLayoutProps {
  children: React.ReactNode;
};

const StandaloneLayout = ({ children }: StandaloneLayoutProps) => {
  return (
    <Suspense>
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-centerh-[73px]">
          <Link href={"/"}>
          <Image src="/logo.svg" alt="Logo" height={56} width={56}/>
          </Link>
          <UserButton/>
        </nav>
          <div className="flex flex-col items-center justify-center py-4">
          {children}
          </div>
      </div>
    </main>
    </Suspense>
  )
}

export default StandaloneLayout