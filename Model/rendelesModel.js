import pool from '../db.js';
const rendelesModel = {};

export const getRendelesek = async () => {
    const [rows] = await pool.query(`
        SELECT 
            r.razon AS rendeles_id,
            r.vazon AS vevo_id,
            r.fazon AS futar_id,
            r.idopont,
            t.pazon AS pizza_id,
            p.pnev AS pizza_nev,
            p.par AS pizza_ar,
            t.db AS darabszam,
            (p.par * t.db) AS osszeg
        FROM rendeles r
        JOIN tetel t ON r.razon = t.razon
        JOIN pizza p ON t.pazon = p.pazon
        ORDER BY r.razon
    `);
    return rows;
};

export const getRendelesById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM rendeles WHERE razon = ?', [id]);
    return rows[0];
};  

export const addRendeles = async (rendeles) => {
    const { vevoId, futarId, datum } = rendeles;
    const [result] = await pool.execute(
        'INSERT INTO rendeles (vazon, fazon, idopont) VALUES (?, ?, ?)',
        [vevoId, futarId, datum]
    );
    return result.insertId;
};

export const updateRendeles = async (id, rendeles) => {
    const { vevoId, futarId, datum } = rendeles;
    await pool.execute(
        'UPDATE rendeles SET vazon = ?, fazon = ?, idopont = ? WHERE razon = ?',
        [vevoId, futarId, datum, id]
    );
};

export const deleteRendeles = async (id) => {
    const [result] = await pool.execute(
        'DELETE FROM rendeles WHERE razon = ?', [id]
    );
    return result;
};

export default rendelesModel;