// app/routes/__root.tsx
import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router'
// Rsbuild supports "?url" to get the path of the compiled CSS stylesheet
import globalCss from './globals.css?url' 

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: "CJ's Resume" },
      { name: 'description', content: "Title" },
    ],
    links: [
      { rel: 'stylesheet', href: globalCss },
    ],
  }),
  component: RootLayout,
})

function RootLayout() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* HeadContent outputs your meta and link definitions */}
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if ((theme === 'dark') || (!theme && systemDark)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {/* outlet replaces {children} to render your current route page */}
        <Outlet />
        {/* Scripts injects hydration/runtime JS */}
        <Scripts />
      </body>
    </html>
  );
}