// adapted from https://overreacted.io/making-setinterval-declarative-with-react-hooks/ by Dan Abramov
import { useEffect, useRef } from 'react';

// from https://stackoverflow.com/a/39914235
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// This component will repeatedly call your callback while delay is non-null.
// Call the provided isCancelled to know when the effect has expired (use this to avoid setting out-of-date state after a slow fetch)
// Pass delay=null to avoid polling at all (for example, if you only want to poll until something is finished, ensure the hook gets called with delay=null once it has finished.)
// Pass delay=0 to start the next call as soon as the previous one finishes
// If you need to handle errors, do it inside your callback.
const usePoll = (callback, delay, dependencies) => {
  // use a ref because we don't want to cancel and restart the while loop every time the callback changes (every render)
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    let cancelled = false;
    async function fun() {
      while (!cancelled && delay !== null && savedCallback.current) {
        // the most important line: this is where we call the callback, providing a function to determine if the current effect has been cleaned up (expired / cancelled)
        await savedCallback.current(() => cancelled);
        await sleep(delay);
      }
    }
    fun();
    return function cleanup() {
      cancelled = true;
    };
  }, [delay, ...(dependencies || [])]);
};

export default usePoll;
