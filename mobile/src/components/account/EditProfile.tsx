import { useState } from 'react'
import { useMutation } from "@tanstack/react-query"
import { Session } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateProfile, useUpdateProfile } from "@/services/profile"

interface EditProfileProps {
  session: Session
}

export function EditProfile({ session }: EditProfileProps) {
  const [name, setName] = useState(session.user?.name || '')
  const [avatar, setAvatar] = useState(session.user?.avatar || '')

  const { mutate, isError, isPending } = useUpdateProfile()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate({ name, avatar })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="avatar">Avatar URL</Label>
            <Input
              id="avatar"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Updating...' : 'Update Profile'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

