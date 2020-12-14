const express = require("express");
const app = express();
var Post = require("./models/post");
var User = require("./models/user");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/relation-demo-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

Post.create(
  {
    title: "new post here 4 !!!",
    content: "here we are ",
  },
  (err, post) => {
    User.findOne({ email: "rahul@gmail.com" }, (err, foundUser) => {
      if (err) {
        console.log(err);
      } else {
        foundUser.posts.push(post);
        foundUser.save((err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
          }
        });
      }
    });
  }
);

// User.create({
//   email: "rahul@gmail.com",
//   name:  "rahul",
// });

User.findOne({ email: "rahul@gmail.com" })
  .populate("posts")
  .exec((err, user) => {
    if (err) {
      console.log();
    } else {
      console.log(user);
    }
  });

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(3000, () => console.log(" app listening on port 3000"));
