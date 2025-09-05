"use client";

import { authClient } from "~/lib/auth-client";
import { Button } from "../ui/button";

export default function Upgrade() {
  const upgrade = async () => {
    await authClient.checkout({
      products: [
        "1e113f4b-5e68-466e-81d9-8fc69f19063d",
        "20950d11-0e8a-4d8c-8359-397da0435cbc",
        "e3281224-513b-4aa4-9b37-339c4fd33dff",
        
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
