"use client";

import { ThemeProvider } from "next-themes";
import Sidebar from "@/components/admin/Sidebar";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-gray-50 dark:bg-[#050505] text-gray-900 dark:text-gray-100 flex font-sans transition-colors duration-300 selection:bg-blue-500/30 selection:text-blue-900 dark:selection:text-blue-100">
        {!isLoginPage && <Sidebar />}
        <main className={`flex-1 h-screen overflow-y-auto p-6 md:p-10 lg:p-12 ${isLoginPage ? 'flex items-center justify-center' : ''}`}>
          <div className={`max-w-[1600px] mx-auto w-full`}>
            {children}
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}
