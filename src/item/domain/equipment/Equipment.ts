import { EquipmentStatus } from "./EquipmentStatus";
import { EquipmentId } from "./EquipmentId";
import { MaintenanceRecord } from "./MaintenanceRecord";

export class Equipment {
    constructor(
        public readonly id: EquipmentId,
        public name: string,
        public serialNumber: string,
        public location: string,
        public status: EquipmentStatus,
        public maintenanceRecords: MaintenanceRecord[] = [],
        public readonly createdAt?: string,
        public readonly updatedAt?: string
    ) {}

    changeStatus(newStatus: EquipmentStatus) {
        this.status = newStatus;
    }

    addMaintenance(record: MaintenanceRecord) {
        this.maintenanceRecords.push(record);
    }
}