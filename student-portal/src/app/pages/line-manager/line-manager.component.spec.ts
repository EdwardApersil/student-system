import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineManagerComponent } from './line-manager.component';

describe('LineManagerComponent', () => {
  let component: LineManagerComponent;
  let fixture: ComponentFixture<LineManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
