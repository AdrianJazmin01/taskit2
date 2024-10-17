"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DottedSeparator } from "@/components/dotted-separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronLeft, CircleAlert, CopyIcon, ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useConfirm } from "@/hooks/use-confirm";
import { useUpdateProject } from "../api/use-update-project";
import { updateProjectSchema } from "../schemas";
import { Project } from "../types";
import { useDeleteProject } from "../api/use-delete-project";

interface EditProjectFormProps {
  onCancel?: () => void;
  initialValues: Project;
};



export const EditProjectForm = ({ onCancel, initialValues }: EditProjectFormProps) => {
  const router = useRouter()
  const {mutate,isPending} = useUpdateProject();
  const { mutate: deleteProject, isPending: isDeletingProject } = useDeleteProject();
    
  const inputRef = useRef<HTMLInputElement>(null);
  
  const [DeleteDialog, confirmDelete] = useConfirm(
    "Delete Project",
    "This action cannot be undone.",
    "destructive",
  );



  const form = useForm<z.infer<typeof updateProjectSchema>>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues:{
      ...initialValues,
      image: initialValues.imagesUrl ?? "",
    },
});

const handleDelete = async () => {
  const ok = await confirmDelete();

  if(!ok) return;

  deleteProject({
    param: { projectId: initialValues.$id },
  }, {
    onSuccess: () =>{
      window.location.href = `/workspaces/${initialValues.workspaceId}`;
    }
  });
};

  
const onSubmit =(values: z.infer<typeof updateProjectSchema>) =>{
  const finalValues = {
    ...values,
    image: values.image instanceof File ? values.image : "",
  };

  mutate({
    form: finalValues, 
    param: { projectId: initialValues.$id }
  },{

    onSuccess: () =>{
      form.reset();
    }, 
    });
};

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const file = e.target.files?.[0];
    if(file) {
      form.setValue("image", file);
    }
  };


  return (
    <div className="flex flex-col gap-y-4">
      <DeleteDialog />
    <Card className="w-full h-full border-none shadow-xl">
      <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
        <Button size="xs" variant={"secondary"} onClick={onCancel ? onCancel : () => router.push(`/workspaces/${initialValues.workspaceId}/projects/${initialValues.$id}`) }>
          <ChevronLeft  />
        </Button>
        <CardTitle className="text-xl font-bold">
          {initialValues.name}
        </CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator/>
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Project Name
                  </FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      placeholder="Enter Project Name"
                      />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

              <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) =>(
                    <div className="flex flex-col gap-y-2">
                      <div className="flex items-center gap-x-5">
                        {field.value ? (
                          <div className="size-[72px] relative rounded-md overflow-hidden">
                            <Image 
                              fill
                              className="object-cover"
                              src={field.value instanceof File
                                ? URL.createObjectURL(field.value)
                                : field.value
                              } 
                              alt={"Logo"}/>
                          </div>
                          ):(
                            <Avatar className="size-[72px]" >
                              <AvatarFallback>
                                <ImageIcon className="size-[36px] text-neutral-500"/>
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div className="flex flex-col">
                            <p className="text-sm "> Project Icon </p>
                            <p className="text-sm text-muted-foreground"> JPG, PNG, SVG or JPEG, max 1mb </p>
                            <input
                            className="hidden"
                            accept=".jpg, .png, .svg, .jpeg " 
                            type="file"
                            ref={inputRef}
                            onChange={handleImageChange}
                            disabled={isPending} />
                            {field.value? (
                              <Button
                              type="button"
                              disabled={isPending}
                              variant={"destructive"}
                              size="sx"
                              className="w-fit mt-2"
                              onClick={() => {
                                field.onChange(null);
                                if(inputRef.current){
                                  inputRef.current.value = "";
                                }
                              }}>
                              Remove Image
                            </Button>
                            ):(
                              <Button
                              type="button"
                              disabled={isPending}
                              variant={"teritary"}
                              size="sx"
                              className="w-fit mt-2"
                              onClick={() => inputRef.current?.click()}>
                              Upload Image
                            </Button>
                        )}
                          </div>
                      </div> 
                    </div> 
                  )} 
              />

            <DottedSeparator className="py-7"/>
            <div className="flex items-center justify-between">
            <Button 
              disabled={isPending}
              type="button"
              size={"lg"}
              variant={"secondary"}
              onClick={onCancel}
              className={cn(!onCancel && "invisible")}
              >
              Cancel
            </Button>
            <Button 
              disabled={isPending}
              type="submit"
              size={"lg"}
              >
              Save Changes
            </Button>
            </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>

    <Card className="w-full h-full border-none shadow-xl">
      <CardContent className="p-7">
        <div className="flex flex-col">
          <div className="flex flex-row py-1">
          <CircleAlert color="Red" className="mr-2"/>
            <h3 className="font-bold flex flex-row">   Danger Zone</h3>
          </div>
            <p className="text-sm text-muted-foreground">
                Deleting a Project is irreversible and will remove all associated data. 
            </p>
        <Button 
        className="mt-6 w-fit ml-auto"
        size={"sm"}
        variant={"destructive"}
        type="button"
        disabled={ isPending}
        onClick={handleDelete}
        >
          Delete project
        </Button>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}

