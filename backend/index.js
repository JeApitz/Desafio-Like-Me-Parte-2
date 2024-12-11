import express from "express";
import cors from "cors";
import {
  obtenerPosts,
  agregarPost,
  modificarPost,
  eliminarPost,
} from "./funciones.js";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3000, console.log("¡Servidor encendido!"));

app.get("/posts", async (req, res) => {
  try {
    res.json(await obtenerPosts());
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/posts", async (req, res) => {
  const post = req.body;
  try {
    res.json(await agregarPost(post));
  } catch (error) {
    const { code } = error;
    if (code == "23502") {
      res
        .status(400)
        .send(
          "Se ha violado la restricción NOT NULL en uno de los campos de la tabla"
        );
    } else {
      res.status(500).send(error);
    }
  }
});

app.put("/posts/like/:id", async (req, res) => {
  const { id } = req.params;
  try {
    res.json(await modificarPost(id));
  } catch ({ code, message }) {
    res.status(code).send(message);
  }
});

app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await eliminarPost(id);
    res.send("Posts eliminado con éxito");
  } catch ({ code, message }) {
    res.status(code).send(message);
  }
});
