// src/components/Navbar.jsx
import { Link } from 'react-scroll';

function Navbar() {
  return (
    <nav className="fixed w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-bold">Shyam. M</h1>
        <ul className="flex space-x-4">
          {['Contributions', 'Blog', 'Contact'].map((section) => (
            <li key={section}>
              <Link
                to={section.toLowerCase()}
                smooth={true}
                duration={500}
                className="cursor-pointer hover:text-gray-300 transition"
              >
                {section}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
