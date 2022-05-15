## Ajaib Web Engineering Submission

Hello my name is Kevin Reynaldo Laurens, this is my submission for Ajaib Web Engineer Test. You can try it here [Random User Table by Kevin](https://randomuser-table.vercel.app/) or you can try it on local with instruction below.

This Project created with create-next-app with Typescript template. There is some small package that i install for this project like axios, moment, and tailwindcss.
I don't use redux for state management even though i think it's better for better for readability and split the state from the main component itself.

I create a pretty basic simple UI for this project using tailwindcss, there is a lot of UI kit like Material-UI that i generally use but the package is pretty big and there is already built-in function for the datatable which is not good because you guys asked for the table function to be coded from scratch

I use next API route to mask the API endpoint from randomuser.me and use axios to get the data from the API.

For the performance part, i think i already did my best here to not re-fetch the API a lot if i reset my filter function. I always keep the main data state split from the filtered one. If there is any suggestion or improvement i should make please don't hesistate to contact me.

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm install
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
