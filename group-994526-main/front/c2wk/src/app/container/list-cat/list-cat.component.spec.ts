import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCatComponent } from './list-cat.component';

describe('ListCatComponent', () => {
  let component: ListCatComponent;
  let fixture: ComponentFixture<ListCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
