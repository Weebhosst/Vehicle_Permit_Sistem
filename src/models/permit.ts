class Permit {
    name: string;
    platNumber: string;
    masaBerlakuSTNK: Date;
    masaBerlakuSIMC: Date;
    masaBerlakuSIMA: Date;

    constructor(name: string, platNumber: string, masaBerlakuSTNK: Date, masaBerlakuSIMC: Date, masaBerlakuSIMA: Date) {
        this.name = name;
        this.platNumber = platNumber;
        this.masaBerlakuSTNK = masaBerlakuSTNK;
        this.masaBerlakuSIMC = masaBerlakuSIMC;
        this.masaBerlakuSIMA = masaBerlakuSIMA;
    }

    generateBarcode(): string {
        // Logic to generate barcode using the data from this instance
        return ""; // Placeholder for barcode generation logic
    }
}