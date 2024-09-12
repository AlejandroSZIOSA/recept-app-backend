import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 4000;

const productList = [
  {
    id: 1,
    title: "product 1",
    price: 100,
  },
  {
    id: 2,
    title: "product 2",
    price: 200,
  },
  {
    id: 3,
    title: "product 3",
    price: 300,
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
  res.send(JSON.stringify(productList));
});

//GET By Id
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const itemIndex = productList.findIndex((item) => item.id === parseInt(id));
  if (itemIndex >= 0) {
    res.status(200).send(JSON.stringify(productList[itemIndex]));
  } else {
    res.sendStatus(404).send("Item Not Found");
  }
});

//ADD new recipe
app.post("/products", (req, res) => {
  const data = req.body;
  const createdId = productList.length + 1;
  data.id = createdId;
  productList.push(data);
  res.send("Post data received:" + JSON.stringify(data));
});

//UPDATE
app.put("/product/update/:id", (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const itemIndex = productList.findIndex((item) => item.id === parseInt(id));
  //Item Index <0 means item doesnt exist
  if (itemIndex >= 0) {
    productList[itemIndex].title = data.title;
    res.status(200).send("Item Updated");
  } else {
    res.sendStatus(404).send("Item Not Found");
  }
});

// DELETE a recipe by Id
app.delete("/product/:id", (req, res) => {
  const { id } = req.params;
  const itemIndex = productList.findIndex((item) => item.id === parseInt(id));

  if (itemIndex > -1) {
    productList.splice(itemIndex, 1);
    res.status(200).send({ message: "Item deleted successfully" });
  } else {
    res.status(404).send({ message: "Item not found" });
  }
});

app.listen(PORT, () => {
  console.log("Started on port : " + PORT);
});
