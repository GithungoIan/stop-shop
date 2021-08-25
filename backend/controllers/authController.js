const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Email = require("../utils/email");

// signup
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const url = `${req.protocol}://${req.get("host")}/me`;
  await new Email(newUser, url).sendWelcomeMail;

  res.status(201).json({
    status: "success",
    message: "user created succesfully",
    data: {
      newUser,
    },
  });
});

// login
// log out
// forgot password
// reset password
// update password
// protect
// restrict to
// is logged in
