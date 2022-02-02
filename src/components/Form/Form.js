import React, { useState, useEffect } from "react";

// @mui
import { createStyles, makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Paper, Typography, TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

// react-file-base64
import FileBase from "react-file-base64";
import { createPost, updatePost } from "../../actions/posts";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: "4px",
      },
    },
    paper: {
      padding: "8px",
    },
    form: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    fileInput: {
      width: "97%",
      margin: "10px 0",
    },
    buttonSubmit: {
      marginBottom: 10,
    },
  })
);

const theme = createTheme();

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const post = useSelector((state) =>
    currentId ? state.posts.find((message) => message._id === currentId) : null
  );
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: currentUser?.result?.name }));
      clear();
    } else {
      dispatch(
        updatePost(currentId, { ...postData, name: currentUser?.result?.name })
      );
      clear();
    }
  };

  if (!currentUser?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper className={classes.paper}>
        <form
          autoComplete="off"
          noValidate
          className={`${classes.root} ${classes.form}`}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6" style={{ marginBottom: "10px" }}>
            {currentId ? `Editing "${post.title}"` : "Creating a Memory"}
          </Typography>
          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            size="small"
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
          <TextField
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            size="small"
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          />
          <TextField
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            size="small"
            value={postData.tags}
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(",") })
            }
          />
          <div className={classes.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </div>
          <Button
            className={classes.buttonSubmit}
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
          >
            Submit
          </Button>
          <Button
            className={classes.buttonSubmit}
            color="warning"
            variant="contained"
            size="small"
            fullWidth
            onClick={clear}
          >
            Clear
          </Button>
        </form>
      </Paper>
    </ThemeProvider>
  );
};

export default Form;
