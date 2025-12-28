export class EquipmentId {
    constructor(public readonly value: string) {
        if (!value) throw new Error("EquipmentId cannot be empty");
    }
}