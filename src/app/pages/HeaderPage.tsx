"use client";

import { useAppSelector } from "@/src/features/redux/hooks";
import MenuDropdown from "@/src/components/uiComponents/MenuDropDown";

export default function HeaderPage({ title }: { title: string }) {
  const isAuthenticated = useAppSelector(
    (state) => state?.auth?.isAuthenticated,
  );
  return (
    <div className="flex  flex-col  top-0 z-50">
      <header className="flex gap-1 ">
        <div className="w-0 h-0 border-r-[50px] border-r-transparent border-b-[80px] border-b-sky-800"></div>
        <div className="absolute top-5 bottom-0 max-w-sm mt-4 max-h-3 bg-sky-500 w-[100%]"></div>
        <div className="absolute top-10 bottom-0 max-w-sm mt-4 max-h-3 bg-sky-500 px-150"></div>
        <div className="flex items-center justify-center gap-4 p-4 text-sky-800 absolute mx-auto">
          <div className="w-full  top-0 lg:static mx-auto text-2xl font-extrabold">
            {title}
          </div>
        </div>
      </header>
      {isAuthenticated && (
        <div className="flex absolute top-5 right-0 justify-end  mr-8 mb-20 cursor-pointer">
          <MenuDropdown />
        </div>
      )}
    </div>
  );
}
