import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { tap } from "@trpc/server/observable";
import type { AppRouter } from "./server";

async function main() {
  const url = `http://localhost:2022/trpc`;

  const trpc = createTRPCClient<AppRouter>({
    links: [
      () =>
        ({ op, next }) => {
          // console.log("->", op.type, op.path, op.input);

          return next(op).pipe(
            tap({
              next({ result }: any) {
                // console.log("<-", op.type, op.path, op.input, ":", result);
              },
            })
          );
        },
      // loggerLink(),
      httpBatchLink({
        url,
        headers: () => ({
          // authorization: "secret",
        }),
      }),
    ],
  });

  await trpc.paypal.checkout.mutate({
    payee: "sb-ltksd32561458@personal.example.com",
  });
}

void main();
