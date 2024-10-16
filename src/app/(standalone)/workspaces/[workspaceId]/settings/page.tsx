import { getCurrent } from "@/features/auth/action"
import { getWorkspace } from "@/features/workspaces/action";
import { EditWorkspaceForm } from "@/features/workspaces/components/edit-workspace-form";
import { redirect } from "next/navigation";

interface WorkspaceIdSettingspageProps {
  params: {
    workspaceId: string;
  }
}

const WorkspaceIdSettingspage = async ( { params, }: WorkspaceIdSettingspageProps ) => {
  const user = await getCurrent();
  if(!user) redirect("/sign-in")

  const initialValues = await getWorkspace({ workspaceId: params.workspaceId });

  if(!initialValues){
    redirect(`/workspaces/${params.workspaceId}`)
  }

  return (
    <div className="w-full lg:max-w-xl">
      <EditWorkspaceForm initialValues={initialValues} />
    </div>
  )
}

export default WorkspaceIdSettingspage