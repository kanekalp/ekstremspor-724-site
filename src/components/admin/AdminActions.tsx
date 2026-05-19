"use client";

import { useState } from "react";
import { OnSiteEntryModal } from "@/components/admin/OnSiteEntryModal";

export function AdminActions() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full bg-sky-deep px-4 py-2 text-sm font-semibold text-paper hover:bg-sky-deep/85"
      >
        + Stant Girişi
      </button>
      <OnSiteEntryModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
