const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// get all users
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

// get user
exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new AppError("No user found with that Id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj = obj[el];
    }
  });
  return newObj;
};

//update user
exports.updateMe = catchAsync(async (req, res, next) => {
  // create an error if user trues to update password
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password update please user /updatePassword",
        400
      )
    );
  }

  // filter out unwanted data
  const filteredBody = filterObj(req.body, "name", "email");
  if (req.file) filteredBody.photo = req.file.filename;

  // update the user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      updatedUser,
    },
  });
});

// delete user
exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findOneAndDelete(req.user.id);

  if (!user) {
    return next(new AppError("No user found with that Id", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
