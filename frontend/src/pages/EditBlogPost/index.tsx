import React, { useState, useEffect } from "react";

import { useRouteMatch } from "react-router-dom";
import { ViewData } from "../../types/View";

import { TextField, Typography, Grid, Button, Box } from "@material-ui/core";

import { useHistory } from "react-router-dom";

import { Formik, FormikHelpers } from "formik";

import * as Yup from "yup";
import { CreateResultBody } from "../../types/Create";
import { Link } from 'react-router-dom'

interface FormData {
  title: string;
  content: string;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  content: Yup.string().required("Required"),
});

function EditBlogPost() {
  const history = useHistory();

  const match = useRouteMatch<{ id: string }>("/edit/:id");

  const postId = match?.params.id;

  const [data, setData] = useState<ViewData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (postId !== undefined) {
      setLoading(true);
      fetch(`/blog/${postId}`)
        .then((data) => data.json())
        .then((data: ViewData) => {
          setData(data);
          setLoading(false);
        });
    }
  }, [postId]);

  if (loading || !data) {
    return <Box m={2}>LOADING...</Box>;
  }

  const handleSubmit = (values: FormData, formikHelpers: FormikHelpers<any>) => {
    formikHelpers.setSubmitting(true);

    fetch(`/blog/${postId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: values.title,
        content: values.content,
      }),
    })
      .then((respone) => {
        if(respone.ok) {
          return respone.json();
        } else {
          return Promise.reject('error 404')
        }
      })
      .then((data: CreateResultBody) => {
        formikHelpers.setSubmitting(false);
        history.push(`/view/${data.id}`);
      }).catch((error) => { 
        formikHelpers.setSubmitting(false);
        console.log(error)}
      ) ;
  };

  return (
    <Box m={3}>
      <Formik
        initialValues={data}
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
          setFieldTouched,
        }) => (
          <form onSubmit={handleFormikSubmit}>
            <Typography variant="h5" gutterBottom>
              Edit blog post
            </Typography>
            <Grid container spacing={3} direction="column">
              <Grid item sm={12}>
                <TextField
                  name="title"
                  label="Title"
                  onChange={handleChange}
                  onInput={e => {
                    setFieldTouched("title", true, true)
                    handleChange(e);
                  }}
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
                  onInput={e => {
                    setFieldTouched("content", true, true)
                    handleChange(e);
                  }}
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
                    disabled={isSubmitting || !isValid || touched.content ? !touched.content : true || touched.title ? !touched.title : true}
                  >
                    Update
                  </Button>
                  {" "}
                  <Button 
                    variant="contained"
                    color="primary"        
                    component={Link} 
                    to={`/view/${postId}`}
                  >
                    Cancel
                  </Button>
                </Grid>

            </Grid>
          </form>
        )}
      </Formik>
    </Box>
  );
}

export default EditBlogPost;
