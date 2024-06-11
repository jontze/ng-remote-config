import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { getRemoteConfig, provideConfig } from '@jontze/ng-remote-config';

import { DefaultConfig, FeaturesConfig } from './config';

console.debug('Default Config: ', getRemoteConfig<DefaultConfig>());
console.debug('Feature Flags: ', getRemoteConfig<FeaturesConfig>());

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideConfig(),
  ],
};
