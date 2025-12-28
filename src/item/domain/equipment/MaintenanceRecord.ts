export class MaintenanceRecord {
    constructor(
        public readonly id: string,
        public readonly equipmentId: string,
        public readonly description: string,
        public readonly performedBy: string,
        public readonly date: string
    ) {}
}