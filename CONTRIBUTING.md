# Contributing

To contribute to this project, please follow these steps:

## Fork the repository

Fork the repository and clone it to your local machine.

## Add a `.env` file

In the root of the project, create a .env file with the following variables:

```env
PORT=3000
DATABASE_CLIENT=sqlite
PUBLIC_URL=http://localhost:3000
DATABASE_FILENAME=.db/data.sqlite3
TOKEN_SECRET=your-secret-key
```

## Install dependencies

> Node.js `>= v18 and <= v22` is required.

```bash
npm install
```

## Run the development environment

```bash
npm run dev
```

## Run tests

> Before running the tests, make sure to add the following additional variables to your .env file:
>
> ```env AWS_BUCKET=your-aws-bucket
> AWS_REGION=your-aws-region
> AWS_ACCESS_KEY_ID=your-aws-access-key-id
> AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
>
> DIGITALOCEAN_BUCKET=your-digitalocean-bucket
> DIGITALOCEAN_REGION=your-digitalocean-region
> DIGITALOCEAN_ACCESS_KEY_ID=your-digitalocean-access-key-id
> DIGITALOCEAN_SECRET_ACCESS_KEY=your-digitalocean-secret-access-key
> DIGITALOCEAN_ENDPOINT=your-digitalocean-endpoint
> ```

Then, ensure that all tests pass by running:

```bash
npm run test
```

## Build the project

Once all tests have passed, build the project using:

```bash
npm run build
```

## Make changes and create a pull request

Commit your changes and create a pull request. Ensure your changes are consistent with the project's coding style and properly documented in the commit message.

---

### Additional Information:

- 💅 **Coding Style**: Follow the project's coding standards (e.g., formatting, naming conventions).
- ✅ **Testing**: Make sure all tests pass before submitting your pull request. If adding new functionality, provide adequate test coverage.

---

### ❤️ We'd love your help!

This project is just getting started, and your contributions can make a real impact! Whether it's fixing bugs, adding new features, or improving the documentation, every contribution is valuable. Join us in making this project better, and let's build something great together!
