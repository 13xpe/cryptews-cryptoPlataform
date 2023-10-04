const express = require('express');

//express app initialization

const app = express();

app.set("view engine", "ejs");
app.set('views', 'Visuals');

app.get("/", (req, res) => {
    //res.sendFile('./Visuals/index.html' , {root: __dirname});
    const blogs = [
        {title: "Blog 1", snippet: "Lorem ipsum dolor sit amet consecteteur"},
        {title: "Blog 2", snippet: "Lorem ipsum dolor sit amet consecteteur"},
        {title: "Blog 3", snippet: "Lorem ipsum dolor sit amet consecteteur"},
    ];

    res.render("index", {title : "Homepage", blogs })
});

app.get("/index", (req, res) => {
    //console.log(__dirname);
    //res.sendFile('./Visuals/about.html' , {root: __dirname});
    res.redirect("/")
});

app.get("/news", (req, res) => {
    //console.log(__dirname);
    //res.sendFile('./Visuals/about.html' , {root: __dirname});
    res.render('news');
});

app.get("/prices", (req, res) => {
    //console.log(__dirname);
    //res.sendFile('./Visuals/about.html' , {root: __dirname});
    res.render('prices');
});

app.get("/converter", (req, res) => {
    //console.log(__dirname);
    //res.sendFile('./Visuals/about.html' , {root: __dirname});
    res.render('converter');
});

app.use((req, res) => {
    res.status(404).render("404");
});

app.listen(3000, () => {
    console.log("Server is listening at 3000")
});