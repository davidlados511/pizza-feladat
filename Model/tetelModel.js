import pool from '../db.js';
const tetelModel = {};

// Összes tétel lekérése
export const getTetelek = async () => {
    const [rows] = await pool.query(`
        SELECT 
            t.razon AS rendeles_id,
            t.pazon AS pizza_id,
            p.pnev AS pizza_nev,
            p.par AS pizza_ar,
            t.db AS darabszam,
            (p.par * t.db) AS osszeg
        FROM tetel t
        JOIN pizza p ON t.pazon = p.pazon
        ORDER BY t.razon
    `);
    return rows;
};
// Tétel ID alapján történő lekérése
tetelModel.getTetelById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM tetel WHERE razon = ?', [id]);
    return rows[0];
};
// Új tétel hozzáadása
tetelModel.addTetel = async (tetel) => {
    const { razon, pazon, db } = tetel;
    const [result] = await pool.execute(
        'INSERT INTO tetel (razon, pazon, db) VALUES (?, ?, ?)',
        [razon, pazon, db]
    );
    return result.insertId;
};
// Tétel adatainak frissítése
tetelModel.updateTetel = async (id, tetel) => { 
    const { db } = tetel;
    await pool.execute(
        'UPDATE tetel SET db = ? WHERE razon = ?',
        [db, id]
    );
};
// Tétel törlése
tetelModel.deleteTetel = async (id) => {
    const [result] = await pool.execute(
        'DELETE FROM tetel WHERE razon = ?', [id]
    );
    return result;
};  

export default tetelModel;

