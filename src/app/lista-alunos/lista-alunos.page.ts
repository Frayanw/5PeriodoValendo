import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-lista-alunos',
  templateUrl: './lista-alunos.page.html',
  styleUrls: ['./lista-alunos.page.scss'],
})
export class ListaAlunosPage implements OnInit {
  // Defina o tipo explicitamente como um array de objetos com as propriedades dos alunos
  alunos: { id: number, nome: string, email: string }[] = [];

  constructor(private dbService: DatabaseService) {}

  ngOnInit() {
    this.carregarAlunos();
  }

  carregarAlunos() {
    this.dbService.getAlunos().then((data) => {
      this.alunos = data; // Atribui a lista de alunos
    }).catch(e => console.error('Erro ao carregar alunos:', e));
  }

  excluirAluno(id: number) {
    this.dbService.deleteAluno(id)
      .then(() => {
        console.log('Aluno excluído com sucesso!');
        this.carregarAlunos(); // Atualizar a lista após a exclusão
      })
      .catch(e => console.error('Erro ao excluir aluno:', e));
  }

  editarAluno(id: number) {
    console.log('Redirecionar para edição do aluno:', id);
  }
}
