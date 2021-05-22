import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    // console.log('post',postMessages);
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  // console.log('post1',post);
  const newPost = new PostMessage(post);
  try {
    // console.log('post3',newPost);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error});
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  // console.log(req.params);
  const post = req.body;
  // console.log(req.body);

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("no post with that id");
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    { new: true }
  );

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id: id } = req.params;
  // console.log(req.params.id);
  const post = req.body;
  // console.log(post);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("no post with that id");
  }

  await PostMessage.findByIdAndRemove(id);
  res.json({ message: "post deleted" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("no post with that id");
  }

  const post = await PostMessage.findById(id);
  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { likeCount: post.likeCount + 1 },
    { new: true }
  );
  res.json(updatedPost);
};
