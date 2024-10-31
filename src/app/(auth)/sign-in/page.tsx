
import { getCurrent } from "@/features/auth/queries";
import { SignInCard } from "@/features/auth/components/sign-in-card";
import { redirect } from "next/navigation";
import { Suspense } from "react";



const SignInPage = async () => {
  const user = await getCurrent();

  if(user) redirect("/")

  return (
    <Suspense>
    <SignInCard/>
    </Suspense>
  )
}

export default SignInPage;