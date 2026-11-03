# BookNook

A small online library. Add a book, borrow a book, return a book.

Live site: https://booknook.shahriyar.dev

## Features

- See all the books on the shelf, search by title or author and filter by category
- Add your own books with a cover image, then edit or delete them from My Books
- Borrow a book for seven days and return it from My Borrows
- Copies go down when a book is borrowed and up when it comes back, and a book with no copy left cannot be borrowed
- Email and Google login with BetterAuth, and JWT protected API routes

## Tech

Next.js (App Router), TypeScript, Tailwind CSS with shadcn, BetterAuth with the MongoDB adapter, Express and MongoDB on the server.

## Run it

```bash
npm install
npm run dev
```

`.env.local` needs `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_API_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` and `NEXT_PUBLIC_IMGBB_KEY`.

Server repository: https://github.com/msshahriar18/booknook-server
