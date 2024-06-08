import { TestBed } from '@angular/core/testing';

import { ConfigService } from './config.service';
import { ConfigMap } from './config';
import { REMOTE_CONFIG_MAP } from './token';

describe('ConfigService', () => {
  let service: ConfigService;

  let mockConfigMap: ConfigMap;

  beforeEach(() => {
    mockConfigMap = new Map<string, unknown>();

    TestBed.configureTestingModule({
      providers: [
        ConfigService,
        {
          provide: REMOTE_CONFIG_MAP,
          useValue: mockConfigMap,
        },
      ],
    });
    service = TestBed.inject(ConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should throw an error if requested config doesn't exist", () => {
    expect(() => service.getConfig('non-existing')).toThrow(
      "Config 'non-existing' not found"
    );
  });

  it("should return the 'default 'config if it exists", () => {
    const config = { key: 'value' };
    mockConfigMap.set('default', config);

    expect(service.getConfig()).toBe(config);
  });

  it('should return custom config if it exists', () => {
    const config = { key: 'value' };
    mockConfigMap.set('custom', config);

    expect(service.getConfig('custom')).toBe(config);
  });
});
