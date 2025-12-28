import {EquipmentHttpRepository} from "@/item/infrastructure/equipment/EquipmentHttpRepository";

const repo = new EquipmentHttpRepository();

export async function updateEquipment(id: string, payload: any) {
    return await repo.update(id, payload);
}