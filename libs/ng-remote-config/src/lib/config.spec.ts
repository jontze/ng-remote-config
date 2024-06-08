import * as configModule from './config';

describe('Config', () => {
  let localConfigModule: typeof configModule;

  beforeEach(() => {
    // As the config module holds state,
    // we need to isolate the module between tests
    jest.isolateModules(async () => {
      return import('./config').then((mod) => {
        localConfigModule = mod;
      });
    });
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('should return the config map', () => {
    const configMap = localConfigModule._getRemoteConfigMap();
    expect(configMap).toBeInstanceOf(Map);
  });

  describe('with default config', () => {
    it('should return if it exists', () => {
      const config = { key: 'value' };
      localConfigModule.setRemoteConfig(config);

      const extractedConfig = localConfigModule.getRemoteConfig();
      expect(extractedConfig).toBe(config);
    });

    it("should throw if doesn't exist", () => {
      expect(() => localConfigModule.getRemoteConfig()).toThrow(
        "Config 'default' not found"
      );
    });
  });

  describe('with custom config', () => {
    it('should return if it exists', () => {
      const config = { key: 'value' };
      localConfigModule.setRemoteConfig(config, 'custom');

      const configMap = localConfigModule._getRemoteConfigMap();
      expect(configMap.get('custom')).toBe(config);
    });

    it("should throw if doesn't exist", () => {
      expect(() => localConfigModule.getRemoteConfig('non-existing')).toThrow(
        "Config 'non-existing' not found"
      );
    });
  });
});
