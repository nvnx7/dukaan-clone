import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    display: "flex",
    alignItems: "center",
  },
  input: {
    display: "none",
  },
  errorText: {
    color: theme.palette.error.main,
  },
}));

export default function UploadButton({ name, label, file, error, onChange }) {
  const classes = useStyles();

  const handleOnChange = (e) => {
    const file = e.target.files[0];
    onChange(file);
  };

  let messageComp = null;
  if (error) {
    messageComp = (
      <Typography noWrap className={classes.errorText}>
        {error}
      </Typography>
    );
  } else {
    messageComp = <Typography noWrap>{file ? file.name : label}</Typography>;
  }

  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        type="file"
        onChange={handleOnChange}
        name={name}
      />
      <label htmlFor="contained-button-file">
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<PhotoCameraIcon />}
        >
          Upload
        </Button>
      </label>
      {messageComp}
    </div>
  );
}
