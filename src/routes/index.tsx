import { createFileRoute } from "@tanstack/react-router";

import Drawer from "@/common/components/drawer/index.tsx";
import Map from "@/common/components/map/index.tsx";
import NavigationBar from "@/common/components/navigation/index.tsx";
import { useGlobalStore } from "@/lib/store/global.ts";
import Modal from "@/common/components/modal/index.tsx";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: Page,
});

export default function Page() {
  const { message,hasSeenModal,setHasSeenModal } = useGlobalStore();
  const type =
    message?.operationalStatus === 2 ? "notOperational" : "development";
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!hasSeenModal) {
      setIsOpen(true);
      setHasSeenModal?.(true);
    }
  }, [hasSeenModal, setHasSeenModal]);

  return (
    <>
      <NavigationBar />
      <Drawer />
      <div className="absolute top-0 right-0 bottom-0 left-0 z-0">
        <Map />
      </div>
        <Modal isOpen={isOpen} setOpen={setIsOpen} modalType={type} />
    </>
  );
}
