import { useState } from 'react';
import { Button } from '../ui/button';
import Link from '../Link';
import { useNavigate } from '@tanstack/react-router';
import useOnMount from '@/hooks/useOnMount';
import { client } from '@/App';
import { useAuth } from '@/store/auth';

export default function GoogleCallbackPage() {
  const [state, setstate] = useState('pending');
  const go = useNavigate()
  useOnMount(() => {
    console.log('run use on mount')
    handleGoogleSignIn()
  });

  const handleGoogleSignIn = async () => {

    const code = new URL(window.location.href).searchParams.get('code')
    if (!code) {
      throw Error('wrong request code missing')
    }
    console.log('code :>> ', code);
    try {
      const redirect = window.location.origin + window.location.pathname
      console.log('will fetch google/callback')
      await client.auth.oauthToken({
        provider: 'google',
        code,
        redirect
      }).then(async c => {

        c && useAuth.setState({ session: c })
        go({ to: '/' })
      })
    } catch (error) {
      console.log('error :>> ', error);
      go({ to: '/auth' })
    }

    console.log('Signing in with Google')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 flex-col">
      <h1>
        Wait..
        state {state}
      </h1>
      {state == 'error' &&
        <Link to='/auth'>
          <Button>Return To Login</Button>
        </Link>
      }
    </div>
  )
}

