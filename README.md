# Global State APIs Comparison

This repo compares two approache for global state management. To simplify the code we are using the new hooks API (https://reactjs.org/docs/hooks-intro.html).

- index.tsx is using the new react-context api.
- index.mobx.tsx is using mobx-react

to run 

```bash
yarn start
```

to switch approaches change the entry file in webpack.config.js

```js
entry: "./src/index.mobx.tsx",
```