import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { tanstackStart } from '@tanstack/react-start/plugin/rsbuild'



export default defineConfig({
  server: {
    port: 3000,
  },
  tools: {
    cssLoader: {
      url: {
        filter: (url) => !url.startsWith('/fonts/'), // skip resolving, leave literal for public/fonts
      },
    },
  },
  plugins: [
    pluginReact(),
    tanstackStart({
      srcDirectory: 'src', // This is the default
      router: {
        // Specifies the directory TanStack Router uses for your routes.
        routesDirectory: 'app', // Defaults to "routes", relative to srcDirectory
        enableRouteGeneration: true
      }
    })
  ],
})