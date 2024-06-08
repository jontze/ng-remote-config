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

export const provideTestingConfig = (
  defaultConfig?: unknown,
  customConfigs?: { name: string; content: unknown }[]
): EnvironmentProviders => {
  const testingConfigMap = (customConfigs ?? []).reduce(
    (configMap, { name, content }) => {
      configMap.set(name, content);
      return configMap;
    },
    new Map().set('default', defaultConfig ?? { environment: 'test' })
  );
  return makeEnvironmentProviders([
    {
      provide: REMOTE_CONFIG_MAP,
      useValue: testingConfigMap,
    },
    ConfigService,
  ]);
};
