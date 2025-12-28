import {Equipment} from "@/item/domain/equipment";

export interface EquipmentRepository {
    getAll(): Promise<Equipment[]>;
    getById(id: string): Promise<Equipment>;
    create(payload: any): Promise<Equipment>;
    update(id: string, payload: any): Promise<Equipment>;
    delete(id: string): Promise<void>;
    changeStatus(id: string, status: EquipmentStatus): Promise<void>;
}