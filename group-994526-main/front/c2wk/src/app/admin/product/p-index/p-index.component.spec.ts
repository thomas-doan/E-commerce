import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PIndexComponent } from './p-index.component';

describe('PIndexComponent', () => {
  let component: PIndexComponent;
  let fixture: ComponentFixture<PIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
