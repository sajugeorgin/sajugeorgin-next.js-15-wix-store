import { InfoIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const ProductAdditionalInfo = () => {
  return (
    <div className="text-muted-foreground mt-4 space-y-2 text-sm">
      <span className="flex flex-col items-start gap-1">
        <div className="flex items-center gap-2">
          <InfoIcon className="size-5" />
          <span>Additonal product infomation</span>
        </div>

        <Accordion type="multiple" className="w-full">
          <AccordionItem value="shipping_delivery" key="shipping_delivery">
            <AccordionTrigger>Shipping & Delivery</AccordionTrigger>
            <AccordionContent>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    "Free standard shipping on orders over £50. Standard delivery takes 3-5 business days. Express shipping available at checkout for next-day delivery. International shipping available to select countries.",
                }}
                className="prose text-muted-foreground dark:prose-invert text-sm"
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="returns" key="returns">
            <AccordionTrigger>Return Policy</AccordionTrigger>
            <AccordionContent>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    "We offer a 30-day money-back guarantee on all products. Items must be unworn, unwashed, and in original condition with tags attached. Free return shipping within the UK. Exchanges processed within 2-3 business days of receipt.",
                }}
                className="prose text-muted-foreground dark:prose-invert text-sm"
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="warranty" key="warranty">
            <AccordionTrigger>Warranty & Support</AccordionTrigger>
            <AccordionContent>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    "All products come with a 1-year manufacturer warranty covering defects in materials and workmanship. Contact our customer service team for warranty claims or product support. Extended warranty options available at checkout.",
                }}
                className="prose text-muted-foreground dark:prose-invert text-sm"
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </span>
    </div>
  );
};

export default ProductAdditionalInfo;
