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
    const { nev, ar, leiras } = pizza;
    const [result] = await pool.execute('INSERT INTO pizza (pnev, par, pleiras) VALUES (?, ?, ?)', [nev, ar, leiras]);
    return result.insertId;
};  

export const updatePizza = async (id, pizza) => {
    const { nev, ar, leiras } = pizza;
    await pool.execute('UPDATE pizza SET pnev = ?, par = ?, pleiras = ? WHERE pazon = ?', [nev, ar, leiras, id]);   
                        
};

export const deletePizza = async (id) => {
    const [result] = await pool.execute(
        'DELETE FROM pizza WHERE pazon = ?',
        [id]
    );
    return result;
};

export default pizzaModel;


