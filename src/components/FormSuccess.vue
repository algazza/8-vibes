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

      <div
        class="p-4 pl-12 border-2 rounded-md border-yellow-200 bg-neutral-100 mb-4 relative"
      >
        <div class="absolute left-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f0B100"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-triangle-alert-icon lucide-triangle-alert"
          >
            <path
              d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"
            />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
          </svg>
        </div>
        <p class="font-bold">Catatan Penting:</p>
        <p class="text-sm">
          DP minimal sebelum 30 Agustus 2025, setelahnya akan dianggap hangus.
          <br />
          Pelunasan sebelum 6 September 2025.
        </p>
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

      <div>
        <span class="font-bold" v-if="data.payment === 'Cash'">Pembayaran cash diberikan ke salah satu:</span>
        <span class="font-bold" v-else>Bukti Pembayaran bisa dikirim ke salah satu:</span>
        <a
          href="https://wa.me/62895635004580"
          class="px-6 py-2 border rounded-md bg-[#25D366] text-white font-semibold flex gap-4 items-center mt-2 justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M15.271 13.21a7 7 0 0 1 1.543.7l-.031-.018c.529.235.986.51 1.403.833l-.015-.011q.031.093.032.203l-.001.032v-.001c-.015.429-.11.832-.271 1.199l.008-.021c-.231.463-.616.82-1.087 1.01l-.014.005a3.6 3.6 0 0 1-1.576.411h-.006a8.3 8.3 0 0 1-2.988-.982l.043.022a8.9 8.9 0 0 1-2.636-1.829l-.001-.001a20.5 20.5 0 0 1-2.248-2.794l-.047-.074a5.4 5.4 0 0 1-1.1-2.995l-.001-.013v-.124a3.42 3.42 0 0 1 1.144-2.447l.003-.003a1.17 1.17 0 0 1 .805-.341h.001q.151.004.292.025l-.013-.002c.087.013.188.021.292.023h.003a.64.64 0 0 1 .414.102l-.002-.001c.107.118.189.261.238.418l.002.008q.124.31.512 1.364c.135.314.267.701.373 1.099l.014.063a1.57 1.57 0 0 1-.533.889l-.003.002q-.535.566-.535.72a.44.44 0 0 0 .081.234l-.001-.001a7 7 0 0 0 1.576 2.119l.005.005a10 10 0 0 0 2.282 1.54l.059.026a.7.7 0 0 0 .339.109h.002q.233 0 .838-.752t.804-.752zm-3.147 8.216h.022a9.4 9.4 0 0 0 3.814-.799l-.061.024c2.356-.994 4.193-2.831 5.163-5.124l.024-.063c.49-1.113.775-2.411.775-3.775s-.285-2.662-.799-3.837l.024.062c-.994-2.356-2.831-4.193-5.124-5.163l-.063-.024c-1.113-.49-2.411-.775-3.775-.775s-2.662.285-3.837.799l.062-.024c-2.356.994-4.193 2.831-5.163 5.124l-.024.063a9.5 9.5 0 0 0-.775 3.787a9.6 9.6 0 0 0 1.879 5.72l-.019-.026l-1.225 3.613l3.752-1.194a9.45 9.45 0 0 0 5.305 1.612h.047zm0-21.426h.033c1.628 0 3.176.342 4.575.959L16.659.93c2.825 1.197 5.028 3.4 6.196 6.149l.029.076c.588 1.337.93 2.896.93 4.535s-.342 3.198-.959 4.609l.029-.074c-1.197 2.825-3.4 5.028-6.149 6.196l-.076.029c-1.327.588-2.875.93-4.503.93h-.034h.002h-.053c-2.059 0-3.992-.541-5.664-1.488l.057.03L-.001 24l2.109-6.279a11.5 11.5 0 0 1-1.674-6.01c0-1.646.342-3.212.959-4.631l-.029.075C2.561 4.33 4.764 2.127 7.513.959L7.589.93A11.2 11.2 0 0 1 12.092 0zh-.002z"
            />
          </svg>
          Fadhil Al Ghaza (XII PPLG 3)
        </a>
        <a
          href="https://wa.me/6282229617646"
          class="px-6 py-2 border rounded-md bg-[#25D366] text-white font-semibold flex gap-4 items-center mt-2 justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M15.271 13.21a7 7 0 0 1 1.543.7l-.031-.018c.529.235.986.51 1.403.833l-.015-.011q.031.093.032.203l-.001.032v-.001c-.015.429-.11.832-.271 1.199l.008-.021c-.231.463-.616.82-1.087 1.01l-.014.005a3.6 3.6 0 0 1-1.576.411h-.006a8.3 8.3 0 0 1-2.988-.982l.043.022a8.9 8.9 0 0 1-2.636-1.829l-.001-.001a20.5 20.5 0 0 1-2.248-2.794l-.047-.074a5.4 5.4 0 0 1-1.1-2.995l-.001-.013v-.124a3.42 3.42 0 0 1 1.144-2.447l.003-.003a1.17 1.17 0 0 1 .805-.341h.001q.151.004.292.025l-.013-.002c.087.013.188.021.292.023h.003a.64.64 0 0 1 .414.102l-.002-.001c.107.118.189.261.238.418l.002.008q.124.31.512 1.364c.135.314.267.701.373 1.099l.014.063a1.57 1.57 0 0 1-.533.889l-.003.002q-.535.566-.535.72a.44.44 0 0 0 .081.234l-.001-.001a7 7 0 0 0 1.576 2.119l.005.005a10 10 0 0 0 2.282 1.54l.059.026a.7.7 0 0 0 .339.109h.002q.233 0 .838-.752t.804-.752zm-3.147 8.216h.022a9.4 9.4 0 0 0 3.814-.799l-.061.024c2.356-.994 4.193-2.831 5.163-5.124l.024-.063c.49-1.113.775-2.411.775-3.775s-.285-2.662-.799-3.837l.024.062c-.994-2.356-2.831-4.193-5.124-5.163l-.063-.024c-1.113-.49-2.411-.775-3.775-.775s-2.662.285-3.837.799l.062-.024c-2.356.994-4.193 2.831-5.163 5.124l-.024.063a9.5 9.5 0 0 0-.775 3.787a9.6 9.6 0 0 0 1.879 5.72l-.019-.026l-1.225 3.613l3.752-1.194a9.45 9.45 0 0 0 5.305 1.612h.047zm0-21.426h.033c1.628 0 3.176.342 4.575.959L16.659.93c2.825 1.197 5.028 3.4 6.196 6.149l.029.076c.588 1.337.93 2.896.93 4.535s-.342 3.198-.959 4.609l.029-.074c-1.197 2.825-3.4 5.028-6.149 6.196l-.076.029c-1.327.588-2.875.93-4.503.93h-.034h.002h-.053c-2.059 0-3.992-.541-5.664-1.488l.057.03L-.001 24l2.109-6.279a11.5 11.5 0 0 1-1.674-6.01c0-1.646.342-3.212.959-4.631l-.029.075C2.561 4.33 4.764 2.127 7.513.959L7.589.93A11.2 11.2 0 0 1 12.092 0zh-.002z"
            />
          </svg>
          Sophitia Alyssa (XI LK 1)
        </a>
      </div>
    </div>

    <div class="h-[1px] w-full bg-gray-300 my-6"></div>

    <div class="w-full">
      <h2 class="text-lg md:text-xl font-bold mb-2 text-center">
        Terimakasih sudah belanja di osis8_store ;)
      </h2>
      <p class="text-gray-600 text-sm">
        Tanggal baju siap diambil akan kami umumkan lewat Instagram
        <a href="https://www.instagram.com/osis8_store/" class="font-bold"
          >@osis8_store</a
        >
        atau update di website ini. Ditunggu kabar resminya ya!
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
