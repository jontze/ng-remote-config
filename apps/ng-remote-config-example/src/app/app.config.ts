import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideConfig } from '@jontze/ng-remote-config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideConfig(),
  ],
};
