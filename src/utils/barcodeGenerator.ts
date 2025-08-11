import { createCanvas } from 'canvas';
import { encode } from 'node-barcode';

export function generateBarcode(permitData: { name: string; platNumber: string; masaBerlakuSTNK: string; masaBerlakuSIMC: string; masaBerlakuSIMA: string }): string {
    const barcodeData = `${permitData.name}|${permitData.platNumber}|${permitData.masaBerlakuSTNK}|${permitData.masaBerlakuSIMC}|${permitData.masaBerlakuSIMA}`;
    
    const canvas = createCanvas(400, 100);
    encode(barcodeData, { format: 'CODE128' }, (err, png) => {
        if (err) {
            throw new Error('Error generating barcode: ' + err);
        }
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = png;
        ctx.drawImage(img, 0, 0);
    });

    return canvas.toDataURL();
}