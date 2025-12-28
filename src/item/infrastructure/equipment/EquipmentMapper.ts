import {
    Equipment,
    EquipmentId,
    EquipmentStatus,
    MaintenanceRecord
} from "../../domain/equipment";

export class EquipmentMapper {
    static toDomain(raw: any): Equipment {
        return new Equipment(
            new EquipmentId(raw.id ?? raw.value), // por si backend usa value
            raw.name,
            raw.serial_number ?? raw.serialNumber,
            raw.location,
            raw.status as EquipmentStatus,
            (raw.maintenanceHistory ?? []).map((m: any) =>
                new MaintenanceRecord(
                    m.id,
                    raw.id,
                    m.description,
                    m.performedBy,
                    m.date
                )
            ),
            raw.created_at ?? raw.createdAt,
            raw.updated_at ?? raw.updatedAt
        );
    }

    static toPersistence(equipment: Equipment) {
        return {
            id: equipment.id.value,
            name: equipment.name,
            serialNumber: equipment.serialNumber,
            location: equipment.location,
            status: equipment.status
        };
    }
}