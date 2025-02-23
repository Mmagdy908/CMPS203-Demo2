import { Request, Response, NextFunction } from "express";
import Post from "./model";
import { filterObject } from "../../common/utils";

export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      status: "success",
      data: { posts },
    });
  } catch (err: any) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) throw new Error("There is no post with this id");

    res.status(200).json({
      status: "success",
      data: { post },
    });
  } catch (err: any) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const postData = filterObject(req.body, "content", "images", "user");

    const post = await Post.create(postData);

    res.status(201).json({
      status: "success",
      data: { post },
    });
  } catch (err: any) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const newData = filterObject(req.body, "content", "images", "user");

    const post = await Post.findByIdAndUpdate(req.params.id, newData, {
      runValidators: true,
      new: true,
    });

    if (!post) throw new Error("This post does not exist");

    res.status(200).json({
      status: "success",
      data: { post },
    });
  } catch (err: any) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) throw new Error("This post does not exist");

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err: any) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
