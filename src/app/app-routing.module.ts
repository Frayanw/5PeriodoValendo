import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',  // Redirecionar para a página de login
    pathMatch: 'full'
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then(m => m.CadastroPageModule)
  },
  {
    path: 'lista-alunos',
    loadChildren: () => import('./lista-alunos/lista-alunos.module').then(m => m.ListaAlunosPageModule)
  },
  {
    path: 'editar-aluno/:id',
    loadChildren: () => import('./editar-aluno/editar-aluno.module').then(m => m.EditarAlunoPageModule)
  },
  {
    path: 'lista-treinos/:alunoId',  // Rota para a tela de treinos com o ID do aluno
    loadChildren: () => import('./lista-treinos/lista-treinos.module').then( m => m.ListaTreinosPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
