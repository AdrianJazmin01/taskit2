import { getCurrent } from "@/features/auth/queries";
import { getWorkspaces } from "@/features/workspaces/queries";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrent();
  
  if (!user) {
    // Redirect to sign-in if user is not authenticated
    return redirect("/sign-in");
  }

  const workspaces = await getWorkspaces();

  // Check if there are any workspaces
  if (workspaces.total === 0) {
    // Redirect to workspace creation if no workspaces exist
    return redirect("/workspaces/create");
  }

  // Redirect to the first workspace
  return redirect(`/workspaces/${workspaces.documents[0].$id}`);
}
