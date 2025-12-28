<script setup lang="ts">
import { ref } from "vue";
import { createEquipment } from "@/application/equipment/CreateEquipment";

const name = ref("");
const serial = ref("");
const location = ref("");

async function submit() {
  await createEquipment({
    name: name.value,
    serialNumber: serial.value,
    location: location.value
  });

  alert("Created!");
}
</script>

<template>
  <form @submit.prevent="submit">
    <input v-model="name" placeholder="Name" />
    <input v-model="serial" placeholder="Serial number" />
    <input v-model="location" placeholder="Location" />

    <button type="submit">Save</button>
  </form>
</template>