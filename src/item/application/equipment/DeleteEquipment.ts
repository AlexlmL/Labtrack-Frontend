import {EquipmentHttpRepository} from "@/item/infrastructure/equipment/EquipmentHttpRepository";

const repo = new EquipmentHttpRepository();

export async function deleteEquipment(id: string) {
    await repo.delete(id);
}