import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 4000;

const recipeList = [
  { id: 1, title: "title_1", cocking_time: "5 min" },
  { id: 2, title: "title_2", cocking_time: "6 min" },
];

app.use(bodyParser.json());

//GET all recipes
app.get("/", (req, res) => {
  res.json(recipeList);
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
  // Extract the ID from the request parameters
  const recipeId = parseInt(req.params.id);

  // Find the index of the item with the specified ID
  const recipeIndex = recipeList.findIndex((item) => item.id === recipeId);

  // If the item was not found, send a 404 response
  if (recipeIndex === -1) {
    return res.status(404).json({ message: "Item not found" });
  }

  // Remove the item from the data store
  recipeList.splice(recipeIndex);
  console.log(recipeList);
  // Send a 200 response with a success message
  res.status(200).json({ message: "Item deleted successfully" });
});

app.listen(PORT, () => {
  console.log("Started on port : " + PORT);
});
