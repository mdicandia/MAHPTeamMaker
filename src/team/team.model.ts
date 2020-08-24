import * as mongoose from 'mongoose';
import { PlayerSchema } from 'src/players/players.model';

export const TeamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    pg: { type: PlayerSchema, required: true },
    sg: { type: PlayerSchema, required: true },
    sf: { type: PlayerSchema, required: true },
    pf: { type: PlayerSchema, required: true },
    center: { type: PlayerSchema, required: true }
});

export interface Team extends mongoose.Document {

    name: string, 
    pg: string, 
    sg: string,
    sf: string, 
    pf:string, 
    center:string
}