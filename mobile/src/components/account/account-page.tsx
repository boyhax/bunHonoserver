import { useAuth } from "@/store/auth"
import { Navigate } from "@tanstack/react-router"

export default function AccountPage() {

  const { session } = useAuth()

  if (!session) {
    return (<Navigate params={{ next: "/account" }} to="/auth" />)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* {session.name, session.avatar, session.email} */}
      //todo
    //my products
    //add product
    //my orders
    //logout
    //edit profile name and avatar
    </div>
  )
}

