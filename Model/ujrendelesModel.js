import pool from '../db.js';
const ujrendelesModel = {};

// Új rendelés hozzáadása
export const addUjRendeles = async (ujRendeles) => {
    const { vevo_id, futar_id, tetel_lista } = ujRendeles;
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const [rendelesResult] = await connection.execute(
            'INSERT INTO rendeles (vazon, fazon, idopont) VALUES (?, ?, NOW())',
            [vevo_id, futar_id]
        );
        const rendelesId = rendelesResult.insertId;
        for (const tetel of tetel_lista) {
            const { pizza_id, darabszam } = tetel;
            await connection.execute(
                'INSERT INTO tetel (razon, pazon, db) VALUES (?, ?, ?)',
                [rendelesId, pizza_id, darabszam]
            );
        }
        await connection.commit();
        return rendelesId;
    } catch (error) {
        await connection.rollback();
        throw error;
    }
    finally {
        connection.release();
    }
};

export default ujrendelesModel;