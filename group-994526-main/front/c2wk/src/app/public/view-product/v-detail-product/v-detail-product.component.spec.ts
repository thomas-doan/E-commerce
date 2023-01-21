import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VDetailProductComponent } from './v-detail-product.component';

describe('VDetailProductComponent', () => {
  let component: VDetailProductComponent;
  let fixture: ComponentFixture<VDetailProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VDetailProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VDetailProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
