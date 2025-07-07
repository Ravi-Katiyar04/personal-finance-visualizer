'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  BarChart,
  PiggyBank,
  Target,
  Menu,
  X,
} from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Home', icon: <Home size={18} />, href: '/' },
    { label: 'Analytics', icon: <BarChart size={18} />, href: '/analytics' },
    { label: 'Dashboard', icon: <PiggyBank size={18} />, href: '/dashboard' },
    { label: 'Budget', icon: <Target size={18} />, href: '/budget' },
  ];

  return (
    <>
      {/* Header */}
      <header className="w-full border-b bg-white shadow-sm px-4 py-3 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 text-lg font-bold text-gray-900">
            💰 FinanceViz
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-800">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 px-3 py-2 rounded-md transition ${
                      isActive
                        ? 'bg-black text-white'
                        : 'hover:bg-gray-100 hover:text-black'
                    }`}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>


          {/* Hamburger */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="fixed top-0 left-0 w-64 h-full bg-white z-50 shadow-md p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-bold flex items-center gap-2">
                <PiggyBank size={20} />
                FinanceTrack
              </div>
              <button onClick={() => setOpen(false)} className="text-gray-600">
                <X size={20} />
              </button>
            </div>

            <ul className="space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md transition ${
                        isActive
                          ? 'bg-black text-white'
                          : 'hover:bg-gray-100 hover:text-black text-gray-800'
                      }`}
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

          </div>
        </>
      )}
    </>
  );
}
