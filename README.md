# dce-reactkit
A collections of simple tools and UI elements for quickly and easily building React-based apps.

## Quickstart

1. Install `dce-reactkit` into your React project:

```bash
npm install dce-reactkit --save
```

2. Import `dce-reactkit` components into your React component:

```js
import { LoadingSpinner } from 'dce-reactkit';
```

## Cross-server Requests

If your server will be _accepting_ cross-server requests, include a `REACTKIT_CRED_ENCODING_SALT` environment variable with secure, secret text.

To generate new encoded secrets, use `npm run gen-reactkit-cross-server-secret`. You'll need to put credentials into a collection. Create that collection in your `mongo.ts` file:

```ts
// Import dce-reactkit
import { initCrossServerCredentialCollection, CrossServerCredential } from 'dce-reactkit';

...

// Cross-server Credentials
export const crossServerCredentialCollection = initCrossServerCredentialCollection(Collection) as Collection<CrossServerCredential>;
```

In that collection, manually insert into the database individual credentials, one for each service. You'll need to add a description, list of allowed scopes, and you'll need to come up with a public key.

If your server will be _sending_ cross-server requests, after creating a secret and key using the process above, in the server that will be _sending_ the cross-server requests, add the credential to the environment as `REACTKIT_CROSS_SERVER_KEY` and `REACTKIT_CROSS_SERVER_SECRET`.
