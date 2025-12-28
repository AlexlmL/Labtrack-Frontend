import {EquipmentHttpRepository} from "@/item/infrastructure/equipment/EquipmentHttpRepository";
import {EquipmentStatus} from "@/item/domain/equipment";

const repo = new EquipmentHttpRepository();

export async function changeEquipmentStatus(
    id: string,
    status: EquipmentStatus
) {
    return await repo.changeStatus(id, status);
}