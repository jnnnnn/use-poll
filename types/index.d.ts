declare module '@jnnnnn/use-poll' {
  /**
   * A custom React Hook that provides a declarative awaited polling mechanism..
   */
  type Callback = (isCancelled: () => boolean) => Promise<void> | void;

  export default function usePoll(args: {
    callback: Callback;
    delay: number | null;
    dependencies?: any[];
  }): void;
}
