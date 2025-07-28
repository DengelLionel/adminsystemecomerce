"use client"
import Sidebar from '../../components/Slidebar';
import React, { useState } from 'react';
export default function AdministraLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="md:flex md:min-h-screen">
      <Sidebar  isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className={`md:flex-1 p-6 bg-[#f3f4f6] relative ml-0 transition-all duration-300 overflow-x-hidden ${isOpen ? 'hidden md:block' : ''}`}>
        {children}
      </main>
    </div>
  );
}
