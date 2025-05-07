import express, {Request, Response} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3005;

const app = express()

app.use(express.json()); //middleware to parse and handle json
app.use(cors()); //enable cors for all routes

app.get("/", (req: Request, res: Response) => {
  res.send("Ball Up API");
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
