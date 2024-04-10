import { authMiddleware } from '@clerk/nextjs';

// Learn: Your Route Handler must be made public or ignored by Middleware to allow the request to succeed
export default authMiddleware({
  publicRoutes: ['/api/webhooks/clerk'],
});

export const config = {
  matcher: ['/((?!.+.[w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
