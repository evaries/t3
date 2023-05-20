import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
import { NextPage } from "next";

export type SetUsernameProps = {
  user: {
    username: string
  }
}

const SetUsername: NextPage<SetUsernameProps> = (props) => {
  const [username, setUsername] = useState('')
  const { user } = useUser();
  const router = useRouter();
  const updateProfile = async () => {
    await user?.update({ unsafeMetadata: { username: username } })
  }

  const onSubmit = async () => {
    try {
      await updateProfile()
    } catch (e) {
    }
  }
  useEffect(() => {
    if (props.user.username) {
      router.push('/admin')
    }
  }, [])


  return (
    <main className="flex w-1/2 flex-col items-center justify-center bg-gray-100">
      <div className="w-full">
        <form className="flex md:flex md:items-center mb-6">
          <div className="w-full">
            <input type="text" value={username} placeholder="Update your public profile link"
              onChange={(e) => setUsername(e.target.value)} className="bg-gray-200 appearance-none 
              border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700
              leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="inline-full-name" />
          </div>
          <button onClick={(e) => {
            void onSubmit()
            e.preventDefault()
            router.push('/admin')
          }}
            className="mx-2 bg-gray-500	 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md">
            set
          </button>
        </form>
      </div>
    </main>
  )
}
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { userId } = getAuth(ctx.req)

  const user = userId ? await clerkClient.users.getUser(userId) : undefined

  const username = {
    username: user?.unsafeMetadata?.username ?? ''
  }


  return { props: { user: username } }

}

export default SetUsername;
