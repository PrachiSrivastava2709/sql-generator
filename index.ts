import express, {Application, Request, Response} from "express";
import cors from "cors";
import OpenAI from "openai";

const port: number = 8000;
const apiKey: string = 'YOUR_API_KEY';

const app: Application = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({apiKey: apiKey});

app.post("/completions", async (req: Request, res: Response) => {
    try {
        const completion = await openai.completions.create({
            model: "gpt-3.5-turbo-instruct",
            prompt: "Create an SQL query to" + req.body.message,
          });

        res.send(completion);
    } 
    catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
})

app.listen(port, () =>  {
    console.log(`Server is up and running on port ${port}`);
});
