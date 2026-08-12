import { GrDocumentTest } from "react-icons/gr";
export default function Records() {
  return (
    <div className="h-screen grid place-items-center text-md text-gray-500">
      <div className="flex flex-row gap-4">
        <GrDocumentTest className="text-gray-600 mt-1" />
        No records to display
      </div>
    </div>
  );
}
