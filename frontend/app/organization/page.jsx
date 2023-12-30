"use client";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { useAuth } from "@/context/auth-context";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const { setUserData, setRole, userData, role } = useAuth();
  const router = useRouter();
  const LoginFunc = async () => {
    try {
      const res = await axios.post(
        `https://hurd-backend.onrender.com/resident/login`,
        {
          username: user.username,
          password: user.password,
        }
      );
      if (res.data.match === true) {
        Cookies.set("token", res.data.token);
        // successToast();
        console.log(res);
        setUserData(res.data.username);
        setRole(res.data.role);
        setIsLoading(false);
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      // failureToast();
    }
  };
  return (
    <>
      <div class="w-screen h-screen flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              class="space-y-4 md:space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                setIsLoading(true);
                LoginFunc();
              }}
            >
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your username
                </label>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  value={user.username}
                  onChange={(e) => {
                    setUser({ ...user, username: e.target.value });
                  }}
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Username"
                  required
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  value={user.password}
                  onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                  }}
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <Input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label
                      for="remember"
                      class="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <Button type="submit" isLoading={isLoading}>
                Sign in
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
