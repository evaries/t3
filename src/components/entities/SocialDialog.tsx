"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "y/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "y/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "y/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "y/components/ui/select";
import { toast } from "y/components/ui/use-toast";
import { api } from "y/utils/api";
import { socialSelect } from "y/utils/consts";
import { z } from "zod";
import { Input } from "../ui/input";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  link: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export type SocialSelectItemsType = (typeof socialSelect)[number]["value"];

export function SocialDialog() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      link: "",
    },
  });

  const ctx = api.useContext();

  const { mutate, isLoading } = api.link.createLink.useMutation({
    onSuccess: () => {
      void ctx.link.getUserSocialLinks.invalidate();
    },
  });

  const submit = (): void => {
    const { link, name } = form.getValues();
    mutate({
      name,
      to: link,
      isSocial: true,
      position: "1",
    });
    toast({
      title: "You submitted the following values:",
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">add social icon</Button>
      </DialogTrigger>
      <DialogContent className={"max-w-md"}>
        <Form {...form}>
          <form method="POST" className="w-full space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>name</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a social media" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {socialSelect.map((item) => {
                        return (
                          <SelectItem value={item.value} key={item.value}>
                            <div className="flex items-center gap-4">
                              {item.icon}
                              <p>{item.value}</p>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>link</FormLabel>
                  <FormControl>
                    <Input placeholder="#" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button onClick={submit}>save</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
