import { GithubFilled } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-8 w-8 rounded-lg object-contain border border-gray-200"
            onError={(e) => (e.target.style.display = "none")}
          />
          <span className="text-lg font-extrabold tracking-tight text-gray-900">
            B2<span className="text-emerald-600">RB</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/YOUR_USERNAME"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:border-gray-400 hover:text-gray-900 transition-all duration-200"
          >
            <GithubFilled />
            GitHub
          </a>
          <Link
            to="/signup"
            className="px-4 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-all duration-200 shadow-sm"
          >
            Sign Up →
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar