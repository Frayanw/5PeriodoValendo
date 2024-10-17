import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaAlunosPage } from './lista-alunos.page';

describe('ListaAlunosPage', () => {
  let component: ListaAlunosPage;
  let fixture: ComponentFixture<ListaAlunosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAlunosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
