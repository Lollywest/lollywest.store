# [Lollywest]

> **Warning**
> This project is still in development and is not ready for production use.
>
> It uses new technologies (server actions, drizzle ORM) which are subject to change and may break your application.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **User Management:** [Clerk](https://clerk.com)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com)
- **Email:** [React Email](https://react.email)
- **Content Management:** [Contentlayer](https://www.contentlayer.dev)
- **File Uploads:** [uploadthing](https://uploadthing.com)
- **Payments infrastructure:** [Stripe](https://stripe.com)

## Features to be implemented

- [x] Authentication with **Clerk**
- [x] File uploads with **uploadthing**
- [x] Newsletter subscription with **React Email** and **Resend**
- [x] Blog using **MDX** and **Contentlayer**
- [x] ORM using **Drizzle ORM**
- [x] Database on **PlanetScale**
- [x] Validation with **Zod**
- [x] Storefront with products, categories, and subcategories
- [x] Seller and customer workflows
- [x] User subscriptions with **Stripe**
- [ ] Checkout with **Stripe Checkout**
- [ ] Admin dashboard with stores, products, orders, subscriptions, and payments

## Installation Prerequisites

1. Install Nodejs
   <https://nodejs.org/en/download>
2. Install pnpm

```bash
npm install -g pnpm
```

## Running Locally

1. Clone the repository

```bash
git clone https://github.com/Lollywest/lollywest.store.git
```

2. Install dependencies using pnpm

```bash
pnpm install
```

3. Copy the `.env.example` to `.env` and update the variables.

```bash
cp .env.example .env
```

4. Start the development server

```bash
pnpm run dev
```

5. Push the database schema

```bash
pnpm run db:push
```

6. Start the Stripe webhook listener (optional, needs stripe configuration)

```bash
pnpm run stripe:listen
```

## Making Changes

1. When you start working on a new feature, create a new branch.

```bash
git checkout -b new-branch-name
```

2. On that branch, make changes and commit as normal.

```bash
git add .
```

```bash
git commit -m "I changed x"
```

3. Once you're ready to make a pull request, use git push and set remote as upstream

```bash
git push
```

```bash
git push --set-upstream origin new-branch-name
```
