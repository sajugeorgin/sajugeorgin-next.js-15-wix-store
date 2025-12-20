"use client";

import { productsV3 } from "@wix/stores";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { checkInStock, cn } from "@/lib/utils";

interface ProductOptionsProps {
  product: productsV3.V3Product;
  selectedOptions: Record<string, string>;
  setSelectedOptions: (options: Record<string, string>) => void;
}

const ProductOptions = ({
  product,
  selectedOptions,
  setSelectedOptions,
}: ProductOptionsProps) => {
  return (
    <div className="space-y-4">
      {/* 
        LOOP THROUGH EACH OPTION (COLOR, SIZE, ETC.)
        Example: product.options = [
          { name: "Color", choices: [...] },
          { name: "Size", choices: [...] }
        ]
      */}
      {product.options?.map((option) => (
        <fieldset key={option.name} className="space-y-2">
          {/* 
            DISPLAY THE OPTION NAME AS A LABEL
            Example: "Color:" or "Size:"
          */}
          <legend>
            <Label asChild>
              <span>{option.name}:</span>
            </Label>
          </legend>

          <div className="flex flex-wrap items-center gap-2">
            {/* 
              LOOP THROUGH EACH CHOICE WITHIN THE OPTION
              Example for Color option: ["Black", "Dark Brown"]
              Example for Size option: ["7", "8", "9", "10", "11"]
            */}
            {option.choicesSettings?.choices?.map((choice) => (
              <div key={`${option.name}-${choice.name}`}>
                {/* 
                  HIDDEN RADIO INPUT - HANDLES THE ACTUAL FORM STATE
                  
                  WHY RADIOS? Radio buttons ensure only ONE choice per option group
                  - All "Color" radios share name="option-Color" (only one can be selected)
                  - All "Size" radios share name="option-Size" (only one can be selected)
                  
                  ATTRIBUTES EXPLAINED:
                  - id: Unique identifier linking Input to Label (e.g. "Color-Black", "Size-10")
                  - name: Groups radios together (e.g. "option-Color" groups all color choices)
                  - value: The actual choice value (e.g. "Black", "7")
                  - checked: Is this the currently selected option?
                    Example: selectedOptions = { "Color": "Black", "Size": "9" }
                    "Color-Black" radio will be checked because selectedOptions["Color"] === "Black"
                  - onChange: When clicked, update selectedOptions
                    Example: Clicking "Dark Brown" updates to { "Color": "Dark Brown", "Size": "9" }
                */}
                <Input
                  type="radio"
                  id={`${option.name}-${choice.name}`}
                  name={`option-${option.name}`}
                  value={choice.name || ""}
                  checked={selectedOptions[option.name || ""] === choice.name}
                  onChange={() =>
                    setSelectedOptions({
                      ...selectedOptions,
                      [option.name || ""]: choice.name || "",
                    })
                  }
                  className="peer hidden"
                />

                {/* 
                  VISUAL LABEL - WHAT THE USER ACTUALLY SEES AND CLICKS
                  
                  HTMLFOR CONNECTION:
                  - htmlFor links this Label to the Input above via matching IDs
                  - Clicking the Label triggers the hidden Input (standard HTML behavior)
                  
                  PEER-CHECKED PATTERN:
                  - The Input has className="peer" 
                  - This Label uses "peer-checked:border-amber-600"
                  - When Input is :checked, the Label (its peer sibling) gets amber border
                  - This creates a visual "selected" state
                  
                  STOCK CHECK:
                  - checkInStock() checks if variant exists
                  - If out of stock, opacity-50 makes it look disabled
                */}
                <Label
                  htmlFor={`${option.name}-${choice.name}`}
                  className={cn(
                    "flex min-w-14 cursor-pointer items-start justify-center gap-1.5 border p-2 peer-checked:border-amber-600",
                    !checkInStock(product, {
                      ...selectedOptions,
                      [option.name || ""]: choice.name || "",
                    }) && "none opacity-50",
                  )}
                >
                  {/* 
                    SPECIAL RENDERING FOR COLOR OPTIONS
                    
                    If option is "Color", show a colored circle
                    Example: For "Black" choice, render a black circle
                    Example: For "Dark Brown" choice, render a brown circle (#AE7D2C)
                  */}
                  {option.name?.toLowerCase() === "color" ? (
                    <div
                      style={{ backgroundColor: choice.colorCode }}
                      className="size-3 rounded-full border"
                    />
                  ) : null}
                  {/* 
                    DISPLAY THE CHOICE NAME
                    Example: "Black", "Dark Brown", "7", "8", etc.
                  */}
                  <span>{choice.name}</span>
                </Label>
              </div>
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
};

export default ProductOptions;
