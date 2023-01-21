import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VDAddComponent } from './v-dadd.component';

describe('VDAddComponent', () => {
  let component: VDAddComponent;
  let fixture: ComponentFixture<VDAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VDAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VDAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
