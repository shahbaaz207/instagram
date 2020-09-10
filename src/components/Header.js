import React, { useState, useEffect } from "react";
// import HomeIcon from "@material-ui/icons/Home";
// import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import SignUp from "./SignUp";
import { auth } from "../firebase";
import SignIn from "./SignIn";
import ImageUpload from "./ImageUpload";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 350,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Header() {
  const [user, setUser] = useState(false);
  const [username] = useState("");
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [openPost, setOpenPost] = useState(false);

  const [openSignIn, setOpenSignIn] = useState(false);

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in..
        setUser(authUser);
        console.log(user.displayName);
      } else {
        // user has logged out
        setUser(null);
      }
    });
    return () => {
      // perform some cleanup action
      unSubscribe();
    };
  }, [username, user]);

  return (
    <div className="app__header">
      {/* signUp modal  */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <SignUp />
        </div>
      </Modal>

      {/* signiN modal */}
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <SignIn />
        </div>
      </Modal>

      <Modal open={openPost} onClose={() => setOpenPost(false)}>
        <div style={modalStyle} className={classes.paper}>
          {user?.displayName ? (
            <ImageUpload username={user.displayName} />
          ) : (
            <h3>Sorry you need to logged In</h3>
          )}
        </div>
      </Modal>

      {/* Main list Item */}
      <div className="logo">
        <h2>Instagram</h2>
      </div>
      <div className="add_post">
      
          <AddCircleIcon
            style={{ fontSize: 35 }}
            className="add_post"
            onClick={() => setOpenPost(true)}
          />
       
      </div>
      <div className="right">
        {user ? (
          <div className="corner">
            {/* <button>{user.displayName}</button> */}
            <button onClick={() => auth.signOut()}>Logout</button>
          </div>
        ) : (
          <div className="app_loginContainer">
            <button onClick={() => setOpenSignIn(true)}>Login</button>
            <button onClick={() => setOpen(true)}>Register</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
