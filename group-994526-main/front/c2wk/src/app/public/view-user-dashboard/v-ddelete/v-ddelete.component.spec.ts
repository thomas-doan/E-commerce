import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VDDeleteComponent } from './v-ddelete.component';

describe('VDDeleteComponent', () => {
  let component: VDDeleteComponent;
  let fixture: ComponentFixture<VDDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VDDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VDDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
