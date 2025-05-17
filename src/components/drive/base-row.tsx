import React, { type PropsWithChildren } from "react";

export default function BaseRow({ children }: PropsWithChildren) {
  return (
    <div className="py-1">
      <div className="flex items-center gap-4 rounded-lg p-3 py-2 hover:cursor-pointer hover:bg-neutral-900">
        {children}
      </div>
    </div>
  );
}
