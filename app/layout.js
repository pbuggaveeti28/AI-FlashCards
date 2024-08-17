// app/layout.js
import { ClerkProvider, RedirectToSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation'; // Adjusted import for navigation
import React from 'react';

// Ensure to replace these with your actual Clerk configuration
const clerkFrontendApi = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API;
const clerkApiKey = process.env.CLERK_API_KEY;

export default function RootLayout({ children }) {
  const router = useRouter();

  // Optional: Redirect to sign-in page if user is not authenticated
  // Server Components don't have access to useRouter; authentication logic should be implemented differently.
  const redirectToSignIn = router.pathname !== '/sign-in';

  return (
    <ClerkProvider
      frontendApi={clerkFrontendApi}
      apiKey={clerkApiKey}
    >
      {redirectToSignIn ? <RedirectToSignIn /> : <>{children}</>}
    </ClerkProvider>
  );
}
