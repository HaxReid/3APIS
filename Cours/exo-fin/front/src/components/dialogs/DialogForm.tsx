import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import { useState, ChangeEvent } from "react";
import { NewPost } from "../../../../types";
import { postPost } from "../../utils/api";

const emptyPost: NewPost = {
  title: "",
  description: "",
  date: new Date(),
  img: "",
  author: "",
  likes: 0,
};

export default function DialogForm() {
  const [open, setOpen] = useState(false);
  const [postFormValue, setPostFormValue] = useState<NewPost>(emptyPost);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPostFormValue(emptyPost);
  };
  const handleSend = () => {
    postPost(postFormValue).then(() => {
      setPostFormValue(emptyPost);
      handleClose();
    });
  };
  const setFormValue = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name } = e.target;
    setPostFormValue((old) => ({ ...old, [name]: e.target.value }));
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Ajouter un post
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Ajouter un post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Titre"
            type="text"
            fullWidth
            variant="standard"
            value={postFormValue.title}
            onChange={setFormValue}
          />
          <TextField
            autoFocus
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={postFormValue.description}
            onChange={setFormValue}
          />
          <TextField
            autoFocus
            margin="dense"
            name="img"
            label="Lien image"
            type="text"
            fullWidth
            variant="standard"
            value={postFormValue.img}
            onChange={setFormValue}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleSend} autoFocus>
            Envoyer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
