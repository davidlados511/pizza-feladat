import pool from "../db.js";
const vevoModel = {};

export const getVevok = async () => {
  const [rows] = await pool.query("SELECT * FROM vevo");
  return rows;
};

export const getVevoById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM vevo WHERE vazon = ?", [id]);
  return rows[0];
};      

export const addVevo = async (vevo) => {
  const { nev, cim } = vevo;
  const [result] = await pool.execute(
    "INSERT INTO vevo (vnev, vcim) VALUES (?, ?)",
    [nev, cim]
  );
  return result.insertId;
};

export const updateVevo = async (id, vevo) => {
  const { nev, cim } = vevo;
  await pool.execute(
    "UPDATE vevo SET vnev = ?, vcim = ? WHERE vazon = ?",
    [nev, cim, id]
  );
};  

export const deleteVevo = async (id) => {
  const [result] = await pool.execute("DELETE FROM vevo WHERE vazon = ?", [
    id,
  ]);
  return result;
};

export default vevoModel;