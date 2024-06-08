export type ConfigMap = Map<string, unknown>;

const _configStore: ConfigMap = new Map<string, unknown>();

export const setRemoteConfig = <T>(
  configurationObject: T,
  name = 'default'
): void => {
  _configStore.set(name, configurationObject);
};

export const getRemoteConfig = <T>(name = 'default'): T => {
  const extractedConfig = _configStore.get(name) as T | undefined;
  if (!extractedConfig) {
    throw new Error(`Config '${name}' not found`);
  }
  return extractedConfig;
};

export const _getRemoteConfigMap = (): ConfigMap => {
  return _configStore;
};
