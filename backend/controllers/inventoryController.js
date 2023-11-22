const InventoryItem = require("../models/InventoryItem");

const listItems = async (req, res) => {
  try {
    const items = await InventoryItem.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createItem = async (req, res) => {
  try {
    const { itemId, itemName, quantity } = req.body;
    const newItem = await InventoryItem.create({ itemId, itemName, quantity });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const item = await InventoryItem.findByPk(itemId);
    if (item) {
      res.json(item);
    } else {
      res.status(404).send("Item no encontrado");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { itemName, quantity } = req.body;
    const [updated] = await InventoryItem.update(
      { itemName, quantity },
      { where: { itemId } }
    );

    if (updated) {
      const updatedItem = await InventoryItem.findByPk(itemId);
      res.status(200).json(updatedItem);
    } else {
      res.status(404).send("Item no encontrado");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const deleted = await InventoryItem.destroy({ where: { itemId } });

    if (deleted) {
      res.status(204).send("Item eliminado");
    } else {
      res.status(404).send("Item no encontrado");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  listItems,
  createItem,
  getItem,
  updateItem,
  deleteItem,
};
