import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaTreinosPage } from './lista-treinos.page';

describe('ListaTreinosPage', () => {
  let component: ListaTreinosPage;
  let fixture: ComponentFixture<ListaTreinosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTreinosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
