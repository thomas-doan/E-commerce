import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProdByCatComponent } from './list-prod-by-cat.component';

describe('ListProdByCatComponent', () => {
  let component: ListProdByCatComponent;
  let fixture: ComponentFixture<ListProdByCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProdByCatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProdByCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
