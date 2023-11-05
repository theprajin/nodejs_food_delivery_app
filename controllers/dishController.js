const getAllDishes = async (req, res) => {
  return res.send("Get All Dishes");
};

const getSingleDish = async (req, res) => {
  return res.send("Get Single Dish");
};

const createDish = async (req, res) => {
  return res.send("Create Dish");
};

const updateDish = async (req, res) => {
  return res.send("Update Dish");
};

const deleteDish = async (req, res) => {
  return res.send("Delete Dishes");
};

module.exports = {
  getAllDishes,
  getSingleDish,
  createDish,
  updateDish,
  deleteDish,
};
