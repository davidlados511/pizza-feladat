import express from 'express';
const pizza = express.Router();
import * as pizzaModel from '../Model/pizzaModel.js';

pizza.get('/', async (req, res) => {    
    try {
        const pizzak = await pizzaModel.getPizzak();
        if (pizzak) {
            res.status(201).send(pizzak);
        } else {
            res.status(404).send({ error: 'Pizza nem található.' });
        }
    } catch (error) {
        console.error('Hiba a pizzák lekérésekor:', error);
        res.status(500).send({ error: 'Hiba történt a pizzák lekérése során.' });
    }   
});

pizza.get('/:id', async (req, res) => {
    const id = req.params.id;   
    try {
        const pizza = await pizzaModel.getPizzaById(id);
        if (pizza) {
            res.status(201).send(pizza);
        } else {
            res.status(404).send({ error: 'Pizza nem található.' });
        }
    } catch (error) {
        console.error('Hiba a pizza lekérésekor:', error);
        res.status(501).send({ error: 'Hiba történt a pizza lekérése során.' });
    }
});

pizza.post('/', async (req, res) => {
    const newPizza = req.body;  
    try {
        const insertId = await pizzaModel.addPizza(newPizza);
        if (insertId) {
            res.status(201).send({ message: 'Új pizza hozzáadva.', id: insertId });
        }   else {  
            res.status(404).send({ error: 'Pizza nem lett hozzáadva.' });
        }
    } catch (error) {
        console.error('Hiba új pizza hozzáadásakor:', error);
        res.status(501).send({ error: 'Hiba történt az új pizza hozzáadásakor.' });
    }       
});

pizza.put('/:id', async (req, res) => {
    const id = req.params.id;
    const updatedPizza = req.body;  
    try {
        await pizzaModel.updatePizza(id, updatedPizza);
        if (updatedPizza) {
            res.status(201).send({ message: 'Pizza frissítve.' });
        } else {
            res.status(404).send({ error: 'Pizza nem található.' });
        }
    }
    catch (error) {
        console.error('Hiba a pizza frissítésekor:', error);
        res.status(501).send({ error: 'Hiba történt a pizza frissítése során.' });
    }
});

pizza.delete('/:id', async (req, res) => {  
    const id = req.params.id;
    try {
        await pizzaModel.deletePizza(id);
        if (id) {
            res.status(201).send({ message: 'Pizza törölve.' });
        } else {
            res.status(404).send({ error: 'Pizza nem található.' });
        }
    } catch (error) {
        console.error('Hiba a pizza törlésekor:', error);
        res.status(501).send({ error: 'Hiba történt a pizza törlése során.' });
    }
});

export default pizza;