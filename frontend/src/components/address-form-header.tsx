import { Info } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  const handleChange = (checked: boolean) => {
    if (onSameAsShippingChange) {
      onSameAsShippingChange(checked);
    }
  };

  const getTooltipText = () => {
    if (title.toLowerCase().includes("billing")) {
      return "This is the address associated with your card or payment method.";
    }
    if (title.toLowerCase().includes("shipping")) {
      return "This is where your order will be delivered.";
    }
    return "";
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <h3 className="text-sm text-[#3B4049]">{title}</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-muted-foreground opacity-50 cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{getTooltipText()}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {showSameAsShipping && (
        <div className="flex items-center gap-2">
          <Checkbox
            id="sameAsShipping"
            checked={sameAsShipping}
            onCheckedChange={handleChange}
            className="h-4 w-4 border-[#EBEDEF] data-[state=checked]:bg-blue-600"
          />
          <label
            htmlFor="sameAsShipping"
            className="text-sm text-[#3B4049] cursor-pointer"
            onClick={() => handleChange(!sameAsShipping)}
          >
            Same as shipping
          </label>
        </div>
      )}
    </div>
  );
}
