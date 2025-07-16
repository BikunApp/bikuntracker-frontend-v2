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
  return jakartaTime.getHours() >= 22;
}

export default function Page() {
  const { hasSeenModal, setHasSeenModal } = useGlobalStore();
  const [isOpen, setIsOpen] = useState(false);
  const shouldShowNotOperational = isNotOperational();

  const modalType = shouldShowNotOperational ? "notOperational" : "development";
 console.log(isNotOperational())
  useEffect(() => {
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
