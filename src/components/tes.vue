<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { h } from "vue";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = toTypedSchema(
  z.object({
    name: z.string().nonempty("wajib diisi"),
    number: z.string().regex(/^\+62\d+$/, "Nomor harus diawali dengan +62"),
  })
);

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
  console.log("berhasil bro", values);
});
</script>

<template>
  <form class="w-full space-y-6" @submit="onSubmit">
    <FormField
      v-slot="{ componentField }"
      name="name"
      :validate-on-blur="!isFieldDirty"
    >
      <FormItem>
        <FormLabel>Nama</FormLabel>
        <FormControl>
          <Input type="text" placeholder="shadcn" v-bind="componentField" />
        </FormControl>
        <FormMessage />
        <FormDescription> This is your public display name. </FormDescription>
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ componentField }"
      name="number"
      :validate-on-blur="!isFieldDirty"
    >
      <FormItem>
        <FormLabel>Nomor</FormLabel>
        <FormControl>
          <Input type="text" placeholder="shadcn" v-bind="componentField" />
        </FormControl>
        <FormMessage />
        <FormDescription> This is your public display name. </FormDescription>
      </FormItem>
    </FormField>
    <Button type="submit"> Submit </Button>
  </form>
</template>
