"use client";
import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

export default function GlobalProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <HeroUIProvider>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <div className=" text-gray-100 font-sans">{children}</div>
      </QueryClientProvider>
    </HeroUIProvider>
  );
}
