# Alumni Network Portal

## Features

- Authenication
- Admin, add student
- Search for students

## Screencasts

### Authenication

![](https://res.cloudinary.com/dnsmfzkcw/image/upload/v1717265736/intership-1/output_xotvih.gif)

### Add Student,fetch, Search and Modal

![](https://res.cloudinary.com/dnsmfzkcw/image/upload/v1717265733/intership-1/output1_enru3n.gif)

## Documentation

- Shadcn-UI
- Authenication using next-auth
- React hook form and zod for validation
- Vercel Postgres

## Vercel Postgres

### Users table

![](https://res.cloudinary.com/dnsmfzkcw/image/upload/v1717266492/intership-1/Screenshot_20240601_235807_pgqlhv.png)

### Student table

![](https://res.cloudinary.com/dnsmfzkcw/image/upload/v1717266492/intership-1/Screenshot_20240601_235722_coexhk.png)

## Run Locally

Clone the project

```bash
  git clone https://github.com/Punithify/college-alumni-portal
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env.local` file

`NEXTAUTH_URL`

`NEXTAUTH_SECRET`

## API Reference

#### Post Student form

```http
  POST /api/auth/student
```

#### GET Students

```http
  GET /api/auth/student
```
