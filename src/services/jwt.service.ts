import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { userModel } from "../model/user.model";
import "dotenv/config";
import { user } from "../interface/user.interface";
const JWT_key = "test";
const REFRESH_TOKEN_SECRET = "refresh_secret"; 
const REFRESH_TOKEN_EXPIRY = "7d";

class jsonWebTokenService {
      constructor() {
      }
      createJwtToken(payload: any) {
            return new Promise(async (resolve, reject) => {
                  try {
                        const token = await jwt.sign(payload, JWT_key);
                        if (token) {
                              resolve(token);
                        } else {
                              reject("Invalid payload data");
                        }
                  } catch (error) {
                        reject(error);
                  }
            });
      }

      createRefreshToken(payload: any) {
            return new Promise(async (resolve, reject) => {
                  try {
                        const token = await jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
                        resolve(token);
                  } catch (error) {
                        reject(error);
                  }
            });
      }

      _tokenDecode = (req: any): Promise<any> => {
            var token = req.headers.authorization.split(" ")[1];
            return new Promise(async (resolve, reject) => {
                  try {
                        if (!req.headers.authorization.startsWith("Bearer")) reject({ message: "Invalid Token" });
                        var decode: any = jwt.verify(token, JWT_key);
                        if (!decode) reject("Invalid token");
                        let userId = decode.userId;
                        const user = await userModel.findOne({ _id: userId });
                        if (!user) reject("Invalid token");
                        req["userInfo"] = user;

                        resolve(user);
                  } catch (error) {
                        reject(error);
                  }
            });
      };
      _userJwtToken = (req: any): Promise<user> => {
            var token = req.headers.authorization.split(" ")[1];
            return new Promise(async (resolve, reject) => {
                  try {
                        if (!req.headers.authorization.startsWith("Bearer")) reject({ message: "Invalid Token" });
                        var decode: any = jwt.verify(token, JWT_key);
                        if (!decode) reject({message:"Invalid token"});
                        let userId = decode.userId;
                        const user = await userModel.findOne({ _id: userId });
                        if (!user) reject({message:"Invalid token"});
                        resolve(token);
                  } catch (error) {
                        console.log(error);
                        reject(error);
                  }
            });
      };

      decodeRefreshToken(token: string): Promise<any> {
            return new Promise(async (resolve, reject) => {
                  try {
                        const decoded: any = jwt.verify(token, REFRESH_TOKEN_SECRET);
                        if (!decoded) return reject({ message: "Invalid refresh token" });

                        const userRecord = await userModel.findById(decoded.userId);
                        if (!userRecord) return reject({ message: "User not found" });

                        resolve(userRecord);
                  } catch (error) {
                        reject(error);
                  }
            });
      }
}

export const JsonWebTokenService = new jsonWebTokenService();
