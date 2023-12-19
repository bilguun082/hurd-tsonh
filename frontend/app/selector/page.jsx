"use client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, Toaster } from "sonner";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <div className="max-screen h-full flex flex-col items-center justify-center gap-10">
      <Toaster richColors />
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex justify-center flex-col">
        <a href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-mail-warning"
          >
            <path d="M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            <path d="M20 14v4" />
            <path d="M20 22v.01" />
          </svg>
        </a>
        <Button
          onClick={() => {
            setLoading(true);
            router.push("/complaints");
          }}
          isLoading={loading}
        >
          Засвар Үйлчилгээ
        </Button>
      </div>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex justify-center flex-col">
        <a href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-mail-check"
          >
            <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            <path d="m16 19 2 2 4-4" />
          </svg>
        </a>
        <Button
          onClick={() => {
            setIsLoading(true);
            router.push("/rate");
          }}
          isLoading={isLoading}
        >
          Санал Хүсэлт
        </Button>
      </div>
    </div>
  );
}
