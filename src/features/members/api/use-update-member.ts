import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.members[":memberId"]["$patch"], 200>;
type RequestType = InferRequestType <typeof client.api.members[":memberId"]["$patch"]>;

export const useUpdateMember = () => {

  const queryClient = useQueryClient();

  const mutation = useMutation< 
  ResponseType,
  Error,
  RequestType
  >({
    mutationFn: async ({ param, json }) =>{
      const response = await client.api.members[":memberId"]["$patch"]({param, json});

      if(!response.ok){
        throw new Error(" Failed to Update member ");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Member Updated");
      queryClient.invalidateQueries({queryKey: ["members"]})
    },
    onError:()=>{
      toast.error("Failed to Update member")
    }

  });

  return mutation;
};  