# BookNook

A small neighbourhood library on the web. Add a book, borrow a book, return a book.

Live site: https://booknook.shahriyar.dev

## Features

- Browse every book on the shelf, search by title or author and filter by category
- Add your own books with a cover uploaded to imgbb, then edit or delete them from My Books
- Borrow any available book for seven days and return it with one tap from My Borrows
- Copies go up and down with every borrow and return, so a book with no copy left cannot be borrowed
- Email and Google login with BetterAuth, and JWT protected routes on the Express API

## Tech

Next.js 16 App Router, TypeScript, Tailwind v4 with shadcn, BetterAuth with the MongoDB adapter, Express and MongoDB on the server side.

## Run it

```bash
npm install
npm run dev
```

`.env.local` needs `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_API_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` and `NEXT_PUBLIC_IMGBB_KEY`.

Server repository: https://github.com/msshahriar18/booknook-server
