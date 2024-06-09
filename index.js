const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
const { v4: uuidv4 } = require("uuid");

let posts = [
  {
    id: uuidv4(),
    username: "aditya",
    content: "I love coding & gym!",
  },
  { id: uuidv4(), username: "surangana", content: "I love dancing!" },
  { id: uuidv4(), username: "akash", content: "I love listning music!" },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.post("/posts", (req, res) => {
  const { username, content } = req.body;
  const id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let reqContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = reqContent;
  console.log(post);
  res.redirect("/posts");
  res.send("Patch Working");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

app.listen(port, () => {
  console.log(`Listening to the port: ${port}`);
});
