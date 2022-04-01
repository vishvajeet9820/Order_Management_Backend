const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Representative = require("../Models/loginModel/representativeModel");

const router = express.Router();

router.post("/representativeSignup", (req, res, next) => {
  Representative.find({ email: req.body.email })
    .exec()
    .then(representative => {
      if (representative.length >= 1) {
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
            const representative = new Representative({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              role: 'REPRESENTATIVE'
            });
            representative
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

router.post("/representativeLogin", (req, res, next) => {
  Representative.find({ email: req.body.email })
    .exec()
    .then(representative => {
      if (representative.length < 1) {
        return res.status(401).json({
          message: "Authrization failed!! either the account does't exist or you entered a wrong account"
        });
      }
      bcrypt.compare(req.body.password, representative[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Authorization failed!! either the account does't exist or you entered a wrong account"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: representative[0].email,
              userId: representative[0]._id,
              role: representative[0].role
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

router.delete("/:representativeId", (req, res, next) => {
  Representative.remove({ _id: req.params.representativeId })
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
