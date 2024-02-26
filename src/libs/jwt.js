import config from "../config.js";
import jwt from "jsonwebtoken";
export function createdAccessToken(payload){
  return new Promise((resolve, reject) => {
    jwt.sign(payload, config.SECRET_KEY, {expiresIn: "1d"}, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });  
  });
};
