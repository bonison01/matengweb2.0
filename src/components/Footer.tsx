
import { NavLink } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 font-poppins italic">mateng</h3>

            <p className="text-gray-400 mb-4">
              Connecting communities through innovative hyperlocal delivery solutions since December 2022.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/matenggroup" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              {/* <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a> */}
              <a href="https://www.instagram.com/justmateng?igsh=MTJpZ2RhaDZ0dWtkMw%3D%3D&utm_source=qr" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/company/justmateng/" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/services" className="text-gray-400 hover:text-white transition-colors">
                  Our Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/competition" className="text-gray-400 hover:text-white transition-colors">
                  Maths Competition June 22 2025
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/auth" className="text-gray-400 hover:text-white transition-colors">
                  Login / Dashboard
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Our Verticals</h3>
            <ul className="space-y-2">
              <li>
                <NavLink to="/delivery" className="text-gray-400 hover:text-white transition-colors">
                  Mateng Delivery
                </NavLink>
              </li>
              <li>
                <NavLink to="https://matengmarket.com/discover" className="text-gray-400 hover:text-white transition-colors">
                  Mateng Discovery
                </NavLink>
              </li>
              <li>
                <NavLink to="/education" className="text-gray-400 hover:text-white transition-colors">
                  Mateng Education
                </NavLink>
              </li>
              <li>
                <NavLink to="https://matengmarket.com/products" className="text-gray-400 hover:text-white transition-colors">
                  Mateng Marketplace
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 text-primary shrink-0 mt-1" />
                <span className="text-gray-400">
                  Sagolband Sayang Leirak, Sagolband, Imphal West, Imphal-795004
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-primary shrink-0" />
                <a href="tel:+11234567890" className="text-gray-400 hover:text-white transition-colors">
                  +1 (91) 8787649928
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-primary shrink-0" />
                <a href="mailto:info@mateng.com" className="text-gray-400 hover:text-white transition-colors">
                  admin@justmateng.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-400">
            © {currentYear} mateng. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
