import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "~/server/db";
import { Polar } from "@polar-sh/sdk";
import { env } from "~/env";
import {
  polar,
  checkout,
  portal,
  usage,
  webhooks,
} from "@polar-sh/better-auth";

const polarClient = new Polar({
  accessToken: env.POLAR_ACCESS_TOKEN,
  server: "sandbox",
});

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: "70aa28f3-06db-42d5-a178-8092f87d1572",
              slug: "small",
            },
            {
              productId: "e56ca45b-bbd2-45b2-a335-8701d7fedaa7",
              slug: "medium",
            },
            {
              productId: "0899e19e-5ad9-4600-b116-00f06d9003fc",
              slug: "large",
            },
          ],
          successUrl: "https://bfc8d0094498.ngrok-free.app",
          authenticatedUsersOnly: true,
        }),
        portal(),
        webhooks({
          secret: env.POLAR_WEBHOOK_SECRET,
          onOrderPaid: async (order) => {
            const externalCustomerId = order.data.customer.externalId;

            if (!externalCustomerId) {
              console.error("No external customer ID found.");
              throw new Error("No external customer id found.");
            }

            const productId = order.data.productId;

            let creditsToAdd = 0;

            switch (productId) {
              case "70aa28f3-06db-42d5-a178-8092f87d1572":
                creditsToAdd = 10;
                break;
              case "e56ca45b-bbd2-45b2-a335-8701d7fedaa7":
                creditsToAdd = 25;
                break;
              case "0899e19e-5ad9-4600-b116-00f06d9003fc":
                creditsToAdd = 50;
                break;
            }

            await db.user.update({
              where: { id: externalCustomerId },
              data: {
                credits: {
                  increment: creditsToAdd,
                },
              },
            });
          },
        }),
      ],
    }),
  ],
});
