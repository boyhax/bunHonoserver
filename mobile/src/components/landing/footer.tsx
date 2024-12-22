import { ShoppingBag } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col items-center justify-between space-y-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex items-center space-x-2">
          <ShoppingBag className="h-6 w-6" />
          <span className="font-bold">MultiShop</span>
        </div>
        <nav className="flex items-center space-x-4 text-sm">
          {/* <Link to="/terms">Terms</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/contact">Contact</Link> */}
        </nav>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © 2023 MultiShop. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

