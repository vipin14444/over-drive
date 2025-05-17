import type { ComponentPropsWithoutRef } from "react";

export default function MacOSFrame({
  children,
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div className="border border-neutral-800 rounded-2xl overflow-hidden">
      <header className="bg-[#2C2B29]">
        
      </header>
      <div>{children}</div>
    </div>
  );
}
