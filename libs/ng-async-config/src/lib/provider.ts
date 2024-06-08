import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { REMOTE_CONFIG_MAP } from './token';
import { _getRemoteConfigMap } from './config';
import { ConfigService } from './config.service';

export const provideConfig = (): EnvironmentProviders => {
  return makeEnvironmentProviders([
    {
      provide: REMOTE_CONFIG_MAP,
      useValue: _getRemoteConfigMap(),
    },
    ConfigService,
  ]);
};
