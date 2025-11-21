import express from 'express';
const rendeles = express.Router();
import * as rendelesModel from '../Model/rendelesModel.js';

// Összes rendelés lekérése 
rendeles.get('/', async (req, res) => {
    try {
        const rendelesek = await rendelesModel.getRendelesek(); 
        if (rendelesek.length === 0) {
            return res.status(404).json({ message: 'Nincsenek rendelések az adatbázisban.' });
        } else {
            res.json(rendelesek);
            res.status(201).json({ message: 'Sikeres lekérés' });
        }   
    } catch (error) {
        res.status(501).json({ error: 'Hiba történt a rendelések lekérése során.' });
    }
});  

// Rendelés ID alapján történő lekérése
rendeles.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const rendelesData = await rendelesModel.getRendelesById(id);
        if (!rendelesData) {
            return res.status(404).json({ message: 'A megadott ID-vel nem található rendelés.' });
        } else {
            res.json(rendelesData);
            res.status(201).json({ message: 'Sikeres lekérés' });
        } 
    } catch (error) {
        res.status(501).json({ error: 'Hiba történt a rendelés lekérése során.' });
    }   
});

// Új rendelés hozzáadása
rendeles.post('/', async (req, res) => {
    const rendelesData = req.body;
    try {
        const insertId = await rendelesModel.addRendeles(rendelesData);
        if (insertId) {
            res.status(201).json({ message: 'Sikeres rendelés hozzáadás', id: insertId });
        } else {
            res.status(404).json({ message: 'A rendelés hozzáadása sikertelen volt.' });
        }
    } catch (error) {
        res.status(501).json({ error: 'Hiba történt a rendelés hozzáadása során.' });
    }
});

// Rendelés adatainak frissítése
rendeles.put('/:id', async (req, res) => {
    const id = req.params.id;
    const rendelesData = req.body;
    try {
        const existingRendeles = await rendelesModel.getRendelesById(id);
        if (!existingRendeles) {
            return res.status(404).json({ message: 'A megadott ID-vel nem található rendelés.' });
        } else {
            await rendelesModel.updateRendeles(id, rendelesData);
            res.status(201).json({ message: 'Sikeres rendelés frissítés' });
        }   
    } catch (error) {
        res.status(501).json({ error: 'Hiba történt a rendelés frissítése során.' });
    }   
});

// Rendelés törlése
rendeles.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const existingRendeles = await rendelesModel.getRendelesById(id);
        if (!existingRendeles) {
            return res.status(404).json({ message: 'A megadott ID-vel nem található rendelés.' });
        } else {
            await rendelesModel.deleteRendeles(id);
            res.status(201).json({ message: 'Sikeres rendelés törlés' });
        }
    } catch (error) {
        res.status(501).json({ error: 'Hiba történt a rendelés törlése során.' });
    }
});


export default rendeles;