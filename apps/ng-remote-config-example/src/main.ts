import { setRemoteConfig } from '@jontze/ng-remote-config';

Promise.all([
  fetch('assets/config.json')
    .then((res) => res.json())
    .then((config) => setRemoteConfig(config)),
  fetch('assets/features.json').then((res) =>
    res.json().then((features) => setRemoteConfig(features, 'features'))
  ),
])
  .then(() => import('./bootstrap'))
  .catch((err) => console.error(err));
