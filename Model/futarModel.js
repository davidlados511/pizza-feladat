import pool from '../db.js';
const futarModel = {};

export const getFutarok = async () => {
    const [rows] = await pool.query('SELECT * FROM futar');
    return rows;
};

export const getFutarById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM futar WHERE fazon = ?', [id]);
    return rows[0];
};

export const addFutar = async (futar) => {
    const { nev, telefon } = futar;
    const [result] = await pool.execute('INSERT INTO futar (fnev, ftel) VALUES (?, ?)', [nev, telefon]);
    return result.insertId;
};

export const updateFutar = async (id, futar) => {
    const { nev, telefon } = futar;
    await pool.execute('UPDATE futar SET fnev = ?, ftel = ? WHERE fazon = ?', [nev, telefon, id]);

}

export const deleteFutar = async (id) => {
    const [result] = await pool.execute(
        'DELETE FROM futar WHERE fazon = ?',
        [id]
    );
    return result;
};

export default futarModel;
