import { JsonWebTokenService } from '../services/jwt.service';
import { SessionService } from '../services/session.service';
import { _httpStatusService } from '../utils/_httpStatus';
import { UserService } from '../services/user.service';
import { enumType } from '../utils/enum';

export const check_session = async (req, res, next) => {
    try {
        const accessToken = await JsonWebTokenService._userJwtToken(req);
        const check_user = await JsonWebTokenService._tokenDecode(req);

        if (!check_user) {
            return res.status(401).json({ status: 401, message: "Invalid token" });
        }

        if (check_user.status === "blocked") {
            await SessionService.deleteSession({ _id: accessToken._id });
            return res.status(401).json({
                status: 401,
                message: "Your account has been blocked.",
            });
        }

        const session = await SessionService.findOne({ accessToken });
        if (!session) {
            return res.status(401).json({ status: 401, message: "Session expired!" });
        }

        next();
    }  catch (error: any) {
        let resObj = {
            status: _httpStatusService.status.serverError,
            message: error.message,
        };
        return res.status(_httpStatusService.status.serverError).json(resObj);
    }
};

export const check_active_user = async (req, res, next) => {
    try {
        const token = await JsonWebTokenService._userJwtToken(req);
        const accessToken = await JsonWebTokenService._tokenDecode(req);

        if (!accessToken) {
            return res.status(401).json({ status: 401, message: "Invalid token" });
        }

        if (accessToken.status === enumType.userBlockStatus.blocked) {
            await SessionService.deleteSession({ _id: accessToken._id });
            return res.status(401).json({
                status: 401,
                message: "Your account has been blocked. Please contact support for assistance.",
            });
        }

        next();
    }  catch (error: any) {
        let resObj = {
            status: _httpStatusService.status.serverError,
            message: error.message,
        };
        return res.status(_httpStatusService.status.serverError).json(resObj);
    }
};

export const JWT_token = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ status: 401, message: "Authorization is required" });
        }
        
        await JsonWebTokenService._tokenDecode(req);
        next();
    }  catch (error: any) {
        let resObj = {
            status: _httpStatusService.status.serverError,
            message: error.message,
        };
        return res.status(_httpStatusService.status.serverError).json(resObj);
    }
};
