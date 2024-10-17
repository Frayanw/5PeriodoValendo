import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-editar-aluno',
  templateUrl: './editar-aluno.page.html',
  styleUrls: ['./editar-aluno.page.scss'],
})
export class EditarAlunoPage implements OnInit {
  aluno = {
    id: 0,
    nome: '',
    email: '',
    senha: ''
  };

  constructor(
    private route: ActivatedRoute,
    private dbService: DatabaseService,
    private router: Router
  ) {}

  ngOnInit() {
    // Tentar pegar o ID do aluno da URL
    const alunoId = this.route.snapshot.paramMap.get('id');
    
    if (alunoId !== null && !isNaN(Number(alunoId))) {
      // Se o ID não for nulo e for um número, carregue o aluno
      this.carregarAluno(Number(alunoId));
    } else {
      // Exibir um erro ou redirecionar para outra página se o ID for inválido
      console.error('ID inválido ou não encontrado na URL');
      this.router.navigate(['/lista-alunos']);  // Por exemplo, redirecionar para a lista de alunos
    }
  }

  // Carregar os dados do aluno
  carregarAluno(id: number) {
    this.dbService.getAlunos().then(alunos => {
      const aluno = alunos.find(a => a.id === id);
      if (aluno) {
        this.aluno = aluno;
      }
    }).catch(e => console.error('Erro ao carregar aluno:', e));
  }

  // Atualizar os dados do aluno no banco
  atualizarAluno() {
    const { id, nome, email, senha } = this.aluno;
    this.dbService.updateAluno(id, nome, email, senha)
      .then(() => {
        console.log('Aluno atualizado com sucesso!');
        // Redirecionar para a lista de alunos após a edição
        this.router.navigate(['/lista-alunos']);
      })
      .catch(e => console.error('Erro ao atualizar aluno:', e));
  }
}
