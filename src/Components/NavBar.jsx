"use client";

import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);


  const user = true; // Replace with actual authentication logic
  // ১. মেইন নেভিগেশন অবজেক্ট
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Tasks", path: "/tasks" },
    { name: "Freelancers", path: "/freelancers" },
    user && { name: "Dashboard", path: "/dashboard" }
  ];

  // ২. ড্রপডাউন (Services) অবজেক্ট
  const serviceLinks = [
    { name: "Web Development", path: "/services/web" },
    { name: "App Development", path: "/services/app" },
    { name: "SEO Marketing", path: "/services/seo" },
  ];

  // ৩. প্রোফাইল মেনু অবজেক্ট
  const profileLinks = [
    { name: "Your Profile", path: "/profile" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <nav className="bg-white shadow-md w-full z-50 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* LEFT SIDE: Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAtHML0MthDDss1oTiVHLXOY5zNks2W7gdiyPIs3lTg2Ok7yhJDeGto0c&s=10" 
                alt="Logo" 
                className="h-15 w-40 cursor-pointer"
              />
            </Link>
          </div>

          {/* CENTER: Desktop Navigation (Mapping NavLinks) */}
          <div className="hidden md:flex flex-grow justify-center space-x-8 items-center">
            {navLinks.slice(0, 2).map((link, index) => (
              <Link key={index} href={link.path} className="text-gray-700 hover:text-blue-600 font-medium transition">
                {link.name}
              </Link>
            ))}

            {/* Services Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button className="flex items-center text-gray-700 group-hover:text-blue-600 font-medium transition focus:outline-none">
                Services
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isServicesOpen && (
                <div className="absolute left-0 mt-0 w-48 bg-white border border-gray-100 rounded-md shadow-lg py-2 z-50">
                  {serviceLinks.map((service, index) => (
                    <Link key={index} href={service.path} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Remaining Nav Links (Freelancers) */}
            <Link href="/freelancers" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Freelancers
            </Link>
          </div>

         {user ?
          <div className="hidden md:flex items-center">
            <div className="relative ml-3">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-blue-500 transition"
              >
                <img
                  className="h-9 w-9 rounded-full object-cover"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User Profile"
                />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-md shadow-lg py-2 z-50">
                  <div className="px-4 py-2 text-xs text-gray-500 border-b">Manage Account</div>
                  {profileLinks.map((pLink, index) => (
                    <Link key={index} href={pLink.path} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                      {pLink.name}
                    </Link>
                  ))}
                  <hr className="my-1" />
                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>:<div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Login
            </Link>
            <Link href="/signup" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
              Sign Up
            </Link>
          </div>}

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-700">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU CONTENT (Mapping Everything) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 pb-4">
          {navLinks.map((link, index) => (
            <Link key={index} href={link.path} className="block px-4 py-3 text-gray-700 hover:bg-blue-50 font-medium">
              {link.name}
            </Link>
          ))}
          
          <div className="px-4 py-2 text-gray-400 text-xs uppercase font-bold">Services</div>
          {serviceLinks.map((service, index) => (
            <Link key={index} href={service.path} className="block px-8 py-2 text-gray-700 hover:text-blue-600">
              {service.name}
            </Link>
          ))}
          
          <hr className="my-2" />
          
          <div className="px-4 py-2 text-gray-400 text-xs uppercase font-bold">Account</div>
          {profileLinks.map((pLink, index) => (
            <Link key={index} href={pLink.path} className="block px-4 py-2 text-gray-700 hover:bg-blue-50">
              {pLink.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;