"use client";

import { useState } from "react";
import { KvkkModal } from "@/components/modals/KvkkModal";

type Props = {
  className?: string;
  children?: React.ReactNode;
};

export function KvkkLink({ className, children }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className}
      >
        {children ?? "KVKK"}
      </button>
      <KvkkModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
