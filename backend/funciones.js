import pkg from "pg";
const { Pool } = pkg;
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "123456",
  database: "likeme",
  allowExitOnIdle: true,
});

export const obtenerPosts = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  return rows;
};

export const agregarPost = async (post) => {
  const { titulo, img, descripcion } = post;
  const consulta =
    "INSERT INTO posts (titulo, img, descripcion) VALUES ($1, $2, $3) RETURNING *";
  const values = [titulo, img, descripcion];
  const { rows } = await pool.query(consulta, values);
  return rows[0];
};

export const modificarPost = async (id) => {
  const consulta = "UPDATE posts SET likes = likes + 1 WHERE id = $1";
  const values = [id];
  const { rowCount } = await pool.query(consulta, values);
  if (rowCount === 0) {
    throw { code: 404, message: "No se consiguió ningún post con ese id" };
  }
};

export const eliminarPost = async (id) => {
  const consulta = "DELETE FROM posts WHERE id = $1";
  const values = [id];
  const { rowCount } = await pool.query(consulta, values);
  if (rowCount === 0) {
    throw { code: 404, message: "No se consiguió ningún post con ese id" };
  }
};
