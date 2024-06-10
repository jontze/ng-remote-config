import { TestBed } from '@angular/core/testing';
import { provideTestingConfig } from '@jontze/ng-remote-config';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideTestingConfig({ environment: 'test' }, [
          { name: 'features', content: { feature1: true } },
        ]),
      ],
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
