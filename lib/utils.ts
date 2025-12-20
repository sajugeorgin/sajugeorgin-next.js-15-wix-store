import { productsV3 } from "@wix/stores";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Create a delay function - for learning purposes!
export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Get all the details of a product variant via selected options
export function findVariant(
  product: productsV3.V3Product,
  selectedOptions: Record<string, string>,
) {
  return product.variantsInfo?.variants?.find((variant) => {
    // Build a map of option keys to choice keys for this variant
    const variantChoices: Record<string, string> = {};

    variant.choices?.forEach((choice) => {
      const optionId = choice.optionChoiceIds?.optionId;
      const choiceId = choice.optionChoiceIds?.choiceId;

      if (optionId && choiceId) {
        // Find the option to get its key
        const option = product.options?.find((opt) => opt._id === optionId);

        if (option && "key" in option) {
          const optionKey = option.key as string;

          // Find the choice within that option to get its key
          const choiceObj = option.choicesSettings?.choices?.find(
            (c) => c.choiceId === choiceId,
          );

          if (choiceObj && "key" in choiceObj) {
            variantChoices[optionKey] = choiceObj.key as string;
          }
        }
      }
    });

    // Now compare with selectedOptions
    return Object.entries(selectedOptions).every(
      ([key, value]) => variantChoices[key] === value,
    );
  });
}

// Check if a variant is still in stock
export function checkInStock(
  product: productsV3.V3Product,
  selectedOptions: Record<string, string>,
) {
  // Call findVariant function
  const variant = findVariant(product, selectedOptions);

  // If no variant return
  if (!variant) return false;

  // Else return variant in stock status
  return variant.inventoryStatus?.inStock;
}
