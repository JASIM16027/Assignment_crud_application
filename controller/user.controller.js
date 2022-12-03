const express = require('express');
const db = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Auth } = require('../config/database');
require('dotenv').config();

exports.getOneUser = async (req, res) => {
  try {
    const result = await db.Profile.findOne({
      where: {
        id: req.params.id,
      },
      raw: true,
      include: [
        {
          model: Auth,
          attributes: ['email', 'profileId'],
        },
      ],
    });
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
exports.updateOneUser = (req, res) => {};
exports.deleteOneUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await db.Profile.destroy({
      where: {
        id: userId,
      },
      include: [
        {
          model: Auth,
          cascade: true,
        },
      ],
    });
    return res.json(result);
  } catch (e) {
    console.log('error deleting user:', e);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
exports.getAllUser = async (req, res) => {
  try {
    const result = await db.Profile.findAll({
      raw: true,
      include: [
        {
          model: Auth,
          attributes: ['email', 'profileId'],
        },
      ],
    });
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
