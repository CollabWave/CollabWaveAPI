const { Test } = require("../models");

const testCtrl = async (req, res) => {
  const newTest = await Test.create({ ...req.body });

  return res.status(201).json({
    message: "Transaction successfully created",
    data: newTest,
  });
};

module.exports = testCtrl;
