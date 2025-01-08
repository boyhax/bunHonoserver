import { Button } from "@/components/ui/button"
import { useAuth } from "@/store/auth"

export function LogoutButton() {
  const { logout } = useAuth()

  return (
    <Button variant="outline" onClick={() => logout()}>
      Log out
    </Button>
  )
}

