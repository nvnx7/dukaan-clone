import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  CssBaseline,
  Container,
  Grid,
  Button,
} from "@material-ui/core";

import { useFormik } from "formik";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  actionBtn: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const validationSchema = yup.object({
  firstName: yup.string().required("Required!").min(1),
  lastName: yup.string().required("Required!").min(1),
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
  deliveryAddress: yup.string().required().min(1),
});

export default function Customer({ loading, onSave, onCancel }) {
  const classes = useStyles();

  const onSubmit = (values) => {
    onSave(values);
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      deliveryAddress: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="firstName"
              variant="outlined"
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
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
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              multiline
              fullWidth
              rows={8}
              id="deliveryAddress"
              name="deliveryAddress"
              label="Delivery Address"
              value={formik.values.deliveryAddress}
              onChange={formik.handleChange}
              error={
                formik.touched.deliveryAddress &&
                Boolean(formik.errors.deliveryAddress)
              }
              helperText={
                formik.touched.deliveryAddress && formik.errors.deliveryAddress
              }
            />
          </Grid>

          <Grid item xs={4}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.actionBtn}
              disabled={loading}
            >
              Confirm
            </Button>
          </Grid>

          <Grid item xs={4}>
            <Button
              fullWidth
              color="primary"
              className={classes.actionBtn}
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
