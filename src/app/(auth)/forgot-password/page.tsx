
import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import ForgotPassword from "@/features/auth/components/forgot-password";



const SignInPage = async () => {
  const user = await getCurrent();

  if(user) redirect("/")

  return (
    <Suspense>
    <ForgotPassword/>
    </Suspense>
  )
}

export default SignInPage;