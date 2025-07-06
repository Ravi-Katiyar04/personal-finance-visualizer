'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { label: 'Dashboard', href: '/' },
    { label: 'Reports', href: '/reports' },
    { label: 'Settings', href: '/settings' },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 w-64 h-full bg-white shadow z-40 transform transition-transform duration-200 ease-in-out md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 font-bold text-lg border-b text-blue-600">💰 FinanceViz</div>
        <nav className="mt-4 px-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2 rounded hover:bg-gray-100 text-gray-700 font-medium"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Backdrop for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 ml-0 md:ml-64 min-h-screen flex flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-20 bg-white shadow px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-gray-700"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-lg font-semibold text-gray-800 hidden md:block">
              Personal Finance Dashboard
            </h1>
          </div>
        </header>

        <main className="p-4 flex-1">{children}</main>
      </div>
    </div>
  );
}
