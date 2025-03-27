import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { userModel } from "../model/user.model";
import "dotenv/config";
import { user } from "../interface/user.interface";

const JWT_KEY = "test";
const JWT_EXPIRY = "60s";

const REFRESH_TOKEN_SECRET = "refresh_secret"; 
const REFRESH_TOKEN_EXPIRY = "365d"; 

class jsonWebTokenService {
      constructor() {}

      createJwtToken(payload: any) {
            return new Promise(async (resolve, reject) => {
                  try {
                        const token = await jwt.sign(payload, JWT_KEY, { expiresIn: JWT_EXPIRY });
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
            return new Promise(async (resolve, reject) => {
                try {
                    if (!req.headers.authorization) {
                        return reject({ message: "authorization is required.." });
                    }
        
                    if (!req.headers.authorization.startsWith("Bearer ")) {
                        return reject({ message: "Invalid token format" });
                    }
        
                    const token = req.headers.authorization.split(" ")[1];
                    const decode: any = jwt.verify(token, JWT_KEY);
                    if (!decode) return reject({ message: "Invalid token" });
        
                    const user = await userModel.findOne({ _id: decode.userId });
                    if (!user) return reject({ message: "User not found" });
        
                    req["userInfo"] = user;
                    resolve(user);
                } catch (error) {
                    reject(error);
                }
            });
        };
        
        _userJwtToken = (req: any): Promise<any> => {
            return new Promise(async (resolve, reject) => {
                try {
                    if (!req.headers.authorization) {
                        return reject({ message: "Authorization header is missing" });
                    }
        
                    if (!req.headers.authorization.startsWith("Bearer ")) {
                        return reject({ message: "Invalid token format" });
                    }
        
                    const token = req.headers.authorization.split(" ")[1];
                    const decode: any = jwt.verify(token, JWT_KEY);
                    if (!decode) return reject({ message: "Invalid token" });
        
                    const user = await userModel.findOne({ _id: decode.userId });
                    if (!user) return reject({ message: "User not found" });
        
                    resolve(token);
                } catch (error) {
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
