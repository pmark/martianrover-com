import { json, LoaderFunction, useLoaderData, useFetcher } from "remix";
import { useState, useEffect } from "react";
import { useRevalidate } from "remix-utils";
import styles from "../../styles/om.css";
import useInterval from "../../lib/use-interval";

function useRevalidateOnInterval() {
    let revalidate = useRevalidate();
    useEffect(() => {
        let interval = setInterval(revalidate, 3000);
        return () => clearInterval(interval);
    }, [revalidate]);
}

export function links() {
    return [{ rel: "stylesheet", href: styles }];
}

const REFRESH_RATE_SEC = 3;

export default function Attempt2() {
    const [data, setData] = useState([]);
    const fetcher = useFetcher();

    useInterval(() => {
        fetcher.load("/om/events");
    }, REFRESH_RATE_SEC * 1000);

    useEffect(() => {
        console.log('useEffect fetcher.data:', fetcher.data);

        if (fetcher.data) {
            setData(fetcher.data);
        }
    }, [fetcher.data]);

    return <Page data={data} />;
}


function Attempt3() {
    const loaderData = useLoaderData();
    const fetcher = useFetcher();

    const data = fetcher.data || loaderData;

    const revalidate = () => {
        console.log('reval!');

        if (document.visibilityState === "visible") {
            console.log('vis!');
            fetcher.load("/om/events");
        }
    };

    useEffect(() => {
        document.addEventListener("visibilitychange", revalidate);
        return () => document.removeEventListener("visibilitychange", revalidate);
    }, []);

    return <Page data={data} />;
}


// See https://benborgers.com/posts/remix-poll
function BadIntervalLoader() {
    const loaderData = useLoaderData();
    console.log('setting data...');

    const [data, setData] = useState(loaderData);

    // Whenever the loader gives us new data
    // (for example, after a form submission),
    // update our `data` state.
    useEffect(() => {
        console.log('useEffect setData with loaderData');
        return setData(loaderData);
    }, [loaderData]
    );

    const fetcher = useFetcher();

    // Get fresh data periodically
    useEffect(() => {
        console.log('WORKING?!');

        const interval = setInterval(() => {
            console.log('...');
            if (document.visibilityState === "visible") {
                console.log('loading...');
                fetcher.load("/om");
            }
        }, REFRESH_RATE_SEC * 1000);

        return () => {
            console.log('stopping refresh');
            return clearInterval(interval);
        }
    }, []);

    // When the fetcher comes back with new data,
    // update our `data` state.
    useEffect(() => {
        console.log('useEffect fetcher.data:', fetcher.data);

        if (fetcher.data) {
            setData(fetcher.data);
        }
    }, [fetcher.data]);

    return <Page data={data} />;
}

function Page({ data }) {
    return (
        <div>
            <div className="stack">
                <h1 className="title">OMGlobe</h1>
            </div>

            <OmUpdates updates={data} />

            <fieldset>
                <legend>To Do</legend>
                <ul>
                    <li>Design</li>
                    <ul>
                        <li>Route based CSS</li>
                        <li>ThreeJS globe</li>
                        <li>Display user locations</li>
                        <li>Display om event locations</li>
                        <li>Display visitor and om stats</li>
                        <li>Countdown to next global om event</li>
                    </ul>
                    <li>API</li>
                    <ul>
                        <li>GET updates</li>
                        <li>POST om event</li>
                    </ul>
                </ul>
            </fieldset>
        </div>
    );
}

function OmUpdates({ updates }) {
    console.log('om updates', updates);

    return (
        <div>
            <h3>Updates</h3>
            <ul>
                {!updates && 'Loading...'}
                {updates && updates.map((u: any) => (
                    <li key={u.sid}>{u.lastUpdateAgeInSeconds}</li>
                ))}

            </ul>
        </div>
    );
}
