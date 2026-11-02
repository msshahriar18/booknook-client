"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const GoogleButton = ({ label }: { label: string }) => {
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <Button variant="outline" type="button" onClick={handleGoogleLogin}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          d="M21.6 12.2c0-.7-.06-1.37-.18-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.74 3-4.3 3-7.3Z"
          fill="#4285F4"
        />
        <path
          d="M12 22c2.7 0 4.96-.9 6.6-2.44l-3.2-2.5c-.9.6-2.05.95-3.4.95-2.6 0-4.8-1.76-5.6-4.12H3.1v2.58A10 10 0 0 0 12 22Z"
          fill="#34A853"
        />
        <path d="M6.4 13.9a6 6 0 0 1 0-3.8V7.52H3.1a10 10 0 0 0 0 8.96l3.3-2.58Z" fill="#FBBC05" />
        <path
          d="M12 5.98c1.47 0 2.79.5 3.83 1.5l2.84-2.84C16.95 2.98 14.7 2 12 2a10 10 0 0 0-8.9 5.52l3.3 2.58C7.2 7.74 9.4 5.98 12 5.98Z"
          fill="#EA4335"
        />
      </svg>
      {label}
    </Button>
  );
};

export default GoogleButton;
