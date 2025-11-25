import { pool } from "../db.js";

export const getProducts = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.*, 
        c.name as category
      FROM products p
      LEFT JOIN category c ON p.category_id = c.id
      ORDER BY p.id ASC
    `);

    res.json(result.rows);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req, res) => {
  const { title, price, description, category_id, image, rating } = req.body;

  try {
    const result = await pool.query(
      `
      INSERT INTO products (title, price, description, category_id, image, rating_rate, rating_count)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
      `,
      [
        title,
        price,
        description,
        category_id,
        image,
        rating?.rate || null,
        rating?.count || null
      ]
    );

    res.json(result.rows[0]);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, price, description, category_id, image, rating } = req.body;

  try {
    const result = await pool.query(
      `
      UPDATE products
      SET title=$1, price=$2, description=$3, category_id=$4, image=$5, rating_rate=$6, rating_count=$7
      WHERE id=$8
      RETURNING *
      `,
      [
        title,
        price,
        description,
        category_id,
        image,
        rating?.rate || null,
        rating?.count || null,
        id
      ]
    );

    if (result.rowCount === 0) return res.status(404).json({ message: "No existe" });

    res.json(result.rows[0]);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(`DELETE FROM products WHERE id=$1`, [id]);

    if (result.rowCount === 0)
      return res.status(404).json({ message: "No existe" });

    res.json({ message: "Producto eliminado" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};