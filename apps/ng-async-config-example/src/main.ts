import { bootstrapApplication } from '@angular/platform-browser';
import { setRemoteConfig } from '@jontze/ng-async-config';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

Promise.all([
  fetch('assets/config.json')
    .then((res) => res.json())
    .then((config) => setRemoteConfig(config)),
  fetch('assets/features.json').then((res) =>
    res.json().then((features) => setRemoteConfig(features, 'features'))
  ),
])
  .then(() => bootstrapApplication(AppComponent, appConfig))
  .catch((err) => console.error(err));
