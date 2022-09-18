const Post = require("../models/postModel");
exports.getAllPosts = async (req,res,next) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      status: "success",
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
};

exports.getOnePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({id:req.params.id});
    console.log(post);
    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
    });
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const posts = await Post.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        posts,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
    });
  }
};

exports.updatePost = async (req, res, next) => {
    console.log(req.params.id);
    try {
      const posts = await Post.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidator:true
      });
      console.log(posts);
      res.status(200).json({
        status: "success",
        data: {
          posts,
        },
      });
    } catch (error) {
        console.log(error);
      res.status(400).json({
        status: "fail",
      });
    }
  };

  exports.deletePost = async (req, res, next) => {
    try {
      const posts = await Post.findByIdAndDelete(req.params.id);
      res.status(200).json({
        status: "success",
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
      });
    }
  };
  