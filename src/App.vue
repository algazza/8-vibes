<script setup lang="ts">
import FormComp from "./components/FormComp.vue";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import table from '@/assets/tabel.png'
import fronts from '@/assets/fronts.png'
import backs from '@/assets/backs.png'
import shirt from '@/assets/shirt.png'

const imageArray = [shirt, fronts, backs, table]
</script>


<template>
  <main class="p-8 flex flex-col lg:flex-row gap-8 items-center">
    <div class="lg:max-w-1/2 px-8">
        <Carousel>
          <CarouselContent class="items-center">
            <CarouselItem v-for="img in imageArray" :key="img" class="flex items-center">
                <img :src="img" :alt="img">
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

    </div>


    <div class="p-2 w-full">
      <FormComp />
    </div>
  </main>
</template>
