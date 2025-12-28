import {EquipmentHttpRepository} from "@/item/infrastructure/equipment/EquipmentHttpRepository";

const repo = new EquipmentHttpRepository();

export async function addMaintenanceRecord(
    id: string,
    payload: {
        description: string;
        performedBy: string;
        date: string;
    }
) {
    return await repo.addMaintenance(id, payload);
}