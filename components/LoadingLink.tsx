"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LoadingLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function LoadingLink({ href, children, className, onClick }: LoadingLinkProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    setIsLoading(true);
    onClick?.();
    
    // Small delay to show loading state
    setTimeout(() => {
      router.push(href);
    }, 50);
  };

  return (
    <>
      <Link href={href} className={className} onClick={handleClick}>
        {children}
      </Link>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="text-lg font-medium text-gray-700">Loading...</p>
          </div>
        </div>
      )}
    </>
  );
} 