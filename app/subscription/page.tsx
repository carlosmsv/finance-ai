import { auth } from "@clerk/nextjs/server"
import Navbar from "../_components/navbar"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader } from "../_components/ui/card"
import { CheckIcon, XIcon } from "lucide-react"
import AcquirePlanButton from "./_components/acquire-plan-button"

const SubscriptionPage = async () => {
  const { userId } = await auth()
  if (!userId) redirect("/login")
  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <h1 className="text-2xl font-bold">Subscription</h1>
        <div className="flex gap-6">
          <Card className="w-[450px]">
            <CardHeader className="border-b border-solid py-8">
              <h2 className="text-center text-2xl font-semibold">Basic Plan</h2>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">US$</span>
                <span className="text-6xl font-semibold">0</span>
                <div className="text-2xl text-muted-foreground">/month</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Only 10 transactions per month (7/10)</p>
              </div>
              <div className="flex items-center gap-2">
                <XIcon />
                <p>AI Reports</p>
              </div>
            </CardContent>
          </Card>
          <Card className="w-[450px]">
            <CardHeader className="border-b border-solid py-8">
              <h2 className="text-center text-2xl font-semibold">
                Premium Plan
              </h2>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">US$</span>
                <span className="text-6xl font-semibold">3</span>
                <div className="text-2xl text-muted-foreground">/month</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Unlimited transactions</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>AI Reports</p>
              </div>
              <AcquirePlanButton />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

export default SubscriptionPage
