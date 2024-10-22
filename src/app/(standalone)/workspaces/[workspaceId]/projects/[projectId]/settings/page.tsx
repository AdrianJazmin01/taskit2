import { getCurrent } from "@/features/auth/queries"
import { EditProjectForm } from "@/features/projects/components/edit-project-form";
import { redirect } from "next/navigation";
import { ProjectIdSettingPageClient } from "./client";


const ProjectIdSettingPage = async () => {
  const user = await getCurrent();
  if(!user) redirect ("/sign-in");


 
  return (
      <ProjectIdSettingPageClient/>
  )
}

export default ProjectIdSettingPage
