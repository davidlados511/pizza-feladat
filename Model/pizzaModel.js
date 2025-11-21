import pool from '../db.js';
const pizzaModel = {};

export const getPizzak = async () => {
    const [rows] = await pool.query('SELECT * FROM pizza');
    return rows;
};

export const getPizzaById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM pizza WHERE pazon = ?', [id]);
    return rows[0];
};

export const addPizza = async (pizza) => {
    const { nev, ar } = pizza;
    const [result] = await pool.execute('INSERT INTO pizza (pnev, par) VALUES (?, ?)', [nev, ar]);
    return result.insertId;
};  

export const updatePizza = async (id, pizza) => {
    const { nev, ar } = pizza;
    await pool.execute('UPDATE pizza SET pnev = ?, par = ? WHERE pazon = ?', [nev, ar, id]);   
} ;     

export const deletePizza = async (id) => {
    const [result] = await pool.execute(
        'DELETE FROM pizza WHERE pazon = ?',
        [id]
    );
    return result;
};

export default pizzaModel;


