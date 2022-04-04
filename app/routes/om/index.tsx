import { useFetcher, Form, useTransition } from 'remix';
import { useState, useEffect } from 'react';
import styles from '../../styles/om.css';
import useInterval from '../../lib/use-interval';

const REFRESH_RATE_SEC = 3;

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export default function OmGlobe() {
  const [data, setData] = useState([]);
  const fetcher = useFetcher();

  useInterval(() => {
    if (document.visibilityState === 'visible') {
      fetcher.load('/om/events');
    }
  }, REFRESH_RATE_SEC * 1000);

  useEffect(() => {
    if (fetcher.data) {
      setData(fetcher.data);
    }
  }, [fetcher.data]);

  return <Page data={data} />;
}

export async function action({ request }) {
  const form = await request.formData();
  const frequency = form.get('title');
  console.log('frequency', frequency);
  return null;
}

function Page({ data }) {
  const { state } = useTransition();
  const busy = state === 'submitting';

  return (
    <div>
      <div className="stack">
        <h1 className="title">OmGlobe</h1>
      </div>

      <Form method="post">
        <input name="frequency" type="text" />
        <button type="submit" disabled={busy}>
          {busy ? 'Creating...' : 'Submit'}
        </button>
      </Form>

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
  return (
    <div>
      <h3>Updates</h3>
      <ul>
        {!updates && 'Loading...'}
        {updates &&
          updates.map((u: any) => (
            <li key={u.sid}>{u.lastUpdateAgeInSeconds}</li>
          ))}
      </ul>
    </div>
  );
}
