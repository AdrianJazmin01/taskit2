"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createWorkspaceSchema } from "../schemas";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DottedSeparator } from "@/components/dotted-separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "../api/use-create-workspace";
import { useRef } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ImageIcon } from "lucide-react";

interface CreateWorkSpaceFormProps {
  onCancel?: () => void;
};



export const CreateWorkSpaceForm = ({ onCancel }: CreateWorkSpaceFormProps) => {

  const inputRef = useRef<HTMLInputElement>(null);
  const {mutate,isPending} = useCreateWorkspace();

  const form = useForm<z.infer<typeof createWorkspaceSchema>>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues:{
      name: "",
    },
})
  
const onSubmit =(values: z.infer<typeof createWorkspaceSchema>) =>{
  const finalValues = {
    ...values,
    image: values.image instanceof File ? values.image : "",
  };

  mutate({form: finalValues},{

    onSuccess: () =>{
      form.reset();
    } 
    });
};

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const file = e.target.files?.[0];
    if(file) {
      form.setValue("image", file);
    }
  };


  return (
    <Card className="w-full h-full border-none shadow-xl">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">
          Create New Workspace
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
                    Workspace Name
                  </FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      placeholder="Enter Workspace Name"
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
                            <p className="text-sm "> Workspace Icon </p>
                            <p className="text-sm text-muted-foreground"> JPG, PNG, SVG or JPEG, max 1mb </p>
                            <input
                            className="hidden"
                            accept=".jpg, .png, .svg, .jpeg " 
                            type="file"
                            ref={inputRef}
                            onChange={handleImageChange}
                            disabled={isPending} />
                            <Button
                            type="button"
                            disabled={isPending}
                            variant={"teritary"}
                            size="sx"
                            className="w-fit mt-2"
                            onClick={() => inputRef.current?.click()}>
                              Upload Image
                            </Button>
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
              >
              Cancel
            </Button>
            <Button 
              disabled={isPending}
              type="submit"
              size={"lg"}
              >
              Create Workspace
            </Button>
            </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
