import axios from "axios";
import { NewPost, Post } from "../../../types";

export const getPosts: () => Promise<Post[]> = async () => {
  const posts = await axios.get<Post[]>("http://localhost:5000/post");
  return posts.data;
};

export const postPost: (newPost: NewPost) => Promise<string> = async (
  newPost
) => {
  const user = localStorage.getItem("user");
  let auth = "";
  if (user) {
    auth = `Basic ${user}`;
  }
  console.log(auth, user);

  const posts = await axios.post<string>(
    "http://localhost:5000/post",
    newPost,
    {
      headers: { Authorization: auth },
    }
  );
  return posts.data;
};

export const patchPost: (
  id: string,
  obj: Partial<NewPost>
) => Promise<Post> = async (id, obj) => {
  const newPost = await axios.patch<Post>(
    `http://localhost:5000/post/${id}`,
    obj
  );
  return newPost.data;
};
