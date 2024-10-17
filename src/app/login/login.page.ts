import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service'; // Supondo que seu DatabaseService tem a lógica de autenticação

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  usuario = {
    email: '',
    senha: ''
  };

  constructor(private dbService: DatabaseService, private router: Router) {}

  login() {
    const { email, senha } = this.usuario;

    // Simulação de verificação de credenciais
    this.dbService.getAlunos().then(alunos => {
      const aluno = alunos.find(a => a.email === email && a.senha === senha);
      if (aluno) {
        console.log('Login bem-sucedido');
        // Redirecionar para a página de lista de alunos ou home
        this.router.navigate(['/home']);
      } else {
        console.error('Credenciais inválidas');
        alert('Email ou senha incorretos. Tente novamente.');
      }
    }).catch(e => console.error('Erro ao tentar login:', e));
  }
}
