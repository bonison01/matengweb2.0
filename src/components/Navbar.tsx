import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Cargo", path: "/https://cargo-gules.vercel.app/" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-white shadow fixed top-10 left-0 right-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <NavLink to="/" className="flex items-center">
                <span className="font-poppins font-bold text-2xl italic">
                  <img
                    src="https://lhzwholxmjolpinyxxsz.supabase.co/storage/v1/object/public/competition_documents/aadhaar/Mateng%20Visiting%20Card.png"
                    alt="Mateng Logo"
                    className="inline-block w-120 h-16"
                  />
                </span>
              </NavLink>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#065303] font-medium"
                      : "text-gray-600 hover:text-[#065303] transition-colors"
                  }

                >
                  {item.name}
                </NavLink>
              ))}
              <a href="tel:8787649928">
                <Button className="bg-[#065303] text-white hover:bg-[#054802]">
                  Call for Delivery
                </Button>
              </a>

              {/* Wrap the Button with NavLink */}
              {/* <NavLink to="/competition">
                <Button className="bg-[#065303] text-white hover:bg-[#054802]">
                  Apply Maths Competition
                </Button>
              </NavLink> */}

            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-primary"
            >
              <Menu />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${isActive
                    ? "text-primary bg-gray-50"
                    : "text-gray-600 hover:text-primary hover:bg-gray-50"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
            <div className="px-3 py-2">
              <Button className="w-full">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
