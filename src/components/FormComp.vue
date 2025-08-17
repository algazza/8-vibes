<script setup lang="ts">
import {
  classArray,
  formSchema,
  paymentArray,
  positionArray,
  sizeArray,
  sleeveArray,
} from "@/type";
import { useField, useForm } from "vee-validate";
import { FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { computed, watch } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { toTypedSchema } from "@vee-validate/zod";
import { totalPrice } from "@/lib/totalPrice";

const urlAction = import.meta.env.VITE_API_FORM

const formData = useLocalStorage('form-data', {
  name: '',
  position: '',
  classes: '',
  number: '',
  size: '',
  sleeve: '',
  payment: '',
})
const isNewCheckout = useLocalStorage<boolean>('isNew', true)

const { isFieldDirty, handleSubmit, meta } = useForm({
  validationSchema: toTypedSchema(formSchema),
});

const { value: position } = useField<string>("position");
const { value: classes } = useField<string>("classes");
const { value: size } = useField<string>("size");
const { value: sleeve } = useField<string>("sleeve");

watch(position, (newVal) => {
  if (newVal === "Guru / Staff" || newVal === "Alumni") {
    classes.value = "Lainnya";
  }
});

const fixPrice = computed(() => {
  if (!size.value || !sleeve.value) return 0
  return totalPrice(size.value, sleeve.value)
})


const onSubmit = handleSubmit((values, ctx) => {
  console.log(values)
  formData.value = values

  const form = ctx.evt?.target as HTMLFormElement
  form.submit()

  isNewCheckout.value = false
})

</script>

<template>
  <form class="w-full space-y-6" @submit="onSubmit" :action="urlAction" target="hidden_iframe">
    <FormField
      v-slot="{ componentField }"
      name="name"
      :validate-on-blur="!isFieldDirty"
    >
      <FormItem>
        <FormLabel>Nama</FormLabel>
        <FormControl>
          <Input type="text" v-bind="componentField" placeholder="John Doe" name="entry.1881718673"/>
        </FormControl>
      </FormItem>
    </FormField>

    <div class="flex gap-2">
      <FormField
        v-slot="{ componentField }"
        name="position"
        :validate-on-blur="!isFieldDirty"
      >
        <FormItem class="w-full">
          <FormLabel>Posisi</FormLabel>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger class="cursor-pointer w-full">
                <SelectValue placeholder="Pilih posisi" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup v-for="posisi in positionArray" :key="posisi">
                <SelectItem :value="posisi">{{ posisi }}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <input type="hidden" name="entry.643892335" :value="componentField.modelValue">
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ componentField }"
        name="classes"
        :validate-on-blur="!isFieldDirty"
      >
        <FormItem class="w-full">
          <FormLabel>Kelas</FormLabel>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger class="cursor-pointer w-full">
                <SelectValue placeholder="Pilih kelas" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup v-for="kelas in classArray" :key="kelas">
                <SelectItem :value="kelas">{{ kelas }}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <input type="hidden" name="entry.1268061490" :value="componentField.modelValue"></input>
        </FormItem>
      </FormField>
    </div>

    <FormField
      v-slot="{ componentField }"
      name="number"
      :validate-on-blur="!isFieldDirty"
    >
      <FormItem>
        <FormLabel>Nomor Handphone</FormLabel>
        <FormDescription class="text-sm text-muted-foreground">format harus +62xxxxxxxxx</FormDescription>
        <FormControl>
          <Input
            type="text"
            v-bind="componentField"
            placeholder="+62xxxxxxxxx"
            name="entry.1824288762"
            default-value="+62"
          />
        </FormControl>
      </FormItem>
    </FormField>

    <div class="flex gap-2">
      <FormField
        v-slot="{ componentField }"
        name="size"
        :validate-on-blur="!isFieldDirty"
      >
        <FormItem class="w-full">
          <FormLabel>Size Baju</FormLabel>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger class="cursor-pointer w-full">
                <SelectValue placeholder="Pilih ukuran" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup v-for="size in sizeArray" :key="size">
                <SelectItem :value="size">{{ size }}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <input type="hidden" name="entry.1754670422" :value="componentField.modelValue">
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ componentField }"
        name="sleeve"
        :validate-on-blur="!isFieldDirty"
      >
        <FormItem class="w-full">
          <FormLabel>Lengan</FormLabel>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger class="cursor-pointer w-full">
                <SelectValue placeholder="Pilih ukuran lengan" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup v-for="lengan in sleeveArray" :key="lengan">
                <SelectItem :value="lengan">{{ lengan }}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          
          <input type="hidden" name="entry.490816879" :value="componentField.modelValue">
        </FormItem>
      </FormField>
    </div>

    <FormField
      v-slot="{ componentField }"
      name="payment"
      :validate-on-blur="!isFieldDirty"
    >
      <FormItem class="w-full">
        <FormLabel>Metode Pembayaran</FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger class="cursor-pointer w-full">
              <SelectValue placeholder="Pilih metode pembayaran" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup v-for="payment in paymentArray" :key="payment">
              <SelectItem :value="payment">{{ payment }}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormDescription class="text-sm text-muted-foreground">QR / nomor transfer akan diperlihatkan setelah mengirim form</FormDescription>
        <input type="hidden" name="entry.1495091866" :value="componentField.modelValue">
      </FormItem>
    </FormField>

    <div class="w-full grid gap-2">
      <div class="flex justify-between">
        <span class="font-bold">Total:</span>
        <span class="font-semibold">Rp {{ fixPrice.toLocaleString('id-ID') }}</span>
      </div>
      <Button type="submit" class="w-full" :disabled="!meta.valid">Pesan</Button>
    </div>
  </form>
</template>
