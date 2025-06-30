import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Menu, User, ChevronDown } from "lucide-react";
import { useAuth } from "@/components/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // For dropdowns
  const dropdownRef = useRef(null);
  const { user } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: "Home", path: "/" },
    {
      name: "About",
      subItems: [
        { name: "About Us", path: "/about" },
        { name: "Contact Us", path: "/contact" },
      ],
    },
    {
      name: "Services",
      subItems: [
        // { name: "Discovery", path: "/discovery" },
        { name: "Pickup and Drop", path: "https://www.matengmarket.com/delivery-rates" },
        { name: "Invoice Generator Beta", path: "https://invoicely-secure-flow.vercel.app/" },
        {
          name: "Cargo",
          path: "https://cargo4.vercel.app/",
          external: true,
        },
      ],
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow fixed top-10 left-0 right-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center">
            <img
              src="https://lhzwholxmjolpinyxxsz.supabase.co/storage/v1/object/public/competition_documents/aadhaar/Mateng%20Visiting%20Card.png"
              alt="Mateng Logo"
              className="inline-block w-120 h-16"
            />
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6" ref={dropdownRef}>
            {navItems.map((item) =>
              item.subItems ? (
                <div key={item.name} className="relative">
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === item.name ? null : item.name)
                    }
                    className="flex items-center text-gray-600 hover:text-primary transition-colors"
                  >
                    {item.name}
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </button>
                  {openDropdown === item.name && (
                    <div className="absolute top-full mt-2 bg-white border shadow rounded-md py-1 z-50 min-w-[150px]">
                      {item.subItems.map((sub) =>
                        sub.external ? (
                          <a
                            key={sub.name}
                            href={sub.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {sub.name}
                          </a>
                        ) : (
                          <NavLink
                            key={sub.name}
                            to={sub.path}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {sub.name}
                          </NavLink>
                        )
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary font-medium"
                      : "text-gray-600 hover:text-primary transition-colors"
                  }
                >
                  {item.name}
                </NavLink>
              )
            )}

            {/* Auth Section */}
            {user ? (
              <NavLink to="/admin" className="flex items-center">
                <Avatar className="h-8 w-8 hover:ring-2 hover:ring-primary transition-all">
                  <AvatarImage src={user.user_metadata?.avatar_url} />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </NavLink>
            ) : (
              <Button asChild>
                <NavLink to="/auth">Get Started</NavLink>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-400 hover:text-primary hover:bg-gray-100"
            >
              <Menu />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t animate-fade-in px-4 py-3 space-y-2">
          {navItems.map((item) =>
            item.subItems ? (
              <div key={item.name}>
                <button
                  onClick={() =>
                    setOpenDropdown(openDropdown === item.name ? null : item.name)
                  }
                  className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base text-gray-700 hover:bg-gray-50"
                >
                  {item.name}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${openDropdown === item.name ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {openDropdown === item.name && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.subItems.map((sub) =>
                      sub.external ? (
                        <a
                          key={sub.name}
                          href={sub.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-gray-600 hover:text-primary"
                        >
                          {sub.name}
                        </a>
                      ) : (
                        <NavLink
                          key={sub.name}
                          to={sub.path}
                          className="block text-gray-600 hover:text-primary"
                          onClick={() => setIsOpen(false)}
                        >
                          {sub.name}
                        </NavLink>
                      )
                    )}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={item.name}
                to={item.path}
                className="block px-3 py-2 rounded-md text-base text-gray-700 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </NavLink>
            )
          )}

          {/* Mobile Auth */}
          <div className="pt-2">
            {user ? (
              <Button className="w-full" asChild>
                <NavLink to="/admin" onClick={() => setIsOpen(false)}>
                  Admin Panel
                </NavLink>
              </Button>
            ) : (
              <Button className="w-full" asChild>
                <NavLink to="/auth" onClick={() => setIsOpen(false)}>
                  Get Started
                </NavLink>
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
