import { http } from "./httpClient";
import { Equipment } from "../../domain/equipment";
import { EquipmentMapper } from "./EquipmentMapper";
import { EquipmentStatus } from "../../domain/equipment";

export class EquipmentHttpRepository {

    async getAll(): Promise<Equipment[]> {
        const res = await http.get("/equipment");
        return res.data.map((e: any) => EquipmentMapper.toDomain(e));
    }

    async getById(id: string): Promise<Equipment> {
        const res = await http.get(`/equipment/${id}`);
        return EquipmentMapper.toDomain(res.data);
    }

    async create(payload: any): Promise<Equipment> {
        const res = await http.post(`/equipment`, payload);
        return EquipmentMapper.toDomain(res.data);
    }

    async update(id: string, payload: any): Promise<Equipment> {
        const res = await http.put(`/equipment/${id}`, payload);
        return EquipmentMapper.toDomain(res.data);
    }

    async delete(id: string): Promise<void> {
        await http.delete(`/equipment/${id}`);
    }

    async changeStatus(id: string, status: EquipmentStatus): Promise<void> {
        await http.patch(`/equipment/${id}/status`, {
            newStatus: status
        });
    }

    async addMaintenance(id: string, payload: any): Promise<void> {
        await http.post(`/equipment/${id}/maintenance`, payload);
    }
}