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

  <header class="flex justify-center pt-4">
    <img :src="header" alt="header" class="w-60 lg:w-80">
  </header>
  
  <main
    class="py-8 md:px-8 flex flex-col lg:flex-row gap-8 items-center justify-center"
  >
    <div class="lg:max-w-1/2 px-12" v-if="isNewCheckout">
      <Carousel :opts="{
        loop: true
      }">
        <CarouselContent class="items-center">
          <CarouselItem
            v-for="img in imageArray"
            :key="img"
            class="flex items-center"
          >
            <img :src="img" :alt="img" />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>

    <div
      class="p-4 w-full bg-white rounded-lg"
      :class="!isNewCheckout ? 'max-w-[580px]' : ''"
    >
      <FormSuccess :data="formData" v-if="!isNewCheckout" />
      <FormComp v-else />
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
</template>
