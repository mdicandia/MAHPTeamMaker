import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    pskills: { type: Number, required: true },
    sskills: { type: Number, required: true },
    bskills: { type: Number, required: true },
    rskills: { type: Number, required: true },
    stskills: { type: Number},
    ptskills: { type: Number},
});

export interface Player extends mongoose.Document {

    id: string, 
    name: string, 
    position: string,
    pskills:number, 
    sskills:number, 
    bskills:number, 
    rskills:number,
    ptskills: number,
    stskills: number
}