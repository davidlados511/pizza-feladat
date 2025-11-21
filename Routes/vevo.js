import express from 'express';
const vevo = express.Router();

import * as vevoModel from '../Model/vevoModel.js';

// Összes vevő lekérése 
vevo.get('/', async (req, res) => {
  try {
    const vevok = await vevoModel.getVevok();   
    if (vevok.length === 0) {
      return res.status(404).json({ message: 'Nincsenek vevők az adatbázisban.' });
    } else {
      res.json(vevok);
      res.status(200).json({ message: 'Sikeres lekérés' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Hiba történt a vevők lekérése során.' });
  } 
});

// Vevő ID alapján történő lekérése
vevo.get('/:id', async (req, res) => {
  const id = req.params.id; 
    try { 
        const vevoData = await vevoModel.getVevoById(id);
        if (!vevoData) {
            return res.status(404).json({ message: 'A megadott ID-vel nem található vevő.' });
        } else {
            res.json(vevoData);
            res.status(200).json({ message: 'Sikeres lekérés' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Hiba történt a vevő lekérése során.' });
    }
});

// Új vevő hozzáadása
vevo.post('/', async (req, res) => {
  const vevoData = req.body;    
    try {
        const insertId = await vevoModel.addVevo(vevoData);
        if (insertId) {
            res.status(201).json({ message: 'Sikeres vevő hozzáadás', id: insertId });
        } else {
            res.status(400).json({ message: 'A vevő hozzáadása sikertelen volt.' });
        }       
    } catch (error) {
        res.status(500).json({ error: 'Hiba történt a vevő hozzáadása során.' });
    }   
});

// Vevő adatainak frissítése
vevo.put('/:id', async (req, res) => {
  const id = req.params.id;
  const vevoData = req.body;    
    try {
        const existingVevo = await vevoModel.getVevoById(id);
        if (!existingVevo) {
            return res.status(404).json({ message: 'A megadott ID-vel nem található vevő.' });
        } else {
            await vevoModel.updateVevo(id, vevoData);
            res.status(200).json({ message: 'Sikeres vevő frissítés' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Hiba történt a vevő frissítése során.' });
    }
});

// Vevő törlése 
vevo.delete('/:id', async (req, res) => {
  const id = req.params.id;
    try {
        const existingVevo = await vevoModel.getVevoById(id);
        if (!existingVevo) {
            return res.status(404).json({ message: 'A megadott ID-vel nem található vevő.' });
        } else {
            await vevoModel.deleteVevo(id);
            res.status(200).json({ message: 'Sikeres vevő törlés' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Hiba történt a vevő törlése során.' });
    }
});

export default vevo;