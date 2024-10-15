import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.auth.logout["$post"]>;


export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const mutation = useMutation< 
  ResponseType,
  Error
  >({
    mutationFn: async () =>{
      const response = await client.api.auth.logout["$post"]();

      if(!response.ok){
        throw new Error(" Failed to Logout ");
      }

      return await response.json();
    },

    onSuccess: ( ) => {
      toast.success("Logged Out");
      router.refresh();
      queryClient.invalidateQueries({queryKey: ["current"]})
    },
    onError:()=>{
      toast.error("Failed to Logout")
    },
  });

  return mutation;
};