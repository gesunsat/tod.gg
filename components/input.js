import { cn } from "@/lib/utils"

export default function Input({ className, ...props }) {
  return (
    <input
      className={cn("rounded-md ring-1 ring-gray-400 placeholder:text-gray-400 sm:leading-6", className)}
      {...props}
    >
      {props.children}
    </input>
  );
}