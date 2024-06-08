import { Injectable, inject } from '@angular/core';
import { REMOTE_CONFIG_MAP } from './token';

@Injectable()
export class ConfigService {
  private readonly _configMap = inject(REMOTE_CONFIG_MAP);

  getConfig<T>(name = 'default'): T {
    const extractd_config = this._configMap.get(name) as T | undefined;
    if (!extractd_config) {
      throw new Error(`Config '${name}' not found`);
    }
    return extractd_config;
  }
}
