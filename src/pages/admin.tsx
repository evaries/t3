import React from "react";

import { api } from "y/utils/api";


const Admin = () => {
  const [text, setText] = React.useState('')
  const post = api.post.getAllPost.useQuery()
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
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div style={{ color: "white" }}>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={() => mutate({ content: text })}>Create Post</button>
      </div>
      <p className="text-2xl text-white">
        {post.data ? post.data.map(item => (<><div>author: {item.id}</div> <div>{item.content}</div></>)) : "Loading tRPC query..."}
      </p>
    </main>

  )
}

export default Admin;
