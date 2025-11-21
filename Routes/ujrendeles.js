import express from 'express';
const ujrendeles = express.Router();
import * as ujrendelesModel from '../Model/ujrendelesModel.js';

// Új rendelés hozzáadása
ujrendeles.post('/', async (req, res) => {
    const ujRendelesData = req.body;
    try {
        const insertId = await ujrendelesModel.addUjRendeles(ujRendelesData);
        if (insertId) {
            res.status(201).json({ message: 'Sikeres új rendelés hozzáadás', id: insertId });
        } else {
            res.status(404).json({ message: 'Az új rendelés hozzáadása sikertelen volt.' });
        }
    } catch (error) {
        res.status(501).json({ error: 'Hiba történt az új rendelés hozzáadása során.' });
    }
}); 

export default ujrendeles;