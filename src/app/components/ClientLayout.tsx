"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import Navbar from "./Navbar";
import { Toaster } from 'react-hot-toast';

const DynamicFooter = dynamic(() => import('./Footer'), {
  loading: () => <div className="animate-pulse bg-gray-100 h-96"></div>,
  ssr: true
});

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <DynamicFooter />
      <Toaster position="top-right" />
    </>
  );
} 