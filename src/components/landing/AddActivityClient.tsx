"use client";

import { useEffect, useState } from "react";
import { AddActivityModal } from "@/components/modals/AddActivityModal";

type Props = {
  userId: string;
};

export function AddActivityClient({ userId }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handler() {
      setOpen(true);
    }
    window.addEventListener("open-add-activity", handler);
    return () => window.removeEventListener("open-add-activity", handler);
  }, []);

  return (
    <AddActivityModal
      open={open}
      onClose={() => setOpen(false)}
      userId={userId}
    />
  );
}
