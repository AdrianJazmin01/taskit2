"use server"

import { redirect } from 'next/navigation';
import { createAdminClient } from "./appwrite";
import { OAuthProvider } from 'node-appwrite';
import { headers } from 'next/headers';

export async function signUpWithGoogle() {
  const {account} =  await createAdminClient();
  
  const origin = headers().get("origin");

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Google,
    `${origin}/oauth`,
    `${origin}/sign-up`,
  );

  return redirect ( redirectUrl );
  
};