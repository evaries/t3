import type { Link } from "@prisma/client";
import type { NextPage } from "next";
import * as React from "react";
import { useState } from "react";
import { api } from "y/utils/api";
import DeleteIcon from "../shared/icons/DeleteIcon";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Switch } from "../ui/switch";

import { Button } from "y/components/ui/button";
import { Input } from "y/components/ui/input";
import { Label } from "y/components/ui/label";
import Loader from "../shared/Loader";

export type PrivateLinkProps = {
  link: Link;
};

const PrivateLink: NextPage<PrivateLinkProps> = ({ link }) => {
  const { id, name: dataName, to: dataTo } = link;
  const [name, setName] = useState<string>(dataName);
  const [to, setTo] = useState<string>(dataTo);
  const ctx = api.useContext();

  const { mutate: deleteLinkMutation } = api.link.deleteLink.useMutation({
    onSuccess: async () => {
      await ctx.link.getAllUserLinks.invalidate();
    },
  });

  const { mutate: updateLinkMutation, isLoading: isUpdateLoading } =
    api.link.updateLink.useMutation({
      onSuccess: () => {
        void ctx.link.getAllUserLinks.invalidate();
      },
    });

  const { mutate: toggleActive, isLoading: isToggleLoading } =
    api.link.setIsActive.useMutation({
      onSuccess: async () => {
        await ctx.link.getAllUserLinks.invalidate();
      },
    });

  const deleteLink = (id: string) => {
    deleteLinkMutation({ id });
  };

  const toggleIsActive = (id: string, isActive: boolean) => {
    toggleActive({ id, isActive });
  };

  const updateLink = (args: Record<string, string>) => {
    updateLinkMutation({ id, ...args });
  };

  const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    updateLink({ name, to });
  };
  return (
    <div className="centered h-30 my-2">
      <div className="flex w-full">
        <Card className="w-full">
          <CardContent className="pt-6">
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <div className="grid grid-cols-5 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Name of your link"
                      className="col-span-4"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <div className="grid grid-cols-5 items-center gap-4">
                    <Label htmlFor="to" className="text-right">
                      link
                    </Label>
                    <Input
                      id="to"
                      placeholder="Link to resource"
                      value={to}
                      className="col-span-4"
                      onChange={(e) => setTo(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            {isUpdateLoading ? (
              <Loader />
            ) : (
              <Button size={"sm"} onClick={(e) => submit(e)}>
                save
              </Button>
            )}
            <div className="flex items-center">
              <div className="ml-3 flex h-8 w-8 items-center">
                {isToggleLoading ? (
                  <Loader />
                ) : (
                  <Switch
                    checked={link.isActive}
                    onClick={() => toggleIsActive(id, !link.isActive)}
                  />
                )}
              </div>
            </div>
          </CardFooter>
        </Card>
        <div
          onClick={() => deleteLink(link.id)}
          className="ml-2 flex items-center"
        >
          <DeleteIcon />
        </div>
      </div>
    </div>
  );
};

export default PrivateLink;
