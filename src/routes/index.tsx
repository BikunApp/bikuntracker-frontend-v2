import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import Drawer from "@/common/components/drawer/index.tsx";
import Map from "@/common/components/map/index.tsx";
import NavigationBar from "@/common/components/navigation/index.tsx";
import Modal from "@/common/components/modal/index.tsx";
import { useGlobalStore } from "@/lib/store/global.ts";

export const Route = createFileRoute("/")({
  component: Page,
});

function isNotOperational(): boolean {
  const now = new Date();

  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const jakartaOffset = 7 * 60 * 60000;
  const jakartaTime = new Date(utc + jakartaOffset);

  const day = jakartaTime.getDay();
  const hour = jakartaTime.getHours();

  if (day === 0) {
    // Minggu Bikun gak Operasional
    return true;
  }

  if (day >= 1 && day <= 5) {
    // Senin - Jumat
    return hour >= 22;
  }

  if (day === 6) {
    // Sabtu
    return hour >= 17;
  }

  return false;
}

export default function Page() {
  const { hasSeenModal, setHasSeenModal } = useGlobalStore();
  const [isOpen, setIsOpen] = useState(false);
  const shouldShowNotOperational = isNotOperational();
  const isWisudaPeriod = false; // Ganti ke true pas wisuda

  const modalType = (() => {
    if (isWisudaPeriod) return "wisuda";
    if (shouldShowNotOperational) return "notOperational";
    return "development";
  })();

  const isStaging =
    import.meta.env.MODE === "staging" ||
    import.meta.env.VITE_APP_ENV === "staging";

  useEffect(() => {
    if (isStaging) {
      setIsOpen(false);
      return;
    }
    if (isWisudaPeriod) {
      setIsOpen(true);
      return;
    }
    if (shouldShowNotOperational) {
      setIsOpen(true);
    } else if (!hasSeenModal) {
      setIsOpen(true);
      setHasSeenModal?.(true);
    }
  }, [shouldShowNotOperational, hasSeenModal, setHasSeenModal]);

  return (
    <>
      <NavigationBar />
      <Drawer />
      <div className="absolute top-0 right-0 bottom-0 left-0 z-0">
        <Map />
      </div>
      <Modal isOpen={isOpen} setOpen={setIsOpen} modalType={modalType} />
    </>
  );
}
