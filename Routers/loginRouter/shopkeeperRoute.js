const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Shopkeeper = require("../Models/loginModel/shopkeeperModel");

const router = express.Router();

router.post("/shopkeeperSignup", (req, res, next) => {
  Shopkeeper.find({ email: req.body.email })
    .exec()
    .then(shopkeeper => {
      if (shopkeeper.length >= 1) {
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
            const shopkeeper = new Shopkeeper({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              role: 'SHOPKEEPER'
            });
            shopkeeper
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

router.post("/shopkeeperLogin", (req, res, next) => {
  Shopkeeper.find({ email: req.body.email })
    .exec()
    .then(shopkeeper => {
      if (shopkeeper.length < 1) {
        return res.status(401).json({
          message: "Authrization failed!! either the account does't exist or you entered a wrong account"
        });
      }
      bcrypt.compare(req.body.password, shopkeeper[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Authorization failed!! either the account does't exist or you entered a wrong account"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: shopkeeper[0].email,
              userId: shopkeeper[0]._id,
              role: shopkeeper[0].role
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

router.delete("/:shopkeeperId", (req, res, next) => {
  Shopkeeper.remove({ _id: req.params.shopkeeperId })
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
