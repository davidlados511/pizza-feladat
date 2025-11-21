import express from 'express';
const tetel = express.Router();

import * as tetelModel from '../Model/tetelModel.js';

// Összes tétel lekérése
tetel.get('/', async (req, res) => {
  try {
    const tetelek = await tetelModel.getTetelek();
    if (tetelek.length === 0) {
      return res.status(404).json({ message: 'Nincsenek tételek az adatbázisban.' });
    } else {
      res.json(tetelek);
      res.status(201).json({ message: 'Sikeres lekérés' });
    } 
    } catch (error) {   
        res.status(501).json({ error: 'Hiba történt a tételek lekérése során.' });
    }
});

// Tétel ID alapján történő lekérése
tetel.get('/:id', async (req, res) => {
  const id = req.params.id;
    try {
        const tetelData = await tetelModel.getTetelById(id);
        if (!tetelData) {
            return res.status(404).json({ message: 'A megadott ID-vel nem található tétel.' });
        } else {
            res.json(tetelData);
            res.status(201).json({ message: 'Sikeres lekérés' });
        }
    } catch (error) {
        res.status(501).json({ error: 'Hiba történt a tétel lekérése során.' });
    }
});
// Új tétel hozzáadása
tetel.post('/', async (req, res) => {
  const tetelData = req.body;
    try {
        const insertId = await tetelModel.addTetel(tetelData);
        if (insertId) {
            res.status(201).json({ message: 'Sikeres tétel hozzáadás', id: insertId });
        } else {
            res.status(404).json({ message: 'A tétel hozzáadása sikertelen volt.' });
        }
    } catch (error) {
        res.status(501).json({ error: 'Hiba történt a tétel hozzáadása során.' });
    }
});
// Tétel adatainak frissítése
tetel.put('/:id', async (req, res) => {
    const id = req.params.id;
    const tetelData = req.body;
    try {
        const existingTetel = await tetelModel.getTetelById(id);    
        if (!existingTetel) {
            return res.status(404).json({ message: 'A megadott ID-vel nem található tétel.' });
        } else {
            await tetelModel.updateTetel(id, tetelData);
            res.status(201).json({ message: 'Sikeres tétel frissítés' });
        }
    } catch (error) {
        res.status(501).json({ error: 'Hiba történt a tétel frissítése során.' });
    }
});
// Tétel törlése
tetel.delete('/:id', async (req, res) => {
  const id = req.params.id;
    try {
        const existingTetel = await tetelModel.getTetelById(id);
        if (!existingTetel) {
            return res.status(404).json({ message: 'A megadott ID-vel nem található tétel.' });
        } else {
            await tetelModel.deleteTetel(id);
            res.status(201).json({ message: 'Sikeres tétel törlés' });
        }
    } catch (error) {
        res.status(501).json({ error: 'Hiba történt a tétel törlése során.' });
    }
});

export default tetel;