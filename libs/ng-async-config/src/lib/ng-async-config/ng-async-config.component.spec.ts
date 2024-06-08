import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgAsyncConfigComponent } from './ng-async-config.component';

describe('NgAsyncConfigComponent', () => {
  let component: NgAsyncConfigComponent;
  let fixture: ComponentFixture<NgAsyncConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgAsyncConfigComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgAsyncConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
