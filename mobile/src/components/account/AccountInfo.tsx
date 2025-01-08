import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LogoutButton } from "@/components/account/LogoutButton"
import { Session } from "@/types"

interface AccountInfoProps {
  session: Session
}

export function AccountInfo({ session }: AccountInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={session.user?.avatar || ''} alt={session.user?.name || ''} />
          <AvatarFallback>{session.user?.name?.[0] || 'U'}</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <p className="text-xl font-semibold">{session.user?.name}</p>
          <p className="text-muted-foreground">{session.user?.email}</p>
        </div>
        <LogoutButton />
      </CardContent>
    </Card>
  )
}

