import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VProductByCatComponent } from './v-product-by-cat.component';

describe('VProductByCatComponent', () => {
  let component: VProductByCatComponent;
  let fixture: ComponentFixture<VProductByCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VProductByCatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VProductByCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
