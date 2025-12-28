<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import { createEquipment } from "../../application/equipment/CreateEquipment";

const router = useRouter();

const name = ref("");
const serial = ref("");
const location = ref("");
const loading = ref(false);
const error = ref<string | null>(null);

async function submit() {
  error.value = null;

  if (!name.value || !serial.value || !location.value) {
    error.value = "All fields are required";
    return;
  }

  loading.value = true;

  try {
    const equipment = await createEquipment({
      name: name.value,
      serialNumber: serial.value,
      location: location.value,
    });

    name.value = "";
    serial.value = "";
    location.value = "";

    await router.push(`/equipment/${equipment.id.value}`);

  } catch (e: any) {
    error.value = e.message ?? "Error creating equipment";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="page">
    <div class="card">
      <h2>Create Equipment</h2>

      <form @submit.prevent="submit">

        <div class="form-row">
          <label>Name</label>
          <input v-model="name" />
        </div>

        <div class="form-row">
          <label>Serial Number</label>
          <input v-model="serial" />
        </div>

        <div class="form-row">
          <label>Location</label>
          <input v-model="location" />
        </div>

        <p v-if="error" style="color:red">{{ error }}</p>

        <button type="submit" :disabled="loading">
          {{ loading ? "Saving..." : "Save" }}
        </button>
      </form>
    </div>
  </div>
</template>