"use client";

import dynamic from "next/dynamic";

const OnboardingModal = dynamic(
  () => import("./OnboardingModal").then((m) => m.OnboardingModal),
  { ssr: false },
);

export function OnboardingModalClient(props: {
  userId: string;
  email: string;
}) {
  return <OnboardingModal {...props} />;
}
