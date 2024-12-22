import { useState } from 'react'
import { ShoppingBag, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from '../Link'
import { useNavigate } from '@tanstack/react-router'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const go = useNavigate()
  const toggleMenu = () => setIsOpen(!isOpen)

  const MenuItem = ({ to, children }: { to: string, children: React.ReactNode }) => (
    <Link
      to={to}
      className="text-sm font-medium transition-colors hover:text-primary"
      onClick={toggleMenu}
    >
      {children}
    </Link>
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <ShoppingBag className="h-6 w-6" />
          <span className="font-bold sm:inline-block">
            MultiShop
          </span>
        </Link>
        <div className="flex-1" />
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <MenuItem to="/shops">Shops</MenuItem>
          <MenuItem to="/products">Products</MenuItem>
          <MenuItem to="/about">About</MenuItem>
        </nav>
        <div className="flex items-center space-x-4">
          <Link to='/auth' >
            <Button onClick={() => go({ to: '/auth' })} className="w-full ms-4" size="sm">
              Sign In
            </Button>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-4">
                <MenuItem to="/shops">Shops</MenuItem>
                <MenuItem to="/products">Products</MenuItem>
                <MenuItem to="/about">About</MenuItem>
                <Link to='/auth' >
                  <Button onClick={() => go({ to: '/auth' })} className="w-full" size="sm">
                    Sign In
                  </Button>
                </Link>

              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

