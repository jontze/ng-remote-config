import { ModuleWithProviders, NgModule } from '@angular/core';

import { REMOTE_CONFIG_MAP } from './token';
import { _getRemoteConfigMap } from './config';
import { ConfigService } from './config.service';

@NgModule({})
export class NgRemoteConfigModule {
  static forRoot(): ModuleWithProviders<NgRemoteConfigModule> {
    return {
      ngModule: NgRemoteConfigModule,
      providers: [
        {
          provide: REMOTE_CONFIG_MAP,
          useValue: _getRemoteConfigMap(),
        },
        ConfigService,
      ],
    };
  }

  static forFeature(): ModuleWithProviders<NgRemoteConfigModule> {
    return {
      ngModule: NgRemoteConfigModule,
      providers: [ConfigService],
    };
  }
}

@NgModule({
  providers: [ConfigService],
})
export class NgRemoteConfigTestingModule {
  static withConfig(
    defaultConfig?: unknown,
    customConfigs?: { name: string; content: unknown }[]
  ): ModuleWithProviders<NgRemoteConfigTestingModule> {
    const testingConfigMap = (customConfigs ?? []).reduce(
      (configMap, { name, content }) => {
        configMap.set(name, content);
        return configMap;
      },
      new Map().set('default', defaultConfig ?? {})
    );
    return {
      ngModule: NgRemoteConfigTestingModule,
      providers: [
        {
          provide: REMOTE_CONFIG_MAP,
          useValue: testingConfigMap,
        },
        ConfigService,
      ],
    };
  }
}
