import { Request, Response } from 'express';
import { Permit } from '../models/permit';
import { generateBarcode } from '../utils/barcodeGenerator';
import * as fs from 'fs';
import * as csv from 'csv-parser';

export class PermitController {
    private permits: Permit[] = [];

    constructor() {
        this.loadPermits();
    }

    private loadPermits() {
        fs.createReadStream('src/data/permits.csv')
            .pipe(csv())
            .on('data', (data) => {
                const permit = new Permit(data.Nama, data['PLAT NOMOR'], data['MASA BERLAKU STNK'], data['MASA BERLAKU SIM C'], data['MASA BERLAKU SIM A']);
                this.permits.push(permit);
            });
    }

    public createPermit(req: Request, res: Response) {
        const { name, platNumber, masaBerlakuSTNK, masaBerlakuSIMC, masaBerlakuSIMA } = req.body;
        const newPermit = new Permit(name, platNumber, masaBerlakuSTNK, masaBerlakuSIMC, masaBerlakuSIMA);
        this.permits.push(newPermit);
        const barcode = generateBarcode(newPermit);
        res.status(201).json({ permit: newPermit, barcode });
    }

    public getPermits(req: Request, res: Response) {
        res.status(200).json(this.permits);
    }

    public getPermitByPlatNumber(req: Request, res: Response) {
        const platNumber = req.params.platNumber;
        const permit = this.permits.find(p => p.platNumber === platNumber);
        if (permit) {
            res.status(200).json(permit);
        } else {
            res.status(404).json({ message: 'Permit not found' });
        }
    }
}