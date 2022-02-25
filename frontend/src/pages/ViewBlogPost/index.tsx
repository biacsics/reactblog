import React, { useState, useEffect } from "react";

import { useRouteMatch } from "react-router-dom";
import { ViewData } from "../../types/View";
import { Typography, Box, Button } from "@material-ui/core";

import { formatDistanceToNow } from "date-fns";

import { Link } from 'react-router-dom'

function ViewBlogPost() {
  const match = useRouteMatch<{ id: string }>("/view/:id");

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

  const formattedDate = formatDistanceToNow(new Date(data.publishedAt), {
    addSuffix: true,
  });
  const formattedModDate = formatDistanceToNow(new Date(data.modifiedAt), {
    addSuffix: true,
  });

  let modified: boolean = data.publishedAt !== data.modifiedAt;

  return (
    <Box m={2}>
      <Typography variant="h5" gutterBottom>
       <span style={ modified ? { color: 'rgb(150,100,0)'} : {}}>{data.title} </span>  
        <Typography component="span" style={ modified ? { display: 'none'} : {}}> created {formattedDate}</Typography>
        <Typography component="span" style={ !modified ? { display: 'none'} : {}}> modified {formattedModDate}</Typography>
      </Typography>
      <Typography variant="body1">{data.content}</Typography>
      <Button 
        variant="contained"
        color="primary"        
        component={Link} 
        to={`/edit/${postId}`}
      >
        edit
      </Button>
      {" "}
      <Button 
        variant="contained"
        color="primary"        
        component={Link} 
        to={`/`}
      >
        back to list
      </Button>

    </Box>
  );
}

export default ViewBlogPost;
