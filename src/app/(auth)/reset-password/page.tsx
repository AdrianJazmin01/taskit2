
import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import ResetPasswordPage from "@/features/auth/components/reset-function";



const SignInPage = async () => {
  const user = await getCurrent();

  if(user) redirect("/")

  return (
    <Suspense>
    <ResetPasswordPage/>
    </Suspense>
  )
}

export default SignInPage;