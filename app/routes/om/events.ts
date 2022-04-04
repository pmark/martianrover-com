// events.ts
// Resource route

import { json, LoaderFunction } from 'remix';

export const loader: LoaderFunction = async () => {
  return json(getOmUpdates());
};

function getOmUpdates() {
  console.log('getOmUpdates...');
  return sessions();
}

let sessions = () => {
  const count = Math.floor(Math.random() * 5) + 1;
  const a = [];
  for (let i = 0; i < count; i++) {
    a.push({
      sid: `sid${i}`,
      location: 1,
      lastUpdateAgeInSeconds: Math.random() * 1000,
    });
  }

  return a;
};
