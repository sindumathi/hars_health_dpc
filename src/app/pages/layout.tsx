"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/src/features/redux/hooks";
import { setAccessToken } from "@/src/features/redux/slice/authSlice";
import Axios from "@/src/features/services/axios";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const accessToken = useAppSelector((state) => state?.auth?.accessToken);
  console.log("test", !accessToken);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (accessToken) {
        setIsChecking(false);
        return;
      }

      try {
        const res = await Axios.post("/api/refresh");
        const data = res.data;

        if (data?.accessToken) {
          await dispatch(
            setAccessToken({
              accessToken: data.accessToken,
              userName: data.userName,
              isAuthenticated: true,
            }),
          );
          setIsChecking(false);
        } else {
          throw new Error("No access token received");
        }
      } catch (error) {
        console.error("Refresh failed:", error);
        //router.replace(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
      }
    };

    checkAuth();
  }, [router, pathname]);

  if (isChecking) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}
