import { cx } from "@/utils/all";

export default function InputGroup({ className, ...props }) {
  return (
    <div
      className={cx("relative flex flex-wrap rounded-md ring-1 ring-gray-400 placeholder:text-gray-400 sm:leading-6", className)}
    >
      {props.children}
    </div>
  );
}