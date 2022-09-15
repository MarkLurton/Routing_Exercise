const express = require("express");
const router = new express.Router();
const items = require("./fakeDb");
const ExpressError = require("./expressError");

router.get("/", (req, res) => {
  res.json({ items: items });
});

router.post("/", (req, res) => {
  const newItem = { name: req.body.name, price: req.body.price };
  items.push(newItem);
  res.status(201).json({ added: newItem });
});

router.get("/:name", (req, res) => {
  const foundItem = items.find((item) => item.name === req.params.name);
  if (foundItem === undefined) {
    throw new ExpressError("Item not found", 404);
  }
  res.json({ item: foundItem });
});

router.patch("/:name", (req, res) => {
  const foundItem = items.find((item) => item.name === req.params.name);
  if (foundItem === undefined) {
    throw new ExpressError("Item not found", 404);
  }
  foundItem.name = req.body.name;
  foundItem.price = req.body.price;
  res.json({ item: foundItem });
});

router.delete("/:name", (req, res) => {
  const foundItemIndex = items.findIndex(
    (item) => item.name === +req.params.name
  );
  if (foundItemIndex === undefined) {
    throw new ExpressError("Item not found", 404);
  }
  items.splice(foundItemIndex, 1);
  res.json({ message: "Deleted" });
});

module.exports = router;
