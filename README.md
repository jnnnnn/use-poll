# @jnnnnn/use-poll-await

A custom React Hook that will repeatedly call a function and await the result.

This hook is forked from an implementation of [Dan Abramov](https://github.com/gaearon)'s blog post
["Making setInterval Declarative with React Hooks"](https://overreacted.io/making-setinterval-declarative-with-react-hooks/).

## Installation

```bash
$ npm i @jnnnnn/use-poll
OR
$ yarn add @jnnnnn/use-poll
```

## Example

Here is a typical usage

```jsx
const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  async function checkStatus(isCancelled) {
    try {
      const currentProgress = await fetch(progress);
      if (!isCancelled()) {
        setProgress(currentProgress);
      }
    } catch {
      setError('Something went wrong');
    }
  }

  const stopPolling = progress === 100 || error;

  usePoll({
    callback: checkStatus,
    delay: stopPolling ? null : 1000, // poll once per second until error or progress=100
  });

  return <>{error ? `An error occurred!` : `Current progress: ${progress}%`}</>;
};
```

### Parameters

Here are the parameters that you can use.

| Parameter      | Description                                                                                                              |
| :------------- | :----------------------------------------------------------------------------------------------------------------------- |
| `callback`     | A function that will be awaited every `delay` milliseconds.                                                              |
| `delay`        | A number representing the delay in msecs. Set to `null` to "pause" polling.                                              |
| `dependencies` | An array of effect dependencies. When one of these changes, the current poll will be cancelled and a new one will start. |
