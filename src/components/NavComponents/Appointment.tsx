import { SlCalender } from "react-icons/sl";
export default function Appointments() {
  return (
    <div className="h-screen grid place-items-center text-md text-gray-500">
      <div className="flex flex-row gap-4">
        <SlCalender className="text-gray-600 mt-1" />
        No upcoming appointments
      </div>
    </div>
  );
}
