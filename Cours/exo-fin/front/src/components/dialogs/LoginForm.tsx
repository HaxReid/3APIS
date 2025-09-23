import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import { useState, useRef } from "react";

export default function DialogForm() {
  const [open, setOpen] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleLogin = () => {
    console.log(nameRef.current?.value);
    if (nameRef.current?.value) {
      localStorage.setItem("user", nameRef.current?.value);
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        S'identifier
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
            inputRef={nameRef}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleLogin} autoFocus>
            Envoyer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
