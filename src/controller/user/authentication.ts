import mongoose from 'mongoose';
import { Request, Response } from "express";
import { JsonWebTokenService } from "../../services/jwt.service";
import { _httpStatusService } from "../../utils/_httpStatus";
import { UserService } from "../../services/user.service";
import  { SessionService } from "../../services/session.service";
import { enumType } from "../../utils/enum";


class authenticationController {
    async signUp(req: any, res: Response) {
        try {
            const { firstName, lastName, password, email, deviceToken, deviceType, deviceName } = req.body;

            const refData = {
                userType: enumType.userType.user,
                firstName: firstName,
                lastName: lastName,
                password: password,
                email: email,
                socialLogin: false,
            };
            let userData = await UserService.create(refData);

            let accessToken: any = await JsonWebTokenService.createJwtToken({
                userId: userData._id,
                email: userData.email,
                deviceToken: deviceToken,
            });

            let refreshToken: any = await JsonWebTokenService.createRefreshToken({
                userId: userData._id,
                email: userData.email,
            });

            await SessionService.create({
                deviceToken: deviceToken,
                deviceType: deviceType,
                deviceName: deviceName,
                accessToken: accessToken,
                refershToken: refreshToken, 
                userId: userData._id,
                userType: enumType.userType.user,
            });
    
            let resObj = {
                status: _httpStatusService.status.OK,
                message: "Register successfully",
                data: {
                    user: userData,
                    accessToken: accessToken,
                    refreshToken: refreshToken, 
                },
            };
    
            return res.status(_httpStatusService.status.OK).json(resObj);
        } catch (error: any) {
            let resObj = {
                status: _httpStatusService.status.serverError,
                message: error.message,
            };
            return res.status(_httpStatusService.status.serverError).json(resObj);
        }
    }
    

    async signIn(req: Request, res: Response){
        try {
    
            const { email, password, deviceToken, deviceType, deviceName } = req.body;
    
            const user = await UserService.findOne({ email: email, userType: enumType.userType.user });

            const accessToken = await JsonWebTokenService.createJwtToken({ userId: user._id, email: user.email });
            const refreshToken = await JsonWebTokenService.createRefreshToken({ userId: user._id, email: user.email });
    
            await SessionService.updateOne({userId:new mongoose.Types.ObjectId(user._id)},{
                deviceToken: deviceToken,
                deviceType: deviceType,
                deviceName: deviceName,
                accessToken: accessToken,
                refershToken: refreshToken,
                userId: user._id,
                userType: enumType.userType.user,
            });

            return res.status(200).json({
                status: "success",
                message: "Login successfully",
                data: {
                    user: user,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                },
            });
    
        } catch (error: any) {
            return res.status(500).json({ status: "error", message: error.message });
        }
    };
}

export const AuthenticationController = new authenticationController();

