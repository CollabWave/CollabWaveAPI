const { User } = require("../../models");
const { RequestError } = require("../../helpers");

const updateDataCtrl = async (req, res) => {
  const { _id } = req.user;
  const { firstName, lastName, email, role, info } = req.body;
  let user = await User.findById(_id);
  if (!user) {
    throw RequestError(404, "Not found!");
  }

  user = {
    firstName,
    lastName,
    email,
    role,
    info,
  };

  res.status(200).json({
    status: "success",
    data: user,
  });
};

module.exports = updateDataCtrl;
