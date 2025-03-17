import { Info } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface AddressFormHeaderProps {
  title: string;
  showSameAsShipping?: boolean;
  sameAsShipping?: boolean;
  onSameAsShippingChange?: (checked: boolean) => void;
}

export function AddressFormHeader({
  title,
  showSameAsShipping = true,
  sameAsShipping,
  onSameAsShippingChange,
}: AddressFormHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <h3 className="text-sm text-[#3B4049]">{title}</h3>
        <Info className="h-4 w-4 text-muted-foreground cursor-help opacity-50" />
      </div>
      {showSameAsShipping && (
        <div className="flex items-center gap-2">
          <Checkbox
            id="sameAsShipping"
            checked={sameAsShipping}
            onCheckedChange={onSameAsShippingChange}
            className="h-4 w-4 border-[#EBEDEF] data-[state=checked]:bg-blue-600"
          />
          <label
            htmlFor="sameAsShipping"
            className="text-sm text-[#3B4049] cursor-pointer"
          >
            Same as shipping
          </label>
        </div>
      )}
    </div>
  );
}
