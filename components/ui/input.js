import { cx } from "@/utils/all";

export default function input({ className, ...props }) {
  return (
    <input
      className={cx("rounded-md ring-1 ring-gray-400 placeholder:text-gray-400 sm:leading-6", className)}
      {...props}
    >
      {props.children}
    </input>
  );
}