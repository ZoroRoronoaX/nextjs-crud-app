This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Steps to setup project

1. Install postgresql on your local computer.
2. Run your postgresql and create a user with a password and a database. The user must have the highest privilege to create database and also all the privilege to the database. 
3. Create a .env file and add this DATABASE_URL="postgresql://{{username}}:{{password}}@localhost:5432/{{database name}}?schema=public"
4. npm install 
5. After that run 'npx prisma generate' and then 'npx prisma migrate dev --name init'. 

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```