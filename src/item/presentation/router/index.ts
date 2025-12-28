import { createRouter, createWebHistory } from "vue-router";
import EquipmentListView from "@/item/presentation/equipment/EquipmentListView.vue";
import EquipmentDetailView from "@/item/presentation/equipment/EquipmentDetailView.vue";
import EquipmentCreateView from "@/item/presentation/equipment/EquipmentCreateView.vue";


const routes = [
    { path: "/equipment", component: EquipmentListView },
    { path: "/equipment/new", component: EquipmentCreateView },
    { path: "/equipment/:id", component: EquipmentDetailView },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});