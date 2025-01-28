import Link from "next/link"
import { TextIcon as Telegram, Facebook, Twitter, Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-lg font-semibold mb-2">Telegram Forum</h2>
            <p className="text-sm text-gray-600">Discover and share the best Telegram channels and groups.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-md font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-blue-600 hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-blue-600 hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-blue-600 hover:underline">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-md font-semibold mb-2">Connect With Us</h3>
            <div className="flex flex-col space-y-4">
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Facebook</span>
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Twitter</span>
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">GitHub</span>
                  <Github className="h-6 w-6" />
                </a>
              </div>
              <a
                href="https://t.me/drkingbd"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Telegram className="h-5 w-5 mr-2" />
                Join our Telegram
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8">
          <p className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Telegram Forum. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

