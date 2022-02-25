import React from "react";

import { TextField, Typography, Grid, Button, Box } from "@material-ui/core";

import { useHistory } from "react-router-dom";

import { Formik } from "formik";

import * as Yup from "yup";
import { CreateResultBody } from "../../types/Create";

interface FormData {
  title: string;
  content: string;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  content: Yup.string().required("Required"),
});

const initialValues: FormData = { title: "", content: "" };

function CreateBlogPost() {
  const history = useHistory();

  const handleSubmit = (values: FormData) => {
    fetch("/blog/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: values.title,
        content: values.content,
      }),
    })
      .then((data) => data.json())
      .then((data: CreateResultBody) => {
        history.push(`/view/${data.id}`);
      });
  };

  return (
    <Box m={3}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit: handleFormikSubmit,
          isSubmitting,
          isValid,
          submitForm,
        }) => (
          <form onSubmit={handleFormikSubmit}>
            <Typography variant="h5" gutterBottom>
              Create new blog post
            </Typography>
            <Grid container spacing={3} direction="column">
              <Grid item sm={12}>
                <TextField
                  name="title"
                  label="Title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  required
                  fullWidth
                  variant="outlined"
                  error={!!errors.title && touched.title}
                  helperText={
                    !!errors.title && touched.title ? errors.title : undefined
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  name="content"
                  label="Content"
                  multiline
                  rows={10}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.content}
                  required
                  fullWidth
                  variant="outlined"
                  error={!!errors.content && touched.content}
                  helperText={
                    !!errors.content && touched.content
                      ? errors.content
                      : undefined
                  }
                  placeholder="Write content here..."
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item sm={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={submitForm}
                  disabled={isSubmitting || !isValid}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Box>
  );
}

export default CreateBlogPost;
