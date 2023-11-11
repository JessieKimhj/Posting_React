import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import {
  findUserById,
  IDecodedUser,
  verifyUser,
  parseToken,
  addPost,
  posts,
  sleep,
} from "./fakedb";

const port = 8085;
const app = express();
app.use(cors());
app.use(express.json());
jwt.decode // need to imporve

app.post("/api/user/login", (req, res) => {
  try {
    const { email, password } = req.body;
    const user = verifyUser(email, password);
    const token = jwt.sign({ id: user.id }, "secrethyunjinjessie58939652", {
      expiresIn: "2 days",
    });
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.post("/api/user/validation", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    const decodedUser = jwt.verify(token, "secrethyunjinjessie58939652");
    const user = findUserById((decodedUser as IDecodedUser).id);
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.get("/api/posts", async (req, res) => {
  const token = req.headers["Authorization"];
  sleep(5000);
  // Sleep delay goes here
  res.json(posts);
});

app.get("/api/posts/:id", (req, res) => {
  const id = Number(req.params.id);
  const userName = findUserById(id).email.split('@')[0];
  const findedPost = posts.find((findPost) => findPost.id === id);

  if (findedPost) {
    const post = {
      ...findedPost,
      userName: userName}
      console.log("::::idpage", post)
    res.json(post);
    // console.log("::::idpage", post)
  } else {
    res.status(404).json({ error: "Post not found" });
  }
});
/**
 * Problems with this:
 * (1) Authorization Issues:
 *     What if you make a request to this route WITHOUT a token?
 *     What if you make a request to this route WITH a token but
 *     it's invalid/expired?
 * (2) Server-Side Validation Issues:
 *     What if you make a request to this route with a valid token but
 *     with an empty/incorrect payload (post)
 */
app.post("/api/posts", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    const incomingPost = req.body;
    console.log("2323")

    addPost(incomingPost, token);
    console.log("11111")
    console.log("11343333111")

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.post("/api/posts/update", (req, res) => {
  const incomingPost = req.body;
  const id = incomingPost.id
  const foundPost = posts.find((findPost) => findPost.id === id);
  
  //will not work when foundPost is undefined
  if (foundPost && foundPost.id == incomingPost.id) {
      foundPost.title = incomingPost.title; 
      foundPost.category = incomingPost.category; 
      foundPost.image = incomingPost.image; 
      foundPost.content = incomingPost.content; 

    const index = posts.findIndex((post) => post.id === foundPost?.id);
    if (index !== -1) {
      posts[index] = foundPost;
    }
    console.log("updated post123L",posts)
    res.json(posts);
  } else {
    res.status(404).json({ error: "Post not found" });
  }
});


app.listen(port, () => console.log("Server is running"));
