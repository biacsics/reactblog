## Introduction

This application is a simple blog engine.

Used technologies (most notable ones):

- NodeJS
- TypeScript
- Express
- ReactJS

You can list all blogs, read one (details view) and create a new blog.

### Prerequisites

- `node`
- `yarn`
- `docker`
- `docker-compose`

Make sure the following ports are not already in use: `3000`, `5555`, `25432`

### Run whole setup

1. Run `docker-compose up` to start the PostgreSQL database.
2. Follow the backend "setup and start" section.
3. Follow the frontend "setup and start" section.

### General information to task solving

- Feel free to install new dependencies if needed
- Do not use the `any` type (except when absolutely necessary)
- Create `git` commits

#### Finishing up

1. Make sure you don't have any uncommitted changes in `git`.
2. Delete the `node_modules` directories in `frontend` and `backend`.
3. Archive the whole directory with `tar czf <archive_name> <dir_name>`. The name of the archive should match the template `YYYY_MM_DD_LASTNAME_FIRSTNAME.tar.gz`.

## backend

### Setup and start

Navigate to the `backend` directory.
Install the dependencies with `yarn install`.

Run the backend with `yarn start`. The API will be available at http://localhost:5555.

### Development

To reload the backend, you have to restart it. In the terminal, enter Ctrl+C, then run `yarn start` again.

### Available Endpoints

- List all posts - GET `/blog`
- Get one post - GET `/blog/:id`
- Create new post - POST `/blog`

## frontend

### Setup and start

Navigate to the `frontend` directory.
Install the dependencies with `yarn install`.

Run the frontend with `yarn start`. The frontend will be available at http://localhost:3000.

## Your tasks

### Blog post editing

Implement blog post editing.

Create a new endpoint PATCH `/blog/:id`.

The following fields should be editable:

- `title`
- `content`

In the frontend, add an edit page. The edit page should show a form, prefilled with the blog post data.
On submit, send a `PATCH` request to `/blog/:id` with the form data.
On success, navigate to `/view/:id`.

Add an edit button to the blog post view page.
This button should lead to the new edit page.

### Add pagination to blog post list

At the moment, all available blog posts will be listed on `/`. For thousands of
blog posts, this is not good.

Implement simple pagination in the blog post list.

Take optional `offset` and `limit` parameters in the API route `GET /blog/`.
When unset, default to `offset = 0` and `limit = 5`.

In the frontend, implement basic pagination behavior. Add **previous** / **next**
buttons to change the current page. **next** increments offset by 1, **previous**
decrements offset by 1.

Show 5 blog posts per page.

Disable the **previous** button when `offset === 0`.
