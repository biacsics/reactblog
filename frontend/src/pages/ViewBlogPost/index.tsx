import React, { useState, useEffect } from "react";

import { useRouteMatch } from "react-router-dom";
import { ViewData } from "../../types/View";
import { Typography, Box } from "@material-ui/core";

import { formatDistanceToNow } from "date-fns";

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

  return (
    <Box m={2}>
      <Typography variant="h5" gutterBottom>
        {data.title} <Typography component="span">{formattedDate}</Typography>
      </Typography>
      <Typography variant="body1">{data.content}</Typography>
    </Box>
  );
}

export default ViewBlogPost;
