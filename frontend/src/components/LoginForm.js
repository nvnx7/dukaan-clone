import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  CssBaseline,
  Container,
  Avatar,
  Typography,
  Grid,
  Button,
  Link,
} from "@material-ui/core";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import { Link as RouterLink } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const validationSchema = yup.object({
  phone: yup
    .number("Enter phone number")
    .typeError("Invalid phone!")
    .required("Phone is required!")
    .positive("Invalid phone!")
    .integer("Invalid phone!")
    .test(
      "minLength",
      "Too short!",
      (val) => val && val.toString().length >= 6
    ),
  password: yup.string().required("Password is required!"),
});

export default function LoginForm({ loading, onLogin }) {
  const classes = useStyles();
  const onSubmit = (values) => {
    onLogin(values);
  };

  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleRoundedIcon />
        </Avatar>
        <Typography variant="h6">LOGIN</Typography>

        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="phone"
            name="phone"
            label="Phone"
            type="tel"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            className={classes.submit}
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            disabled={loading}
          >
            Login
          </Button>

          <Grid container justify="flex-end" spacing={2}>
            <Grid item>{"Don't have an account?"}</Grid>
            <Grid item>
              <Link component={RouterLink} to="/signup">
                Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
