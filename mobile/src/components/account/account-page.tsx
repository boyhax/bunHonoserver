import { useAuth } from "@/store/auth"
import { useNavigate } from "@tanstack/react-router"
import { AccountInfo } from "./AccountInfo"
import { AddProduct } from "./AddProduct"
import { EditProfile } from "./EditProfile"
import { MyOrders } from "./MyOrders"
import { MyProducts } from "./MyProducts"


export default function AccountPage() {
  const { session } = useAuth()
  const navigate = useNavigate()

  if (!session) {
    navigate({ to: "/auth", search: { next: "/account" } })
    return null
  }
  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      <h1 className="text-2xl font-bold text-foreground">My Account</h1>
      <AccountInfo session={session} />
      <MyProducts />
      <MyOrders />
      <AddProduct />
      <EditProfile session={session} />
    </div>
  )
}

