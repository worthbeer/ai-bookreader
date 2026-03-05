# Clerk Usage Examples for Next.js App Router

## Protected Routes

To protect specific routes, update your `middleware.ts`:

```typescript
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/books/new(.*)',
  '/library(.*)',
  // Add other protected routes here
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
```

## Server Components - Getting User Data

In any server component or API route:

```typescript
import { auth, currentUser } from '@clerk/nextjs/server';

export default async function Page() {
  // Get auth state
  const { userId } = await auth();
  
  // Or get full user object
  const user = await currentUser();
  
  if (!userId) {
    return <div>Please sign in</div>;
  }
  
  return (
    <div>
      <h1>Welcome {user?.firstName}!</h1>
      <p>User ID: {userId}</p>
    </div>
  );
}
```

## Client Components - Accessing User Data

```typescript
'use client';

import { useUser, useAuth } from '@clerk/nextjs';

export default function ClientComponent() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { userId } = useAuth();
  
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  
  if (!isSignedIn) {
    return <div>Please sign in</div>;
  }
  
  return (
    <div>
      <h1>Hello, {user.firstName}!</h1>
      <p>Email: {user.primaryEmailAddress?.emailAddress}</p>
    </div>
  );
}
```

## Conditional Rendering in Components

```typescript
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

export default function MyComponent() {
  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <button>Sign In</button>
        </SignInButton>
      </SignedOut>
      
      <SignedIn>
        <p>This content is only visible to signed-in users!</p>
      </SignedIn>
    </>
  );
}
```

## API Route Protection

```typescript
// app/api/protected/route.ts
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Your protected API logic here
  return NextResponse.json({ message: 'Success', userId });
}
```

## Important Notes

- ✅ Always use `await auth()` or `await currentUser()` in server components/routes
- ✅ Import server functions from `@clerk/nextjs/server`
- ✅ Import client hooks/components from `@clerk/nextjs`
- ✅ Use `'use client'` directive when using hooks like `useUser()` or `useAuth()`

