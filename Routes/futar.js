import express from 'express';
const futar = express.Router();

import * as futarModel from '../Model/futarModel.js';  

futar.get('/', async (req, res) => {
    try {
        const futarok = await futarModel.getFutarok();
        res.status(200).send(futarok);
    } catch (error) {
        console.error('Hiba az ügyfelek lekérésekor:', error);
        res.status(500).send({ error: 'Hiba történt az ügyfelek lekérése során.' });
    } 
});

futar.get('/:id', async (req, res) => {
    const id = req.params.id;   
    try {
        const futar = await futarModel.getFutarById(id);
        if (futar) {
            res.status(200).send(futar);
        } else {
            res.status(404).send({ error: 'Futár nem található.' });
        }
    } catch (error) {
        console.error('Hiba a futár lekérésekor:', error);
        res.status(500).send({ error: 'Hiba történt a futár lekérése során.' });
    }
});

futar.post('/', async (req, res) => {
    const newFutar = req.body;
    try {
        const insertId = await futarModel.addFutar(newFutar);
        res.status(201).send({ message: 'Új futár hozzáadva.', id: insertId });
    } catch (error) {
        console.error('Hiba új futár hozzáadásakor:', error);
        res.status(500).send({ error: 'Hiba történt az új futár hozzáadásakor.' });
    } 
});

futar.put('/:id', async (req, res) => {
    const id = req.params.id;
    const updatedFutar = req.body;
    try {
        await futarModel.updateFutar(id, updatedFutar);
        res.status(200).send({ message: 'Futár frissítve.' });
    } catch (error) {
        console.error('Hiba a futár frissítésekor:', error);
        res.status(500).send({ error: 'Hiba történt a futár frissítése során.' });
    }
});

futar.delete('/:id', async (req, res) => {  
    const id = req.params.id;
    try {
        await futarModel.deleteFutar(id);
        res.status(200).send({ message: 'Futár törölve.' });
    } catch (error) {
        console.error('Hiba a futár törlésekor:', error);
        res.status(500).send({ error: 'Hiba történt a futár törlése során.' });
    }   
});

export default futar;