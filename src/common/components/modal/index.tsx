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
        alt="development Mode"
        className="mt-6 w-[70%] self-center max-md:w-[90%]"
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
  const OperationalHours = [
    {
      label: "Senin - Jumat",
      time: "06:50 - 21:30",
    },
    {
      label: "Sabtu",
      time: "06:50 - 16:10",
    },
    {
      label: "Minggu",
      time: "Tidak Beroperasi",
    },
  ];
  return (
    <DialogContent className="font-poppins flex flex-col gap-3">
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
        {OperationalHours.map((item, index) => (
          <div key={index} className="flex w-full items-center justify-between">
            <p className="text-sm">{item.label}</p>
            <div className="bg-primary-purple-100 text-primary-purple-700 w-1/2 rounded-full py-3 text-center text-xs font-bold">
              {item.time}
            </div>
          </div>
        ))}
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

export default Modal;
