const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, age, phone } = req.body;
    //console.log(req.body)

    // Validate user input
    if (!(email && password && firstName && lastName && age)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: encryptedPassword,
      age,
      phone,
      isReset: false,
      isVerified: false,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY || "a56s7ausjh",
      {
        expiresIn: "2h",
      }
    );

    // save user token
    user.token = token;
    user.save()

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
};

// -----------------------------------------------------------------------

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    // check if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY || "a56s7ausjh",
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      user.save()
      res.status(200).json(user);
    } else res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
};

//---------------------------------------------------------

module.exports.confirm = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    user.isVerified = true;
    user.save()
    res.status(200).send("Verification Successfull");
  } catch (err) {
    res.status(400).send("Bad Request");
  }
};

//---------------------------------------------------------

module.exports.resetGet = async (req, res) => {
  try {
    const { id } = req.query;
    console.log(id)
    const user = await User.findOne({ _id: id });
    user.isReset = true;
    user.save()
    res.status(200).json(user);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
};

//---------------------------------------------------------

module.exports.resetPost = async (req, res) => {
  try {
    const { id , password} = req.body;
    const user = await User.findOne({ _id: id });
    if(user.isReset){
     const encryptedPassword = await bcrypt.hash(password, 10);
      user.isReset = false;
      user.password = encryptedPassword
    }
    user.save()
    res.status(200).json(user);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
};
