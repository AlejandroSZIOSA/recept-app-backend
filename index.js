import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 4000;

const recipeList = [
  {
    id: 1,
    title: "title 1",
    ingredients_steps: "ingredients steps 1",
    cocking_time: "1 min",
  },
  {
    id: 2,
    title: "title 2",
    ingredients_steps: "ingredients steps 2",
    cocking_time: "2 min",
  },
  {
    id: 3,
    title: "title 3",
    ingredients_steps: "ingredients steps 3",
    cocking_time: "3 min",
  },
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
