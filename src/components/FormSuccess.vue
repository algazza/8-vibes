<script setup lang="ts">
import qris from "@/assets/QRIS.jpeg";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import type { formSchema } from "@/type";
import type z from "zod";
import { totalPrice } from "@/lib/totalPrice";
import { computed } from "vue";
import { useLocalStorage } from "@vueuse/core";
type FormDataType = z.infer<typeof formSchema>;

const { data } = defineProps<{
  data: FormDataType;
}>();

const isNewCheckout = useLocalStorage("isNew", false);

const fixPrice = computed(() => {
  if (!data.size || !data.sleeve) return 0;
  return totalPrice(data.size, data.sleeve);
});

const depositePrice = computed(() => {
  if (!data.size || !data.sleeve) return 0;
  return totalPrice(data.size, data.sleeve) / 2;
});

const handleClear = () => {
  localStorage.removeItem("form-data");
  isNewCheckout.value = true;
};
</script>

<template>
  <section>
    <div class="grid gap-2 p-4 border rounded-md">
      <div class="grid grid-cols-2">
        <span class="font-bold">Nama</span>
        <span class="">: {{ data.name }}</span>
      </div>
      <div class="grid grid-cols-2">
        <span class="font-bold">Posisi</span>
        <span class="">: {{ data.position }}</span>
      </div>
      <div class="grid grid-cols-2">
        <span class="font-bold">Kelas</span>
        <span class="">: {{ data.classes }}</span>
      </div>
      <div class="grid grid-cols-2">
        <span class="font-bold">Nomor Handphone</span>
        <span class="">: {{ data.number }}</span>
      </div>
      <div class="grid grid-cols-2">
        <span class="font-bold">Size baju</span>
        <span class="">: {{ data.size }}</span>
      </div>
      <div class="grid grid-cols-2">
        <span class="font-bold">Lengan</span>
        <span class="">: {{ data.sleeve }}</span>
      </div>
      <div class="grid grid-cols-2">
        <span class="font-bold">Pembayaran</span>
        <span class="">: {{ data.payment }}</span>
      </div>
    </div>

    <div class="grid gap-2 mt-4">
      <div class="flex justify-between">
        <span class="font-bold">Total</span>
        <span>Rp {{ fixPrice.toLocaleString("id-ID") }}</span>
      </div>
      <div class="flex justify-between">
        <span class="font-bold">Dp minimal</span>
        <span>Rp {{ depositePrice.toLocaleString("id-ID") }}</span>
      </div>

      <div v-if="data.payment === 'Transfer'">
        <span class="font-bold">Transfer Mandiri</span> <br />
        1360036619739 a/n FADHIL AL GHAZA ASWA
      </div>

      <div v-else-if="data.payment === 'QRIS'">
        <span class="font-bold">QRIS:</span>
        <div class="flex justify-center">
          <img :src="qris" alt="qris" class="max-w-60" />
        </div>
      </div>

      <div v-else>
        <span class="font-bold">Pembayaran cash diberikan ke salah satu:</span>
        <a
          href="https://wa.me/62895635004580"
          class="px-4 py-2 border rounded-md bg-[#25D366] text-white font-semibold flex gap-4 items-center mt-2"
        >
          <div class="rounded-full border-2 border-white p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-phone-icon lucide-phone"
            >
              <path
                d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"
              />
            </svg>
          </div>
          Fadhil Al Ghaza (XII PPLG 3)
        </a>
        <a
          href="https://wa.me/6282229617646"
          class="px-4 py-2 border rounded-md bg-[#25D366] text-white font-semibold flex gap-4 items-center mt-2"
        >
          <div class="rounded-full border-2 border-white p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-phone-icon lucide-phone"
            >
              <path
                d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"
              />
            </svg>
          </div>
          Sophitia Alyssa (XI LK 1)
        </a>
      </div>
    </div>

    <div class="w-full">
      <h2 class="text-lg md:text-xl font-bold mt-6 mb-2 text-center">
        Terimakasih sudah belanja di osis8_store ;)
      </h2>
      <p class="text-gray-600 text-sm">
        Tanggal baju siap diambil akan kami umumkan lewat Instagram <a href="https://www.instagram.com/osis8_store/" class="font-bold">@osis8_store</a> atau update di website ini. Ditunggu kabar resminya ya!
      </p>
      <AlertDialog>
        <AlertDialogTrigger class="w-full mt-4">
          <Button class="w-full">Pesan Lagi</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle
              >Apakah kamu yakin membeli ulang?</AlertDialogTitle
            >
            <AlertDialogDescription>
              Data sebelumnya tetap ada dan pesanan selanjutnya merupakan
              pesanan baru, yakin untuk membeli lagi?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction :onclick="handleClear">Iya</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  </section>
</template>
