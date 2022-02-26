import React, { useState, useEffect } from "react";

import { Link, useHistory } from "react-router-dom";

import { Typography, Box, Button } from "@material-ui/core";

import { formatDistanceToNow } from "date-fns";

import { PostList } from "../../types/List";


function BlogPostList() {
  const history = useHistory();

  const [posts, setPosts] = useState<PostList | null>(null);
  const [loading, setLoading] = useState(false);

  let search = window.location.search;
  let params = new URLSearchParams(search);
  let queryOffset: number = params.get('offset') !== null ? Number(params.get('offset')) : 0;
  let queryLimit: number = params.get('limit') !== null ? Number(params.get('limit')) :  0;

  useEffect(() => {
    let query: string = '';
    if (queryOffset) {
      query = `offset=${queryOffset}`;
    }
    if (queryLimit) {
      if (query.length) {
        query += `&limit=${queryLimit}`;
      } else {
        query = `limit=${queryLimit}`;
      }
    }

    setLoading(true);
    fetch( query.length ?  `/blog?` + query : `/blog`)
      .then((data) => data.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  if (loading || !posts) {
    return <Box m={2}>LOADING...</Box>;
  }

  if (!posts.length && queryOffset === 0) {
    return (
      <Box m={2}>
        NO POSTS FOUND, <Link to="/create">CREATE A NEW POST</Link>
      </Box>
    );
  }

  const myStyle= {minHeight: '300px'};

  const getQuery = (): string => {
    let query: string = '';
    if (queryOffset) {
      query = `offset=${queryOffset}`;
    }
    if (queryLimit) {
      if (query.length) {
        query += `&limit=${queryLimit}`;
      } else {
        query = `limit=${queryLimit}`;
      }
    }
    return query;
  }


  const goToPreviousPage = () => {
    history.push({
      pathname: '/',
      search: '?offset=' + (queryOffset -1)
    })

    queryOffset--;
    const query = getQuery();
  
    setLoading(true);
    fetch( query.length ?  `/blog?` + query : `/blog`)
      .then((data) => data.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });    
  }

  const goToNextPage = () => {
    history.push({
      pathname: '/',
      search: '?offset=' + (queryOffset +1)
    })

    queryOffset++;
    const query = getQuery();
  
    setLoading(true);
    fetch( query.length ?  `/blog?` + query : `/blog`)
      .then((data) => data.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }

  return (
    <Box m={2}>
      <Box style={myStyle} >
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

      <Box> 
        <Button 
          variant="contained"
          color="primary"        
          onClick={goToPreviousPage}
          disabled={queryOffset-1 < 0 ? true : false}
        >
          previous
        </Button>        
        {" "}
        <Button 
          variant="contained"
          color="primary"        
          onClick={goToNextPage}
          disabled={posts.length < 5 ? true : false}
        >
          next
        </Button>        
      </Box>
    </Box>
  );
}

export default BlogPostList;
