import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

interface useGetProjectAnalyticsProps {
  projectId: string,
};

export type ProjectAnalytics = InferResponseType<typeof client.api.projects[":projectId"]["analytics"]["$get"], 200>

export const useGetProjectAnalytics = ({ projectId }: useGetProjectAnalyticsProps) => {
  const query = useQuery({
    queryKey: ["project-analytics", projectId], 
    queryFn: async ()=>{
      const response = await client.api.projects[":projectId"]["analytics"].$get({
        param : { projectId },
      });

      if(!response.ok) {
        throw new Error("Failed to fecth Project Analytics");
      }

      const { data } = await response.json();
      return data;
    },
  });
  return query;
};