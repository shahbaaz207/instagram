import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Post from "./components/Post";
import { useState } from "react";
import { db } from "./firebase";
import { BrowserRouter, Route } from "react-router-dom";
import { auth } from "./firebase";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(false);
  const [username] = useState("");

  useEffect(() => {
    // this is where the code run
    const unSubscribe = db
      .collection("posts")
      .orderBy("timeStamp", "desc")
      .onSnapshot((snapshot) => {
        // every time a new post is added ,this code firebase
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
    return () => unSubscribe();
  }, []);

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
    <div className="App">
      <BrowserRouter>
        <Header />
        {user?.displayName ? (
          <Route exact path="/">
            <div className="app_posts">
              {posts.map(({ post, id }) => (
                <Post
                  username={post.username}
                  caption={post.caption}
                  imageUrl={post.imageUrl}
                  key={id}
                  postId={id}
                  user={user}
                />
              ))}
            </div>
          </Route>
        ) : (
          <div style={{ margin: "5rem", textAlign: "center" }}>
            <h2>First you must to Logged In Here!!!</h2>
          </div>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
