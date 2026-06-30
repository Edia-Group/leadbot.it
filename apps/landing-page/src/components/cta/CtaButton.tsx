import { cva } from "@typebot.io/ui/lib/cva";

export const ctaButtonVariants = cva("", {
  variants: {
    variant: {
      default:
        "relative overflow-hidden text-white bg-linear-to-b border border-[#0B4D42] from-[#158974] to-[#0E5F52] to-57% shadow-[inset_0_3px_2px_0_rgba(255,255,255,0.18)] active:from-[#0B4D42] active:to-[#0E5F52] active:from-43% active:to-100% active:shadow-[inset_0_-2px_2px_0_rgba(255,255,255,0.12)] before:bg-transparent hover:before:bg-white/40 before:w-1/4 before:absolute before:-left-[40%] hover:before:left-[120%] before:transition-[left] before:duration-0 hover:before:duration-700 before:blur-md before:-rotate-45 before:aspect-1/2",
      secondary:
        "relative overflow-hidden text-[#14231E] bg-linear-to-b border border-[#9A6A1E] from-[#E9C382] to-[#E0A24A] to-57% shadow-[inset_0_3px_2px_0_rgba(255,255,255,0.35)] active:from-[#E0A24A] active:to-[#C9893A] active:from-43% active:to-100% active:shadow-[inset_0_-2px_2px_0_rgba(0,0,0,0.10)] before:bg-transparent hover:before:bg-white/40 before:w-1/4 before:absolute before:-left-[40%] hover:before:left-[120%] before:transition-[left] before:duration-0 hover:before:duration-700 before:blur-md before:-rotate-45 before:aspect-1/2 ",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
