import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { Typography, Box } from "@material-ui/core";

import { formatDistanceToNow } from "date-fns";

import { PostList } from "../../types/List";

function BlogPostList() {
  const [posts, setPosts] = useState<PostList | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/blog")
      .then((data) => data.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  if (loading || !posts) {
    return <Box m={2}>LOADING...</Box>;
  }

  if (!posts.length) {
    return (
      <Box m={2}>
        NO POSTS FOUND, <Link to="/create">CREATE A NEW POST</Link>
      </Box>
    );
  }

  return (
    <Box m={2}>
      <Typography variant="h6">List of posts</Typography>
      {posts.map((p) => (
        <div key={p.id}>
          <Link to={`/view/${p.id}`}>
            <Typography variant="h6" component="span">
              {p.title}{" "}
            </Typography>
          </Link>
          {
            p.publishedAt === p.modifiedAt ?
              <Typography component="span" variant="subtitle2">
                created {formatDistanceToNow(new Date(p.publishedAt), {
                  addSuffix: true,
                })}
              </Typography>
           :
              <Typography component="span" variant="subtitle2">
                modified {formatDistanceToNow(new Date(p.modifiedAt), {
                  addSuffix: true,
                })}
              </Typography> 
          }
        </div>
      ))}
    </Box>
  );
}

export default BlogPostList;
