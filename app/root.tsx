import { Links, LiveReload, Meta, Outlet, Scripts } from "remix";
import type { MetaFunction } from "remix";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import style from "./styles/pokedex.css";

const queryClient = new QueryClient();

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

function Document({
  children,
  title = "Pokedex, attrapez les tous",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <title>{title}</title>
        <Links />
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="stylesheet" href={style} />
      </head>
      <body className=" bg-amber-500">
        {children}
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
export default function App() {
  return (
    <Document>
      <QueryClientProvider client={queryClient}>
        <Outlet />

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Document>
  );
}
