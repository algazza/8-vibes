<script setup lang="ts">
import FormComp from "./components/FormComp.vue";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import table from "@/assets/tabel.png";
import fronts from "@/assets/fronts.png";
import backs from "@/assets/backs.png";
import shirt from "@/assets/shirt.png";
import header from '@/assets/header.png'
import FormSuccess from "./components/FormSuccess.vue";
import { useLocalStorage } from "@vueuse/core";

const imageArray = [shirt, fronts, backs, table];

const formData = useLocalStorage("form-data", {
  name: "",
  position: "",
  classes: "",
  number: "",
  size: "",
  sleeve: "",
  payment: "",
});

const isNewCheckout = useLocalStorage<boolean>("isNew", true);
</script>

<template>
  <iframe name="hidden_iframe" style="display: none"></iframe>

  <div :class="isNewCheckout ? 'flex justify-center items-center flex-col h-dvh' : ''">
    <header class="flex items-center pt-4 flex-col">
      <img :src="header" alt="header" class="w-60 lg:w-80">
      <h2 class="text-2xl font-bold mt-4">Pengisian form telah ditutup. <br>Terimakasih sudah memesan:)</h2>
    </header>
    
    <main
      class="pt-8 md:px-8 flex flex-col lg:flex-row gap-8 items-center justify-center"
    >
  
      <div
        class="w-full bg-white rounded-lg"
        :class="!isNewCheckout ? 'max-w-[580px] p-4' : ''"
        v-if="!isNewCheckout"
      >
        <FormSuccess :data="formData"  />
      </div>
    </main>
    <footer class="flex justify-center py-8">
      <p class="text-gray-500 text-sm">
        &copy; All Rights Reserved By
        <a href="https://www.instagram.com/osis8_store/" class="font-bold"
          >@osis8_store.</a
        >
      </p>
    </footer>
  </div>
</template>
