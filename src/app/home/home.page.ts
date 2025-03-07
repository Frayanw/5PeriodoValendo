import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  alunos: { id: number, nome: string, email: string }[] = [];

  constructor(private dbService: DatabaseService) {}

  ngOnInit() {
    this.carregarAlunos();
  }

  carregarAlunos() {
    this.dbService.getAlunos().then((data) => {
      this.alunos = data;
    }).catch(e => console.error('Erro ao carregar alunos:', e));
  }

  excluirAluno(id: number) {
    this.dbService.deleteAluno(id)
      .then(() => {
        console.log('Aluno excluído com sucesso!');
        this.carregarAlunos();
      })
      .catch(e => console.error('Erro ao excluir aluno:', e));
  }

  editarAluno(id: number) {
    console.log('Redirecionar para edição do aluno:', id);
  }
}
