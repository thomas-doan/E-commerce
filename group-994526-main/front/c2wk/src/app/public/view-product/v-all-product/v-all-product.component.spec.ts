import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VAllProductComponent } from './v-all-product.component';

describe('VAllProductComponent', () => {
  let component: VAllProductComponent;
  let fixture: ComponentFixture<VAllProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VAllProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VAllProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
