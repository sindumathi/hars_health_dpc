"use client";
import LetterAvatar from "./LetterAvatar";
import { useAppSelector, useAppDispatch } from "@/src/features/redux/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Axios from "../../features/services/axios";
import { clearAccessToken } from "@/src/features/redux/slice/authSlice";
import { useRouter } from "next/navigation";
export default function MenuDropdown() {
  const router = useRouter();
  const userName = useAppSelector(
    (state) => state?.auth?.userName || "Hk User",
  );
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    try {
      const response = await Axios.post("/api/logout");
      await dispatch(clearAccessToken());
      router.push("/login");
    } catch (err) {
      console.log("error", err);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <LetterAvatar name={userName} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <div className="flex gap-1 ">
              {" "}
              <LetterAvatar size="small" name={userName} />
              <div className="mt-1">{userName}</div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
