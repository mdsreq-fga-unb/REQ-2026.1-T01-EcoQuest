import { Html } from '@elysia/html'


export function Layout({ children, title }: { children: Html; title: string }) {
  return (
    <html>
      <head>
        <title>{title}</title>
        <link rel="stylesheet" href="" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}