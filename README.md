# Lollywest

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
