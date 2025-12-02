"use client";

import { productsV3 } from "@wix/stores";
import { Label } from "../ui/label";

interface ProductOptionsProps {
  product: productsV3.V3Product;
}

const ProductOptions = ({ product }: ProductOptionsProps) => {
  return (
    <div className="space-y-4">
      {product.options?.map((option) => (
        <fieldset key={option.name} className="space-y-2">
          {/* 1. OPTION NAME E.G. COLOR AND SIZE */}
          <legend>
            <Label asChild>
              <span>{option.name}:</span>
            </Label>
          </legend>

          <div className="flex flex-wrap items-center gap-2">
            {option.choicesSettings?.choices?.map((choice) => (
              <div key={`${option.name}-${choice.name}`}>
                {/* RADIOS FORM A GROUP WHEN THEY SHARE THE SAME 'NAME' */}
                {/* ID = UNIQUE IDENTIFIER FOR THIS SPECIFIC CHOICE, E.G. COLOR-BLACK, SIZE-10 */}
                {/* NAME - CONTROLS GROUPING */}
                <input
                  type="radio"
                  id={`${option.name}-${choice.name}`}
                  name={`option-${option.name}`}
                  value={choice.name || ""}
                  className="peer hidden"
                />

                <Label
                  htmlFor={`${option.name}-${choice.name}`}
                  className="flex min-w-14 cursor-pointer items-start justify-center gap-1.5 border p-2 peer-checked:border-amber-600"
                >
                  {/* RENDER COLOR */}
                  {option.name?.toLowerCase() === "color" ? (
                    <div
                      style={{ backgroundColor: choice.colorCode }}
                      className="size-3 rounded-full border"
                    />
                  ) : null}
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
