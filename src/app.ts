import express, { Application as ExApplication } from "express";
import cors from "cors";

// import { check_active_user, check_session, update_active_user } from "./middleware/checkActive.middleware";

class Application {
      private readonly _instance: ExApplication;
      get instance(): ExApplication {
            return this._instance;
      }
      constructor() {
            this._instance = express();
            this._instance.use(cors());
            this._instance.use(express.json());

            // this._instance.use("/api/user/private/", JWT_TOKEN, check_active_user, check_session, update_active_user);
            // this._instance.use("/api/user/", userRoutes);
      }
}
export default new Application();
