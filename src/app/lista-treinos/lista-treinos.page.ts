import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-lista-treinos',
  templateUrl: './lista-treinos.page.html',
  styleUrls: ['./lista-treinos.page.scss'],
})
export class ListaTreinosPage implements OnInit {
  treinos: any[] = [];
  alunoId!: number;

  constructor(private route: ActivatedRoute, private dbService: DatabaseService) {}

  ngOnInit() {
    // Capturar o alunoId da URL
    this.alunoId = Number(this.route.snapshot.paramMap.get('alunoId'));

    // Carregar os treinos desse aluno
    this.carregarTreinos();
  }

  carregarTreinos() {
    this.dbService.getTreinos(this.alunoId).then(treinos => {
      this.treinos = treinos;
    });
  }

  adicionarTreino() {
    const nomeTreino = prompt('Nome do Treino:');
    if (nomeTreino) {
      this.dbService.addTreino(this.alunoId, nomeTreino).then(() => {
        this.carregarTreinos();  // Atualiza a lista de treinos
      });
    }
  }

  removerTreino(treinoId: number) {
    this.dbService.deleteTreino(treinoId).then(() => {
      this.carregarTreinos();  // Atualiza a lista de treinos
    });
  }
}
