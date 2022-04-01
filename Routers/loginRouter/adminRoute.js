const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Admin = require("../Models/loginModel/adminModel");

const router = express.Router();

router.post("/adminSignup", (req, res, next) => {
  Admin.find({ email: req.body.email })
    .exec()
    .then(admin => {
      if (admin.length >= 1) {
        return res.status(409).json({
          message: "E-Mail ID exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const admin = new Admin({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              role: 'ADMIN'
            });
            admin
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created successfully"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
});

router.post("/adminLogin", (req, res, next) => {
  Admin.find({ email: req.body.email })
    .exec()
    .then(admin => {
      if (admin.length < 1) {
        return res.status(401).json({
          message: "Authrization failed!! either the account does't exist or you entered a wrong account"
        });
      }
      bcrypt.compare(req.body.password, admin[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Authorization failed!! either the account does't exist or you entered a wrong account"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: admin[0].email,
              userId: admin[0]._id,
              role: admin[0].role
            },
            process.env.JWT_KEY,
            {
                expiresIn: "5h"
            }
          );
          return res.status(200).json({
            message: "Authorization successful",
            token: token
          });
        }
        res.status(401).json({
          message: "Authorization failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:adminId", (req, res, next) => {
  Admin.remove({ _id: req.params.adminId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted successfully"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
