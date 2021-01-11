const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas blanditiis magnam eius sed, porro impedit nam molestias quia provident dignissimos quas ipsum. Omnis dolore tenetur quia fugit nesciunt enim in?";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public");

const url =
  "mongodb+srv://admin-akshat:hello123@cluster0.fl9ev.mongodb.net/blogDB";
mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

const postSchema = mongoose.Schema({
  title: String,
  content: String,
});

const Post = mongoose.model("Post", postSchema);
let items = [];

//Get
app.get("/", (req, res) => {
  Post.find({}, (err, foundPosts) => {
    res.render("home", {
      homeStartingContent: homeStartingContent,
      items: foundPosts,
    });
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    contactContent: contactContent,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    aboutContent: aboutContent,
  });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

// // to get name without the mongoose database
// app.get("/posts/:name", (req, res) => {
//   // using lodash module
//   let name = _.lowerCase(req.params.name);
//   items.forEach((item) => {
//     const title = _.lowerCase(item.title);
//     if (title == name) {
//       res.render("post", {
//         title: item.title,
//         paragraph: item.body,
//       });
//     }
//   });
// });

app.get("/:postID", (req, res) => {
  const reqID = req.params.postID;
  Post.findById({ _id: reqID }, (err, foundPost) => {
    res.render("post", {
      title: foundPost.title,
      paragraph: foundPost.content,
    });
  });
});

//Post
app.post("/compose", (req, res) => {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postData,
  });
  post.save((err) => {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
