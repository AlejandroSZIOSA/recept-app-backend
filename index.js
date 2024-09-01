import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 4000;

const recipeList = [
  {
    id: 1,
    title: "Recipe 1",
    ingredients_steps: "ingredients steps 1",
    cocking_time: "10 min",
  },
  {
    id: 2,
    title: "Recipe 2",
    ingredients_steps: "ingredients steps 2",
    cocking_time: "20 min",
  },
  {
    id: 3,
    title: "Recipe 3",
    ingredients_steps: "ingredients steps 3",
    cocking_time: "30 min",
  },
  {
    id: 4,
    title: "Recipe 4",
    ingredients_steps: "ingredients steps 4",
    cocking_time: "40 min",
  },
  {
    id: 5,
    title: "Recipe 5",
    ingredients_steps: "ingredients steps 5",
    cocking_time: "50 min",
  },
  {
    id: 6,
    title: "Recipe 6",
    ingredients_steps: "ingredients steps 6",
    cocking_time: "60 min",
  },
  {
    id: 7,
    title: "Recipe 7",
    ingredients_steps: "ingredients steps 7",
    cocking_time: "70 min",
  },
  {
    id: 8,
    title: "Recipe 8",
    ingredients_steps: "ingredients steps 8",
    cocking_time: "80 min",
  },
];

app.use(bodyParser.json());

//SET HEADERS
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

//ADD new recipe
app.post("/recipes", (req, res) => {
  const data = req.body;
  const createdId = recipeList.length + 1;
  data.id = createdId;
  recipeList.push(data);
  res.send("Post data received:" + JSON.stringify(data));
});

//UPDATE
app.put("/recipes/update/:id", (req, res) => {
  const data = req.body;
  const { id } = req.params;

  const itemIndex = recipeList.findIndex((item) => item.id === parseInt(id));
  if (!itemIndex) {
    recipeList[itemIndex].title = data.title;
    res.status(200).send("Item Updated");
  } else {
    res.sendStatus(404).send("Item Not Found");
  }
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
