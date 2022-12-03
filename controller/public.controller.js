const express = require("express");
const db = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// const { hashedPassword, jwtToken, isValidPassword } = require("../utils/index");

let signUp = async (req, res) => {
  try {
    // get data from request body for profile table
    const { firstName, lastName, nid, profilePhoto, isMarried, age } = req.body;
    const profileInfo = {
      firstName: firstName,
      lastName: lastName,
      nid: nid,
      profilePhoto: profilePhoto,
      isMarried: isMarried,
      age: age,
    };

    // insert record into Profile data
    const profile = await db.Profile.create(profileInfo);

    //get data for auth Table
    const { email, password } = req.body;
    // hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const authInfo = {
      email: email,
      password: hashedPassword,
    };

    let auth;
    if (profile && profile.id) {
      authInfo.profileId = profile.id;
      // insert profileId into auth table
      auth = await db.Auth.create(authInfo);
    }

    return res.status(201).json({
      message: "Record created successfully!",
      response: { profile, auth },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Unable to create a record!",
    });
  }
};

// signIn part
let signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.Auth.findOne({
      attributes: ["id", "email", "password"],
      where: {
        email: email,
      },
    });
    // console.log(user.dataValues);
    //check user exist or not
    if (user) {
      // password matched or not 
      const isValidPassword = await bcrypt.compare(
        password,
        user.dataValues.password
      );
        // 
      if (isValidPassword) {
        /* 
                generate token
            */
        const token = jwt.sign(
          // payload
          {
            email: user.dataValues.email,
            userId: user.dataValues.id,
          },
          // secretOrPrivateKey
          process.env.JWT_SECRET,
          //  [options, callback] 
          {
            expiresIn: "1h",
          }
        );

        res.status(200).json({
          access_token: token,
          message: "login  successful!",
        });
      } else {
        res.status(401).json({
          error: "Invalid password!",
        });
      }
    } else {
      res.status(401).json({
        error: "Incorrect user/password!",
      });
    }
  } catch (err) {
    res.status(401).json({
      error: "Authetication failed!" + err.message,
    });
  }
};
module.exports = {
  signUp,
  signIn,
};
