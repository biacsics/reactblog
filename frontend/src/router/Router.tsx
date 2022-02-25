import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navigation from "../components/Navigation";

import BlogPostList from "../pages/BlogPostList";
import CreateBlogPost from "../pages/CreateBlogPost";
import ViewBlogPost from "../pages/ViewBlogPost";

function Router() {
  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route path="/" exact>
          <BlogPostList />
        </Route>

        <Route path="/view/:id" exact>
          <ViewBlogPost />
        </Route>
        <Route path="/create" exact>
          <CreateBlogPost />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
