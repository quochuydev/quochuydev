import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { tap } from "@trpc/server/observable";
import type { AppRouter } from "../../backend/src/trpc";

export const trpc = createTRPCClient<AppRouter>({
  links: [
    () =>
      ({ op, next }) => {
        // console.log("->", op.type, op.path, op.input);

        return next(op).pipe(
          tap({
            next(result) {
              // console.log("<-", op.type, op.path, op.input, ":", result);
            },
          })
        );
      },
    httpBatchLink({ url: "http://localhost:3000/trpc" }),
  ],
});
