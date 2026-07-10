// src/router.tsx
import { createRouter as createTanStackRouter } from '@tanstack/react-router'
// The routeTree is automatically generated here during compilation
import { routeTree } from './routeTree.gen'



export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
  })
  return router
}

// Register the router for maximum type safety across your app
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}