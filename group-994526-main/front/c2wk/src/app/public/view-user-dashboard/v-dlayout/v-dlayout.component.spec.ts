import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VDLayoutComponent } from './v-dlayout.component';

describe('VDLayoutComponent', () => {
  let component: VDLayoutComponent;
  let fixture: ComponentFixture<VDLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VDLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VDLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
