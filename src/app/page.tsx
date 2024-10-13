"use client";

import { useCurrent } from "@/features/auth/api/use-current";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Home() {
  const { data, isLoading } = useCurrent();
  const router = useRouter();

  useEffect (() => {
    if(!data && !isLoading) {
      router.push("/sign-in")
    };

 
    }, [data]);

  return (
    <div  >
      only visible to authorized user
    </div>
  );
}
