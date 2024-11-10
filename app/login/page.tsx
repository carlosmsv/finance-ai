import Image from "next/image"
import { Button } from "../_components/ui/button"
import { LogInIcon } from "lucide-react"
import { SignInButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const LoginPage = async () => {
  const { userId } = await auth()

  if (userId) redirect("/")
  return (
    <div className="grid h-full grid-cols-2">
      <div className="mx-auto flex h-full max-w-[550px] flex-col justify-center gap-8 p-8">
        <Image src="/logo.svg" width={173} height={39} alt="Finance AI" />
        <div className="flex flex-col gap-3">
          <h1 className="mb-3 text-4xl font-bold">Welcome</h1>
          <p className="text-muted-foreground">
            Finance AI is a financial management platform that uses AI to
            monitor your transactions and provide personalized insights, making
            it easier to manage your budget.
          </p>
        </div>
        <SignInButton>
          <Button variant="outline">
            <LogInIcon className="mr-2" />
            Login or Create Account
          </Button>
        </SignInButton>
      </div>
      <div className="relative h-full w-full">
        <Image
          src="/login.png"
          alt="Faça login"
          fill
          className="object-cover"
        />
      </div>
    </div>
  )
}

export default LoginPage
