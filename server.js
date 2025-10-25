const express = require("express");
const sequelize = require("./config/database");
const Tutorial = require("./models/Tutorial");

const app = express();
const PORT = 3000;

app.use(express.json());

sequelize.sync().then(() => {
  console.log("Banco de dados sincronizado");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

// CREATE /tutorials - Criar um novo produto
app.post("/tutorials", async (req, res) => {
  try {
    const tutorial = await Tutorial.create(req.body);
    res.status(201).json(tutorial);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ /tutorials - Obter todos os produtos
app.get("/tutorials", async (req, res) => {
  try {
    const tutorials = await Tutorial.findAll();
    res.status(200).json(tutorials);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ /tutorials/:id - Obter um produto por ID
app.get("/tutorials/:id", async (req, res) => {
  try {
    const tutorial = await Tutorial.findByPk(req.params.id);
    if (!tutorial) {
      res.status(200).json(tutorial);
    } else {
      res.status(404).json({ error: "Tutorial not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//UPDATE /tutorials/:id - Atualizar um produto
app.put("/tutorials/:id", async (req, res) => {
  try {
    const tutorial = await Tutorial.findByPk(req.params.id);
    if (!tutorial) {
      await tutorial.update(req.body);
      res.status(200).json(tutorial);
    } else {
      res.status(404).json({ error: "Tutorial not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /tutorials/:id - Deletar um produto
app.delete("/tutorials/:id", async (req, res) => {
  try {
    const tutorial = await Tutorial.findByPk(req.params.id);
    if (tutorial) {
      await tutorial.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Tutorial not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 6. Iniciando o Servidor
app.listen(PORT, () => {
  console.log(
    `Servidor rodando na porta ${PORT}. Acesse http://localhost:${PORT}/`
  );
});
