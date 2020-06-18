import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    oskills: { type: Number, required: true },
    dskills: { type: Number, required: true },
    pskills: { type: Number, required: true },
    sskills: { type: Number, required: true },
    bskills: { type: Number, required: true },
    rskills: { type: Number, required: true }
});

export interface Player extends mongoose.Document {

    id: string, 
    name: string, 
    position: string, 
    oskills: number,
    dskills: number, 
    pskills:number, 
    sskills:number, 
    bskills:number, 
    rskills:number
    
}