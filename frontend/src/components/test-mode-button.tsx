import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function TestModeButton() {
  return (
    <Button
      variant="outline"
      className="bg-white hover:bg-gray-50 rounded-full shadow-md flex items-center gap-2 px-4 py-2 h-12 w-40"
    >
      <AlertCircle className="h-5 w-5 text-white fill-amber-500" />
      <span className="font-medium text-xs">Test mode</span>
      <span className="ml-2">
        <Image
          src="/arrow-right-circle.svg"
          alt="arrow-right-circle"
          width={24}
          height={24}
        />
      </span>
    </Button>
  );
}
