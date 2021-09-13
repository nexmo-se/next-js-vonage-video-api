# Vonage Video API with NextJS

This is an example on how to integrate [Vonage Video API](https://www.vonage.com/communications-apis/video/) on a [NextJS](https://nextjs.org/) Project.

## Technology Stack

1. [NextJS](https://nextjs.org/)
2. [Vonage Video API](https://www.vonage.com/communications-apis/video/) with Javascript SDK

## How to run it

1. Clone the repo
2. Fill the credentials (apikey, sessionId and token) on the `components/Opentok.js` file
3. Run `npm install` and `npm run dev` to run locally the project

## Explanation

The issue that you can encounter while using NextJS (SSR rendering) with [Vonage Video API JS SDK](https://www.npmjs.com/package/@opentok/client) is that the `@opentok/client` uses the `window` object. To import a library that uses the window object, you need to use the dynamic import provided by NextJS as explained here: [https://nextjs.org/docs/advanced-features/dynamic-import
](https://nextjs.org/docs/advanced-features/dynamic-import).

This project imports `@opentok/client` in the `components/Opentok.js` component which implements a very basic Video Chat functionality. Then, the project imports the Opentok component in the `pages/index.js` file: 

```
const OpentokComponent = dynamic(() => import('./../components/Opentok'), {
  ssr: false
});
```


**Happy Hacking!!**