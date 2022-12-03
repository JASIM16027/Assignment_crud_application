const express = require("express");
const db = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtToken = {
    createToken({ id, email }) {
      return jwt.sign(
        { userId: id, email },
        
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
    },
    verifyToken(token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET, { expiresIn: '24h' });
      return decoded;
    }
  };
  
  const hashPassword = async (password) => await bcrypt.hash(password, 10);
  const isValidPassword =async (password, hash) => await bcrypt.compare(password, hash);
  module.exports = {
    jwtToken,
    hashPassword,
    isValidPassword

  }