const getAllOrders = async (req, res) => {
  return res.send("Get All Orders");
};

const getSingleOrder = async (req, res) => {
  return res.send("Get Single Order");
};

const createOrder = async (req, res) => {
  return res.send("Create Order");
};

const updateOrder = async (req, res) => {
  return res.send("Update Order");
};

const getSingleUserOrders = async (req, res) => {
  return res.send("Get Single User Orders");
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  getSingleUserOrders,
};
