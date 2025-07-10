"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function GlobalLoading() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Show loading immediately when pathname changes
    setIsLoading(true);
    
    // Hide loading after a short delay to ensure content is ready
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Listen for link clicks
  useEffect(() => {
    const handleLinkClick = () => {
      setIsLoading(true);
    };

    // Add click listeners to all links
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
      link.addEventListener('click', handleLinkClick);
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleLinkClick);
      });
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="text-lg font-medium text-gray-700">Loading...</p>
      </div>
    </div>
  );
} 