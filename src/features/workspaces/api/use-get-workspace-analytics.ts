import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

interface useGetWorkspaceAnalyticsProps {
  workspaceId: string,
};

export type WorkspaceAnalytics = InferResponseType<typeof client.api.workspaces[":workspaceId"]["analytics"]["$get"], 200>

export const useGetWorkspaceAnalytics = ({ workspaceId }: useGetWorkspaceAnalyticsProps) => {
  const query = useQuery({
    queryKey: ["workspace-analytics", workspaceId], 
    queryFn: async ()=>{
      const response = await client.api.workspaces[":workspaceId"]["analytics"].$get({
        param : { workspaceId },
      });

      if(!response.ok) {
        throw new Error("Failed to fecth Workspace Analytics");
      }

      const { data } = await response.json();
      return data;
    },
  });
  return query;
};