import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VDEditComponent } from './v-dedit.component';

describe('VDEditComponent', () => {
  let component: VDEditComponent;
  let fixture: ComponentFixture<VDEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VDEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VDEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
