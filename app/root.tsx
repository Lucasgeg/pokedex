import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
} from "remix";
import type { MetaFunction } from "remix";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

function Document({
  children,
  title="Pokedex, attrapez les tous"}:{
  children: React.ReactNode;
  title?: string;
}){
  return(
    <html lang="en">
      <head>
        <Meta />
        <title>{title}</title>
        <Links />
      </head>
      <body>
        {children}
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}


export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}
