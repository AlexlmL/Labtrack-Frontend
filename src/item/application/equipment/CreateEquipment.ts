import {EquipmentHttpRepository} from "@/item/infrastructure/equipment/EquipmentHttpRepository";

const repo = new EquipmentHttpRepository();

export async function createEquipment(payload: any) {
    return await repo.create(payload);
}