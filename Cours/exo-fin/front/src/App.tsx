import { Container, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { getPosts } from "./utils/api";
import { Post as PostType } from "../../types";
import DialogForm from "./components/dialogs/DialogForm";
import Posts from "./components/Posts";
import LoginForm from "./components/dialogs/LoginForm";

const App = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  useEffect(() => {
    getPosts().then((response) => {
      setPosts(() => [...response]);
    });
  }, []);
  return (
    <>
      <Stack
        sx={{ marginBottom: 5 }}
        direction="row"
        spacing={3}
        justifyContent="flex-end"
      >
        <DialogForm />
        <LoginForm />
      </Stack>
      <Container sx={{ width: "100%" }}>
        {posts && posts.length > 0 && <Posts posts={posts} />}
      </Container>
    </>
  );
};

export default App;
