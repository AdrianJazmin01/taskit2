import { Loader } from "lucide-react"


const DashboardLoading = () => {
  return (
    <div className="min-screen flex items-center justify-center">
      <Loader className="size-50 animate-spin text-muted-foreground"/>
    </div>
  )
}

export default DashboardLoading