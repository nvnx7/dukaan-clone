import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  CssBaseline,
  Container,
  Grid,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";

import { useFormik } from "formik";
import * as yup from "yup";

import UploadButton from "./UploadButton";

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

const MAX_FILE_SIZE = 1 * 1024 * 1024;
const SUPPORTED_TYPES = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const validationSchema = yup.object({
  title: yup.string().required("Required!").min(1),
  description: yup.string(),
  price: yup
    .number("Enter price")
    .typeError("Invalid price!")
    .required("Price is required!")
    .positive("Invalid price!"),
  stock: yup
    .number("Enter number of stocks!")
    .typeError("Invalid number of stocks!")
    .required("Stocks is required!")
    .positive("Invalid number of stocks!"),
  unit: yup.string().required("Unit is required!"),
  category: yup.string().required("Unit is required!"),
});

export default function AddProductForm({
  loading,
  onSave,
  onCancel,
  categories,
}) {
  const classes = useStyles();

  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const validateFile = (file) => {
    if (!file) return "Image File Required!";
    if (file && file.size > MAX_FILE_SIZE) return "File Too Large!";
    if (file && !SUPPORTED_TYPES.includes(file.type))
      return "File not supported!";
    return "";
  };

  const handleOnChange = (file) => {
    const error = validateFile(file);
    if (error) {
      setFile(null);
      setFileError(error);
      return;
    }

    setFileError("");
    setFile(file);
  };

  const onSubmit = (values) => {
    const error = validateFile(file);
    if (error) {
      setFile(null);
      setFileError(error);
      return;
    }
    const data = { ...values, image: file };
    onSave(data);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      stock: "",
      unit: "",
      category: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="title"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              multiline
              fullWidth
              rows={8}
              id="description"
              name="description"
              label="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </Grid>

          <Grid item xs={12}>
            <UploadButton
              name="file"
              label="Upload Product Pic"
              onChange={handleOnChange}
              file={file}
              error={fileError}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              id="price"
              name="price"
              label="Price per unit"
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="unit-label">Unit</InputLabel>
              <Select
                variant="outlined"
                margin="normal"
                id="unit"
                name="unit"
                label="Unit"
                labelId="unit-label"
                value={formik.values.unit}
                onChange={formik.handleChange}
                error={formik.touched.unit && Boolean(formik.errors.unit)}
                helperText={formik.touched.unit && formik.errors.unit}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"pc"}>Piece</MenuItem>
                <MenuItem value={"kg"}>kilogram</MenuItem>
                <MenuItem value={"g"}>gram</MenuItem>
                <MenuItem value={"l"}>litre</MenuItem>
                <MenuItem value={"ml"}>millilitre</MenuItem>
                <MenuItem value={"dz"}>dozen</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              id="stock"
              name="stock"
              label="Stock"
              value={formik.values.stock}
              onChange={formik.handleChange}
              error={formik.touched.stock && Boolean(formik.errors.stock)}
              helperText={formik.touched.stock && formik.errors.stock}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                variant="outlined"
                margin="normal"
                id="category"
                name="category"
                label="Category"
                labelId="category-label"
                value={formik.values.category}
                onChange={formik.handleChange}
                error={
                  formik.touched.category && Boolean(formik.errors.category)
                }
                helperText={formik.touched.category && formik.errors.category}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem value={category.id}>{category.title}</MenuItem>
                ))}
              </Select>
            </FormControl>
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
              Save
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
