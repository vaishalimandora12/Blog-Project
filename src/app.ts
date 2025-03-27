import express, { Application as ExApplication } from "express";
import cors from "cors";
import { userRoutes } from "./routes/user.routes";
import {JWT_token, check_active_user, check_session } from "./middleware/checkActive.middleware";

class Application {
      private readonly _instance: ExApplication;
      get instance(): ExApplication {
            return this._instance;
      }
      constructor() {
            this._instance = express();
            this._instance.use(cors());
            this._instance.use(express.json());

            this._instance.use("/api/user/", userRoutes);
            this._instance.use("/api/user/private/", JWT_token, check_active_user, check_session)
      
      }
}
export default new Application();
