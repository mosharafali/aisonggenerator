"use client";

import { authClient } from "~/lib/auth-client";
import { Button } from "../ui/button";

export default function Upgrade() {
  const { data: session } = authClient.useSession(); // ✅ correct way

  const upgrade = async () => {
    await authClient.checkout({
      products: [
        "651df1a8-0868-42f1-afe6-454da9d6ec5d",
        "90f58a6d-79ad-4b98-b30a-a6178eb30d2d",
        "1e113f4b-5e68-466e-81d9-8fc69f19063d",
        "20950d11-0e8a-4d8c-8359-397da0435cbc",
        "e3281224-513b-4aa4-9b37-339c4fd33dff",
      ],
    });
  };

  // Hide button when not signed in
  if (!session) return null;

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
