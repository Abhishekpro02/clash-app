import express, { Application, Request, Response, NextFunction } from "express";
import "dotenv/config";

const app: Application = express();
const PORT = process.env.PORT || 5000;
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { sendMail } from "./config/email.js";
import ejs from "ejs";

const _dirname = dirname(fileURLToPath(import.meta.url));

// set view engine
app.set("view engine", "ejs");
app.set("views", path.resolve(_dirname, "views"));

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static folder
app.use(express.static(path.resolve(_dirname, "public")));

// send email
app.get("/send", async (req: Request, res: Response) => {
  try {
    const html = await ejs.renderFile(_dirname + "/views/emails/welcome.ejs", {
      name: "Abhishek Sahni",
    });

    const info = await sendMail("abhiproplus@gmail.com", "Test", html);
    res.status(200).json({ message: "Email sent successfully...", info });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.render("index", { title: "Clash-App" });
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
