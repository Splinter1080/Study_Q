const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport("SMTP", {
  service: process.env.SERVICE,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

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
    user.save();

    var link = "http://" + req.get("host") + "/confirm?id=" + user._id;
    mailOptions = {
      to: email,
      subject: "Please verify your Email",
      html:
        "Welcome,<br> <br><a href=" +
        link +
        "> Click on the link to verify your email</a><br>",
    };

    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function (error, response) {
      if (error) {
        console.log(error);
      } else {
        console.log("Message sent: " + response.message);
      }
    });

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

      user.save();
      res.status(200).json(user);
    } else res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
};

//---------------------------------------------------------

module.exports.confirm = async (req, res) => {
  try {
    const { id } = req.query;
    const user = await User.findOne({ _id: id });
    user.isVerified = true;
    user.save();
    res.status(200).send("Verification Successfull");
  } catch (err) {
    res.status(400).send("Bad Request");
  }
};

//---------------------------------------------------------

module.exports.resetGet = async (req, res) => {
  try {
    const { id } = req.query;
    console.log(id);
    const user = await User.findOne({ _id: id });
    const token = jwt.sign(
      { user_id: user._id },
      process.env.TOKEN_KEY || "a56s7ausjh",
      {
        expiresIn: "5m",
      }
    );
    user.isReset = token;

    var link = "http://" + req.get("host") + "/reset?id=" + user._id;
    mailOptions = {
      to: user.email,
      subject: "Request to change password",
      html:
        "We recieved a request to change password,<br> <br><a href=" +
        link +
        "> Click on the link to change your password</a><br>",
    };

    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function (error, response) {
      if (error) {
        console.log(error);
      } else {
        console.log("Message sent: " + response.message);
      }
    });

    user.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).send("Something went wrong");
  }
};

//---------------------------------------------------------

module.exports.resetPost = async (req, res) => {
  try {
    const { id, password, isReset } = req.body;
    const user = await User.findOne({ _id: id });
    if (user.isReset != null) {
      try {
        const decoded = jwt.verify(
          isReset,
          process.env.TOKEN_KEY || "a56s7ausjh"
        );
        console.log(decoded);
        const encryptedPassword = await bcrypt.hash(password, 10);
        user.isReset = null;
        user.password = encryptedPassword;
      } catch (err) {
        console.log(err);
        return res.status(401).send("Invalid Token");
      }

      user.save();
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
};
