import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VDIndexComponent } from './v-dindex.component';

describe('VDIndexComponent', () => {
  let component: VDIndexComponent;
  let fixture: ComponentFixture<VDIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VDIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VDIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
