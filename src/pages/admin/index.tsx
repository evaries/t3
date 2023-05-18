import React from "react";

import { api } from "y/utils/api";
import { Post } from "@prisma/client";
import DeleteIcon from "y/icons/Delete";

export type TPost = {
  post: Post
}

const Post = ({ post }: TPost) => {
  const ctx = api.useContext()
  const { mutate } = api.post.deletePost.useMutation({
    onSuccess: () => {
      void ctx.post.getAllPost.invalidate()
    }
  })
  return (
    <div className="flex w-full justify-between text-zinc-500 ">
      <div>{post.content}</div>
      <div className="cursor-pointer"
        onClick={() => mutate({ id: post.id })}>
        <DeleteIcon />
      </div>
    </div>
  )
}

const Posts = () => {
  const [text, setText] = React.useState('')
  const post = api.post.getPostByAuthorId.useQuery()
  const ctx = api.useContext()
  const { mutate } = api.post.createPost.useMutation({
    onSuccess: () => {
      setText('')
      void ctx.post.getAllPost.invalidate()
    },
    onError: (err) => {
      const error = err.data?.zodError?.fieldErrors.content
      console.log(error)
    }
  })
  return (
    <main className="flex w-1/2 flex-col items-center justify-center bg-gray-100">
      <div className="w-full">
        <form className="md:flex md:items-center mb-6">
          <div className="w-full">
            <input type="text" value={text} placeholder="Post something"
              onChange={(e) => setText(e.target.value)} className="bg-gray-200 appearance-none 
              border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700
              leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="inline-full-name" />
          </div>
          <button onClick={() => mutate({ content: text })} className="mx-2 bg-gray-500	 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md">
            add
          </button>
        </form>
      </div>
      {post.data ? post.data.map(item => (
        <Post post={item} key={item.id} />
      )) : "Loading tRPC query..."}
    </main>

  )
}

export default Posts;
