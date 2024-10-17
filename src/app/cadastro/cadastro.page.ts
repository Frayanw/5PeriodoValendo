import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage {
  aluno = {
    nome: '',
    email: '',
    senha: ''
  };

  constructor(private dbService: DatabaseService) {}

  cadastrarAluno() {
    const { nome, email, senha } = this.aluno;
    this.dbService.addAluno(nome, email, senha)
      .then(() => {
        console.log('Aluno cadastrado com sucesso!');
        // Limpe o formulário ou redirecione o usuário após o sucesso
        this.aluno = { nome: '', email: '', senha: '' };
      })
      .catch(e => console.error('Erro ao cadastrar aluno:', e));
  }
}
