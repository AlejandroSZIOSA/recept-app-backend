import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 4000;

const recipeList = [
  { id: 1, title: "title_1", cocking_time: "5 min" },
  { id: 2, title: "title_2", cocking_time: "6 min" },
  { id: 3, title: "title_3", cocking_time: "6 min" },
];

/* app.use(cors()); //AXIOS */
app.use(bodyParser.json());
/* app.use(bodyParser.urlencoded({ extended: true })); //AXIOS */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//GET all recipes
app.get("/", (req, res) => {
  /*  res.json(recipeList); */
  res.send(JSON.stringify(recipeList));
});

//GET a recipe by Id
app.get("/:id", (req, res) => {
  const found = recipeList.some((item) => item.id === req.params.id);
  if (!found) {
    res.status(400).json({ msg: `No recipe with this id = ${req.params.id}` });
  } else {
    res.json(recipeList.filter((item) => item.id === req.params.id));
  }
});

//ADD new recipe
app.post("/recipes", (req, res) => {
  const data = req.body;
  recipeList.push(data);
  res.send("Post data received:" + JSON.stringify(data));
});

// DELETE a recipe by Id
app.delete("/recipes/:id", (req, res) => {
  const { id } = req.params;
  const itemIndex = recipeList.findIndex((item) => item.id === parseInt(id));

  if (itemIndex > -1) {
    recipeList.splice(itemIndex, 1);
    res.status(200).send({ message: "Item deleted successfully" });
  } else {
    res.status(404).send({ message: "Item not found" });
  }
});

app.listen(PORT, () => {
  console.log("Started on port : " + PORT);
});
