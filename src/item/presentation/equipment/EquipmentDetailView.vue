<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import { getEquipmentById } from "@/item/application/equipment/GetEquipmentById";
import { changeEquipmentStatus } from "@/item/application/equipment/ChangeEquipmentStatus";
import { updateEquipment } from "@/item/application/equipment/UpdateEquipment";
import { deleteEquipment } from "@/item/application/equipment/DeleteEquipment";
import { addMaintenanceRecord } from "../../application/equipment/AddMaintenanceRecord";

import { EquipmentStatus } from "@/item/domain/equipment";

const route = useRoute();
const router = useRouter();

const equipment = ref<any>(null);
const newStatus = ref<string>("");

const maintenanceDescription = ref("");
const maintenancePerformedBy = ref("");

const isCreate = computed(() => route.params.id === "new");

async function load() {
  if (isCreate.value) {
    equipment.value = {
      name: "",
      serialNumber: "",
      location: "",
      status: EquipmentStatus.ACTIVE,
      maintenanceRecords: []
    };
    return;
  }

  if (!route.params.id) return;

  equipment.value = await getEquipmentById(route.params.id as string);
}

// ---------------- STATUS ----------------
async function updateStatus() {
  if (isCreate.value) return;
  if (!newStatus.value) return;

  await changeEquipmentStatus(
      route.params.id as string,
      newStatus.value as any
  );

  await load();
}

// ---------------- UPDATE (PUT) ----------------
async function saveEquipment() {
  if (isCreate.value) return;

  await updateEquipment(route.params.id as string, {
    name: equipment.value.name,
    serialNumber: equipment.value.serialNumber,
    location: equipment.value.location,
    status: equipment.value.status
  });

  await load();
}

// ---------------- DELETE ----------------
async function removeEquipment() {
  if (isCreate.value) return;

  await deleteEquipment(route.params.id as string);

  router.push("/equipment");
}

// ---------------- CREATE MAINTENANCE ----------------
async function addMaintenance() {
  if (!maintenanceDescription.value || !maintenancePerformedBy.value) return;

  await addMaintenanceRecord(
      route.params.id as string,
      {
        description: maintenanceDescription.value,
        performedBy: maintenancePerformedBy.value,
        date: new Date().toISOString().split("T")[0]
      }
  );

  maintenanceDescription.value = "";
  maintenancePerformedBy.value = "";

  await load();
}

onMounted(load);
</script>

<template>
  <div v-if="equipment">
    <h2>Equipment detail</h2>

    <!-- BASIC INFO -->
    <div>
      <label>Name</label>
      <input v-model="equipment.name" />

      <label>Serial number</label>
      <input v-model="equipment.serialNumber" />

      <label>Location</label>
      <input v-model="equipment.location" />

      <button @click="saveEquipment">Save changes</button>
      <button @click="removeEquipment">Delete equipment</button>
    </div>

    <!-- STATUS -->
    <div>
      <h3>Current status: {{ equipment.status }}</h3>

      <select v-model="newStatus">
        <option disabled value="">Select…</option>
        <option value="ACTIVE">ACTIVE</option>
        <option value="IN_MAINTENANCE">IN_MAINTENANCE</option>
        <option value="INACTIVE">INACTIVE</option>
        <option value="OUT_OF_SERVICE">OUT_OF_SERVICE</option>
      </select>

      <button @click="updateStatus">Update status</button>
    </div>

    <!-- MAINTENANCE -->
    <div>
      <h3>Add maintenance record</h3>

      <input
          placeholder="Description"
          v-model="maintenanceDescription"
      />

      <input
          placeholder="Performed by"
          v-model="maintenancePerformedBy"
      />

      <button @click="addMaintenance">Add record</button>
    </div>

    <!-- LIST -->
    <div>
      <h3>Maintenance records</h3>

      <div v-if="!equipment.maintenanceRecords || equipment.maintenanceRecords.length === 0">
        No maintenance records yet.
      </div>

      <ul v-else>
        <li v-for="m in equipment.maintenanceRecords" :key="m.id">
          <strong>{{ new Date(m.date).toLocaleDateString() }}</strong>
          — {{ m.description }} ({{ m.performedBy }})
        </li>
      </ul>
    </div>
  </div>

  <div v-else>
    Loading...
  </div>
</template>