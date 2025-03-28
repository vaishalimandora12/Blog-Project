import application from './src/app';
import * as http from 'http';
import { connection } from './config/db';
import cron from "node-cron";
import { scheduleCronJobs } from './src/cron/cronJobs' 

const PORT = process.env.PORT;
const server = http.createServer(application.instance);

//Db
console.time("db connect");
connection();
console.timeEnd("db connect");

//CRON JOB
scheduleCronJobs();

server.listen(PORT, () => {
  console.log(`Server started and running on http://localhost:${PORT} 🚀`);
});
