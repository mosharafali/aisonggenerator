"use client";

import { authClient } from "~/lib/auth-client";
import { Button } from "../ui/button";

export default function Upgrade() {
  const upgrade = async () => {
    await authClient.checkout({
      products: [
        "70aa28f3-06db-42d5-a178-8092f87d1572",
        "e56ca45b-bbd2-45b2-a335-8701d7fedaa7",
        "0899e19e-5ad9-4600-b116-00f06d9003fc",
        
      ],
    });
  };
  return (
    <Button
      variant="outline"
      size="sm"
      className="ml-2 cursor-pointer text-orange-400"
      onClick={upgrade}
    >
      Upgrade
    </Button>
  );
}
