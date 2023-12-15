import { cx } from "@/utils/all";

export default function Container(props) {
  return (
    <div className={cx("container mx-auto", props.className)}>
      {props.children}
    </div>
  );
}