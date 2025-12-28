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
  <div class="page">

    <div v-if="equipment" class="detail-grid">
      <div class="card">
        <h2 class="section-title">Equipment information</h2>

        <div class="form-row">
          <label>Name</label>
          <input v-model="equipment.name" />
        </div>

        <div class="form-row">
          <label>Serial number</label>
          <input v-model="equipment.serialNumber" />
        </div>

        <div class="form-row">
          <label>Location</label>
          <input v-model="equipment.location" />
        </div>

        <div class="actions">
          <button @click="saveEquipment">Save changes</button>
          <button class="danger" @click="removeEquipment">Delete</button>
        </div>
      </div>
      <div class="space-y">
        <div class="card">
          <h3 class="section-title">Status</h3>

          <p>
            Current:
            <span class="badge" :class="equipment.status">
              {{ equipment.status }}
            </span>
          </p>

          <select v-model="newStatus">
            <option disabled value="">Select…</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="IN_MAINTENANCE">IN_MAINTENANCE</option>
            <option value="INACTIVE">INACTIVE</option>
            <option value="OUT_OF_SERVICE">OUT_OF_SERVICE</option>
          </select>

          <button style="margin-top:10px" @click="updateStatus">
            Update status
          </button>
        </div>
        <div class="card">
          <h3 class="section-title">Add maintenance</h3>

          <div class="form-row">
            <label>Description</label>
            <input v-model="maintenanceDescription" />
          </div>

          <div class="form-row">
            <label>Performed by</label>
            <input v-model="maintenancePerformedBy" />
          </div>

          <button @click="addMaintenance">Add record</button>
        </div>
      </div>
    </div>

    <div v-if="equipment" class="card" style="margin-top:16px">
      <h3 class="section-title">Maintenance records</h3>

      <div
          v-if="!equipment.maintenanceRecords || equipment.maintenanceRecords.length === 0"
          class="empty-box"
      >
        No maintenance records yet.
      </div>

      <ul v-else class="timeline">
        <li v-for="m in equipment.maintenanceRecords" :key="m.id">
          <strong>{{ new Date(m.date).toLocaleDateString() }}</strong>
          — {{ m.description }}
          <span style="color: var(--muted)">({{ m.performedBy }})</span>
        </li>
      </ul>
    </div>

    <div v-else>
      Loading...
    </div>

  </div>
</template>