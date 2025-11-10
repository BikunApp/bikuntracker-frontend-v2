import { Dialog, DialogContent } from "../ui/dialog.tsx";
import { Button } from "../ui/button.tsx";
import { Link } from "@tanstack/react-router";
import { busSchedule } from "@/common/constants/busSchedule.ts";
import {
  CHANGE_ROUTE,
  DAMRI_DOWN,
  // DEVELOPMENT,
} from "@/common/constants/modalCopyWriting.ts";

interface ModalProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  modalType: "development" | "notOperational" | "wisuda" | "damriDown";
}

const Modal = ({ isOpen, setOpen, modalType }: ModalProps) => {
  const renderModalContent = () => {
    switch (modalType) {
      case "development":
        return developmentModal(setOpen);
      case "wisuda":
        return wisudaModal(setOpen);
      case "notOperational":
        return notOperationalModal(setOpen);
      case "damriDown":
        return damriDownModal();
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={modalType === "development" ? setOpen : () => {}}
    >
      {renderModalContent()}
    </Dialog>
  );
};

const developmentModal = (setOpen: (open: boolean) => void) => {
  return (
    <DialogContent className="flex flex-col gap-6" showCloseButton={false}>
      <img
        src="/assets/development.png"
        alt="Development Mode"
        className="mt-6 w-[70%] self-center max-md:w-[90%]"
      />
      <div className="font-poppins text-center">
        <p className="font-bold">
          Terima kasih telah menggunakan Bikun Tracker!
        </p>
        <p className="text-400 text-sm whitespace-pre-line">{CHANGE_ROUTE}</p>
      </div>
      <Button
        className="rounded-[20px] py-7 text-base font-bold"
        onClick={() => setOpen(false)}
      >
        Tutup
      </Button>
    </DialogContent>
  );
};

const damriDownModal = () => {
  return (
    <DialogContent className="flex flex-col gap-6" showCloseButton={false}>
      <img
        src="/assets/bikun-down.svg"
        alt="Down"
        className="mt-6 self-center max-md:w-[80%] w-[55%]"
      />
      <div className="font-poppins text-center">
        <p className="font-bold">
          Terima kasih telah menggunakan Bikun Tracker!
        </p>
        <p className="text-400 text-sm whitespace-pre-line">{DAMRI_DOWN}</p>
      </div>
    </DialogContent>
  );
};


const wisudaModal = (setOpen: (open: boolean) => void) => {
  return (
    <DialogContent className="flex flex-col gap-6" showCloseButton={false}>
      <img
        src="/assets/development.png"
        alt="development Mode"
        className="mt-6 w-[70%] self-center max-md:w-[90%]"
      />
      <div className="font-poppins text-center">
        <p className="font-bold">INFORMASI PENYESUAIAN RUTE BIKUN</p>
        <p className="text-400 text-sm">
          Dalam rangka Gladi Resik dan Wisuda UI Semester Genap 2024/2025 pada
          8-13 September 2025, akan diberlakukan rekayasa lalu lintas dan
          sentralisasi akses masuk. Selama periode ini, rute Bikun hanya
          melayani satu jalur yang melewati Balairung dan Hutan Kota.
        </p>
      </div>
      <Button
        className="rounded-[20px] py-7 text-base font-bold"
        onClick={() => setOpen(false)}
      >
        Tutup
      </Button>
    </DialogContent>
  );
};

const notOperationalModal = (setOpen: (open: boolean) => void) => {
  return (
    <DialogContent
      className="font-poppins flex flex-col gap-3"
      showCloseButton={false}
    >
      <img
        src="/assets/not-operational.png"
        alt="Not Operational"
        className="w-[70%] self-center"
      />
      <div className="text-center">
        <p className="font-bold">
          Maaf, saat ini Bis Kuning sedang tidak beroperasi!
        </p>
        <p className="text-400 text-sm">
          Untuk informasi lebih lanjut terkait informasi Bis Kuning yang
          beroperasi, silakan lihat jadwal terbaru di halaman kami.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-primary-purple-700 text-center font-bold">
          Jam Operasional
        </p>
        {busSchedule.map((item) => (
          <div
            key={item.label}
            className="flex w-full items-center justify-between"
          >
            <p className="text-sm">{item.label}</p>
            <div className="bg-primary-purple-100 text-primary-purple-700 w-1/2 rounded-full py-3 text-center text-xs font-bold">
              {item.time}
            </div>
          </div>
        ))}
      </div>
      <Link to="/bus-schedule" className="w-full">
        <Button
          className="w-full rounded-[20px] py-7 text-base font-bold"
          onClick={() => setOpen(false)}
        >
          Lihat jadwal
        </Button>
      </Link>
    </DialogContent>
  );
};

export default Modal;
