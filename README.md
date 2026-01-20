# Deno URL Shortener

A URL shortener service built with Deno and Oak framework.

## Features

- Create short URLs
- Redirect to original URLs
- Track click counts
- List all URLs
- Delete URLs

## Installation

```bash
deno task start
```

## API Endpoints

- POST /api/shorten - Create short URL
- GET /api/urls - List all URLs
- GET /api/urls/:id - Get URL details
- GET /:id - Redirect to original URL
- DELETE /api/urls/:id - Delete URL
