import { InjectionToken } from '@angular/core';
import { ConfigMap } from './config';

export const REMOTE_CONFIG_MAP = new InjectionToken<ConfigMap>(
  'ng-remote-config-map'
);
