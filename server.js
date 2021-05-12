// constant email and password for admin
const email = "kingbook@gmail.com";
const password = "kingbook";

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const ejs = require("ejs");

// model import
const Note = require("./models/Note");
const indexRouter = require("./routes");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + "/public"));

mongoose.connect(
    "mongodb+srv://ihtiyor:ihtiyor12345@cluster0.og8zg.mongodb.net/notesDB",
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    }
);

// my own routes for telegram bot
indexRouter(app);

app.get("/admin", (req, res, nexts) => {
    res.redirect("/login");
});

app.post("/admin", async (req, res, nexts) => {
    console.log(req.isAuth);
    if (req.body.email == email && req.body.password == password) {
        const notes = await Note.find().sort({ date: -1 }).lean();

        res.render("admin", { notes });
    } else {
        res.redirect("/login");
    }
});

app.get("/", function (req, res) {
    return res.render("index");
});

app.get("/indexmap", function (req, res) {
    return res.render("indexMap");
});
app.get("/kurslar", function (req, res) {
    return res.render("kurslar");
});



app.post("/login", async (req, res, next) => {
    if (req.body.email == email && req.body.password == password) {
        res.redirect("/admin");
    } else {
        res.redirect("/login");
    }
});


app.post("/kurslar", async (req, res, nextr) => {
    try {
        const { title, content } = req.body;

        await Note.create({
            name: title,
            phone: content,
            date: new Date().toLocaleString("en-UZ", {
                timeZone: "Asia/Tashkent",
            }),
        });

        res.redirect("/kurslar");
    } catch (err) {
        res.redirect("/kurslar");
    }
});


app.post("/", async (req, res, nexts) => {
    try {
        const books = ["Ingliz - O'zbek", "Ingliz - Rus", "Rus - O'zbek"];
        const { tab, title, content } = req.body;

        await Note.create({
            name: title,
            phone: content,
            book: books[tab],
            date: new Date().toLocaleString("en-UZ", {
                timeZone: "Asia/Tashkent",
            }),
        });

        res.redirect("/");
    } catch (err) {
        res.redirect("/");
    }
});

app.get("/user", async (req, res) => {
    let note = await Note.find();
    res.json(note);
});

//added for login

//added for login
// app.use(passport.initialize());
// app.use(passport.session());

app.get("/admin", (req, res) => {
    res.render("index.ejs", { name: req.user.name });
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
});

//----//

app.listen(4000, function () {
    console.log("server is running on 4000");
});
