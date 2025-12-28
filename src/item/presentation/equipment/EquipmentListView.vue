<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { getAllEquipment } from "../../application/equipment/GetAllEquipment";
import { EquipmentStatus } from "../../domain/equipment";

const equipments = ref<any[]>([]);
const search = ref("");
const status = ref<string>("");

async function load() {
  equipments.value = await getAllEquipment();
}

onMounted(load);

const filtered = computed(() => {
  return equipments.value.filter(e => {
    const byName = e.name.toLowerCase().includes(search.value.toLowerCase());
    const byStatus = status.value ? e.status === status.value : true;
    return byName && byStatus;
  });
});
</script>

<template>
  <div class="page">
    <div class="card">

      <h1>Equipment</h1>

      <div style="display:flex; gap:10px; margin-bottom:12px;">
        <input v-model="search" placeholder="Search by name" />
        <select v-model="status">
          <option value="">All statuses</option>
          <option
              v-for="s in Object.values(EquipmentStatus)"
              :key="s"
              :value="s">
            {{ s }}
          </option>
        </select>
      </div>

      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Serial</th>
          <th>Status</th>
          <th>Location</th>
          <th></th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="e in filtered" :key="e.id.value">
          <td>{{ e.name }}</td>
          <td>{{ e.serialNumber }}</td>
          <td><span class="badge" :class="e.status">{{ e.status }}</span></td>
          <td>{{ e.location }}</td>
          <td>
            <router-link :to="`/equipment/${e.id.value}`">
              View
            </router-link>
          </td>
        </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>