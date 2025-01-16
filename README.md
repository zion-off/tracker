# Tracker

Built with Next.js 15/React 19, Firestore, and Redis.

Key optimizations:

- React Server Components
- Next.js `unstable_cache`
- `React.memo`, `useCallback`, and `useMemo`
- Optimistic updates using `useOptimistic`
- Firestore Admin SDK for server side data fetching
- Partial cache layer with Redis
- Colocated Redis and server in AWS `iad1`

Read my blog post about the app's architecture
[here](https://sh.zzzzion.com/blog/tracker).
