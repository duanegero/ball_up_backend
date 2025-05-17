import express, { Request, Response, Router, Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { trainersRoute } from "./routes/trainersRoute";
import { athletesRoute } from "./routes/athletesRoute";
import { drillsRoute } from "./routes/drillsRoute";
import { sessionsRoute } from "./routes/sessionsRoute";
import { trainerLoginRoute } from "./routes/trainerLoginRoute";
import { athleteLoginRoute } from "./routes/athleteLoginRoute";

dotenv.config();

const PORT = parseInt(process.env.PORT || "3005", 10);

const app: Application = express();

app.use(express.json()); //middleware to parse and handle json
app.use(cors()); //enable cors for all routes

app.use("/trainers", trainersRoute);
app.use("/athletes", athletesRoute);
app.use("/drills", drillsRoute);
app.use("/sessions", sessionsRoute);
app.use("/trainer_login", trainerLoginRoute);
app.use("/athlete_login", athleteLoginRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Ball Up API");
});

app.listen(PORT, () => console.log(`Server running on http://0.0.0.0:${PORT}`));
