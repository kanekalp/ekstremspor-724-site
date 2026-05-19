"use client";

import { useState } from "react";
import { Hero } from "@/components/landing/Hero";
import { AuthModal } from "@/components/modals/AuthModal";

type Props = {
  isAuthed: boolean;
};

export function HeroClient({ isAuthed }: Props) {
  const [authOpen, setAuthOpen] = useState(false);

  function handlePrimary() {
    if (isAuthed) {
      window.dispatchEvent(new CustomEvent("open-add-activity"));
    } else {
      setAuthOpen(true);
    }
  }

  return (
    <>
      <Hero isAuthed={isAuthed} onPrimary={handlePrimary} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
