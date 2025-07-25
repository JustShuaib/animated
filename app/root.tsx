import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type {Route} from "./+types/root";
import {gsap} from "gsap";
import {useGSAP} from "@gsap/react";
import "./app.css";
// import Nav from "components/nav";
import {Observer} from "gsap/dist/Observer";
import Nav from "components/nav";

gsap.registerPlugin(useGSAP, Observer);

export const links: Route.LinksFunction = () => [
  {rel: "preconnect", href: "https://fonts.googleapis.com"},
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Rubik+Dirt&display=swap",
  },
];

export function Layout({children}: {children: React.ReactNode}) {
  useGSAP(() => {
    let xTo, yTo;
    gsap.set(".mouse-circle", {xPercent: -50, yPercent: -50});
    xTo = gsap.quickTo(".mouse-circle", "x", {
      duration: 0.5,
      ease: "power3",
    });
    yTo = gsap.quickTo(".mouse-circle", "y", {
      duration: 0.5,
      ease: "power3",
    });
    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
  });

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="mouse-circle w-2.5 h-2.5 bg-gray-400 rounded-full pointer-events-none relative z-30" />
        <Nav />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({error}: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
