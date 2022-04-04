import {
    Links,
    LinksFunction,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from 'remix'
import type { MetaFunction } from 'remix'

import tailwindStylesheetUrl from './styles/tailwind.css'

import GA from './components/GA'

export const links: LinksFunction = () => {
    return [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap',
        },
        { rel: 'stylesheet', href: tailwindStylesheetUrl },
        { rel: 'author', href: 'https://www.linkedin.com/in/pmark' },
        { rel: 'me', href: 'https://www.linkedin.com/in/pmark' },
        { rel: 'me', href: 'https://twitter.com/pmark' },
        { rel: 'me', href: 'https://github.com/pmark' },
        { rel: 'me', href: 'https://www.facebook.com/pmarkanderson' },
        { rel: 'me', href: 'https://plus.google.com/u/1/+PMarkAnderson1' },
    ]
}

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'MartianRover',
    description: 'mars rover martian news updates',
    viewport: 'width=device-width,initial-scale=1',
})

export default function App() {
    return (
        <html lang="en" className="h-full">
            <head>
                <Meta />
                <Links />
            </head>
            <body className="h-full">
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
                {/* <GA /> */}
            </body>
        </html>
    )
}
