import {EquipmentHttpRepository} from "@/item/infrastructure/equipment/EquipmentHttpRepository";

const repo = new EquipmentHttpRepository();

export async function getEquipmentById(id: string) {
    return await repo.getById(id);
}