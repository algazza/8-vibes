import { toTypedSchema } from "@vee-validate/zod";
import z from "zod";

export const positionArray = ["Siswa", "Guru / Staff", "Alumni"];
export const classArray = [
  "Lainnya",
  "X PS 1",
  "X PS 2",
  "X LK 1",
  "X LK 2",
  "X TJKT 1",
  "X TJKT 2",
  "X DKV 1",
  "X DKV 2",
  "X DKV 3",
  "X PPLG 1",
  "X PPLG 2",
  "X PPLG 3",
  "XI PS 1",
  "XI PS 2",
  "XI LK 1",
  "XI LK 2",
  "XI TJKT 1",
  "XI TJKT 2",
  "XI DKV 1",
  "XI DKV 2",
  "XI DKV 3",
  "XI PPLG 1",
  "XI PPLG 2",
  "XI PPLG 3",
  "XII PS 1",
  "XII PS 2",
  "XII LK 1",
  "XII LK 2",
  "XII TJKT 1",
  "XII TJKT 2",
  "XII DKV 1",
  "XII DKV 2",
  "XII DKV 3",
  "XII PPLG 1",
  "XII PPLG 2",
  "XII PPLG 3",
];
export const sizeArray = [
  "S",
  "M",
  "L",
  "XL",
  "2XL",
  "3XL",
  "4XL",
  "5XL",
  "6XL",
  "7XL",
];
export const sleeveArray = ["Panjang", "Pendek"];
export const paymentArray = ["Cash", "QRIS", "Transfer"];

const PositionEnum = z.enum(positionArray).refine((val) => !!val, {
  message: "Posisi wajib dipilih",
});
const ClassEnum = z.enum(classArray).refine((val) => !!val, {
  message: "Kelas harus diisi",
});
const SizeEnum = z.enum(sizeArray).refine((val) => !!val, {
  message: "Size harus diisi",
});
const SleeveEnum = z.enum(sleeveArray).refine((val) => !!val, {
  message: "Ukuran lengan harus diisi",
});
const PaymentEnum = z.enum(paymentArray).refine((val) => !!val, {
  message: "Pembayaran harus diisi",
});

export const formSchema = toTypedSchema(
  z.object({
    name: z.string().nonempty("Nama harus diisi"),
    position: PositionEnum,
    classes: ClassEnum,
    number: z.string().regex(/^\+62\d+$/, "Nomor harus diawali dengan +62"),
    size: SizeEnum,
    sleeve: SleeveEnum,
    payment: PaymentEnum,
  })
);
