

import { getCurrent } from "@/features/auth/queries";
import { SignUpCard } from "@/features/auth/components/sign-up-card";
import { redirect } from "next/navigation";
import { Suspense } from "react";


const SignUpPage = async () => {
    const user = await getCurrent();

  if(user) redirect("/")

  return (<Suspense>
      <SignUpCard/>
      </Suspense>
  )
}

export default SignUpPage;