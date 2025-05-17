import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

export default function Container({
  className,
  children,
}: ComponentPropsWithoutRef<"div">) {
  return <div className={clsx("mx-auto max-w-7xl", className)}>{children}</div>;
}
