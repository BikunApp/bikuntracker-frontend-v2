import { Dialog, DialogContent } from "../ui/dialog.tsx";
import { Button } from "../ui/button.tsx";

interface ModalProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  modalType: "development" | "notOperational";
}

const Modal = ({ isOpen, setOpen, modalType }: ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {modalType === "development"
        ? developmentModal(setOpen)
        : notOperationalModal(setOpen)}
    </Dialog>
  );
};
const developmentModal = (setOpen: (open: boolean) => void) => {
  return (
    <DialogContent className="flex flex-col gap-6">
      <img
        src="/assets/development.png"
        alt="Not Operational"
        className="mt-6 w-[70%] max-md:w-[90%] self-center"
      />
      <div className="font-poppins text-center">
        <p className="font-bold">
          Terima kasih telah menggunakan Bikun Tracker!
        </p>
        <p className="text-400 text-sm">
          Saat ini Bikun Tracker sedang dalam tahap pengembangan, sehingga
          beberapa data mungkin belum sepenuhnya akurat. Kami sedang bekerja
          keras untuk memperbaikinya agar pengalaman kamu semakin nyaman.
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
  return <DialogContent>Notoperational</DialogContent>;
};

export default Modal;
