import { useState } from "react";
import type { NextPage } from "next";
import DeleteIcon from "../shared/DeleteIcon";
import EditIcon from "../shared/EditIcon";
import OkIcon from "../shared/OkIcon";
import Toggle from "../shared/Toggle";
import { api } from "y/utils/api";
import type { Link } from "@prisma/client";

export type PrivateLinkProps = {
  link: Link;
};

const PrivateLink: NextPage<PrivateLinkProps> = ({ link }) => {
  const ctx = api.useContext();
  const { mutate: deleteLinkMutation } = api.link.deleteLink.useMutation({
    onSuccess: async () => {
      await ctx.link.getAllUserLinks.invalidate();
    },
  });

  const { mutate: toggleActive } = api.link.setIsActive.useMutation({
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
  return (
    <div className="centered h-30 my-2 max-w-xs">
      <div className="flex">
        <div className="flex flex-row rounded-xl border-2 border-gray-200 p-2">
          <div className="flex items-center rounded-sm border-black">
            <div className="flex flex-col">
              <Row name="name" value={link.name} id={link.id} />
              <Row name="to" value={link.to} id={link.id} />
            </div>
            <div
              onClick={() => toggleIsActive(link.id, !link.isActive)}
              className="ml-3"
            >
              <Toggle isActive={link.isActive} />
            </div>
          </div>
        </div>
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

export type RowProps = {
  name: string;
  value: string;
  id: string;
};
const Row: NextPage<RowProps> = ({ name, value, id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState<string>(value);
  const ctx = api.useContext();
  const { mutate: updateLinkMutation } = api.link.updateLink.useMutation({
    onSuccess: () => {
      void ctx.link.getAllUserLinks.invalidate();
    },
  });

  const updateLink = (args: Record<string, string>) => {
    updateLinkMutation({ id, ...args });
  };

  const updateHandler = () => {
    if (isEditing) {
      updateLink({ [name]: data });
    }
    setIsEditing(!isEditing);
  };

  return (
    <>
      <div className="flex p-1">
        <div onClick={updateHandler}>
          {isEditing ? <OkIcon /> : <EditIcon />}
        </div>
        <div className="ml-2">{name}:</div>
        <div className="ml-2">
          <input
            className={`w-auto rounded bg-transparent outline-none ${isEditing ? "outline-gray-500" : ""
              }`}
            type="text"
            disabled={!isEditing}
            value={data}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateHandler();
              }
            }}
            onChange={(e) => setData(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};
