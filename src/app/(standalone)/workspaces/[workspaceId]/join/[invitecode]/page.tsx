import { getCurrent } from "@/features/auth/queries"
import { JoinWorkspaceForm } from "@/features/workspaces/components/join-workspace-form";
import { redirect } from "next/navigation";
import { WorkspaceIdJoinPageClient } from "./client";



const WorkspaceIdJoinPage = async () => {
const user = await getCurrent();

if(!user) redirect("/sign-in");



  return (
    <WorkspaceIdJoinPageClient />
  )
}

export default WorkspaceIdJoinPage