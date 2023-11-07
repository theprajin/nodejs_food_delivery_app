const getAllReviews = async (req, res) => {
  return res.send("Get All Reviews");
};

const getSingleReview = async (req, res) => {
  return res.send("Get Single Review");
};

const createReview = async (req, res) => {
  return res.send("Create Review");
};

const updateReview = async (req, res) => {
  return res.send("Update Review");
};

const deleteReview = async (req, res) => {
  return res.send("Delete Review");
};

module.exports = {
  getAllReviews,
  getSingleReview,
  createReview,
  updateReview,
  deleteReview,
};
