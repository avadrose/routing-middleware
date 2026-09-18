const express = require("express");
const router = new express.Router();

let items = require("./fakeDb");

router.get("/", (req, res) => {
  return res.json(items);
});

router.post("/", (req, res) => {
  const newItem = {
    name: req.body.name,
    price: req.body.price
  };

  items.push(newItem);

  return res.status(201).json({
    added: newItem
  });
});

router.get("/:name", (req, res) => {
  const item = items.find(i => i.name === req.params.name);

  if (!item) {
    return res.status(404).json({
      error: "Item not found"
    });
  }

  return res.json(item);
});

router.patch("/:name", (req, res) => {
  const item = items.find(i => i.name === req.params.name);

  if (!item) {
    return res.status(404).json({
      error: "Item not found"
    });
  }

  if (req.body.name !== undefined) {
    item.name = req.body.name;
  }

  if (req.body.price !== undefined) {
    item.price = req.body.price;
  }

  return res.json({
    updated: item
  });
});

router.delete("/:name", (req, res) => {
  const itemIndex = items.findIndex(i => i.name === req.params.name);

  if (itemIndex === -1) {
    return res.status(404).json({
      error: "Item not found"
    });
  }

  items.splice(itemIndex, 1);

  return res.json({
    message: "Deleted"
  });
});

module.exports = router;