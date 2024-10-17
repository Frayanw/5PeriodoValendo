import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteDBConnection, SQLiteConnection } from '@capacitor-community/sqlite';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private dbInstance: SQLiteDBConnection | undefined;
  private sqlite: SQLiteConnection;

  constructor(private platform: Platform) {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
    // Inicializa o banco de dados assim que a plataforma estiver pronta
    this.platform.ready().then(() => {
      this.initializeDatabase();
    });
  }

  // Função para inicializar o banco de dados SQLite
  async initializeDatabase() {
    try {
      const dbName = 'academia';
      const ret = await this.sqlite.createConnection(dbName, false, "no-encryption", 1, false); // Agora passando 'false' para readonly
      if (ret) {
        this.dbInstance = ret;
        await this.dbInstance.open();
        await this.createTables();
      } else {
        console.error('Erro ao criar a conexão com o banco de dados.');
      }
    } catch (e) {
      console.error('Erro ao criar o banco de dados:', e);
    }
  }

  // Função para criar as tabelas
  async createTables() {
    try {
      // Tabela de alunos
      await this.dbInstance?.execute(`
        CREATE TABLE IF NOT EXISTS alunos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT,
          email TEXT,
          senha TEXT
        );
      `);

      // Tabela de treinos
      await this.dbInstance?.execute(`
        CREATE TABLE IF NOT EXISTS treinos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          aluno_id INTEGER,
          nome TEXT,
          FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE
        );
      `);

      // Tabela de exercícios
      await this.dbInstance?.execute(`
        CREATE TABLE IF NOT EXISTS exercicios (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          treino_id INTEGER,
          nome TEXT,
          series INTEGER,
          repeticoes INTEGER,
          FOREIGN KEY (treino_id) REFERENCES treinos(id) ON DELETE CASCADE
        );
      `);

      console.log('Tabelas criadas com sucesso.');
    } catch (e) {
      console.error('Erro ao criar tabelas:', e);
    }
  }

  // Funções para gerenciar alunos
  async addAluno(nome: string, email: string, senha: string) {
    const query = `INSERT INTO alunos (nome, email, senha) VALUES (?, ?, ?)`;
    await this.dbInstance?.run(query, [nome, email, senha]);
    console.log('Aluno adicionado com sucesso!');
  }

  async getAlunos() {
    const query = `SELECT * FROM alunos`;
    const result = await this.dbInstance?.query(query);
    return result?.values || [];
  }

  // Atualizar aluno
  async updateAluno(id: number, nome: string, email: string, senha: string) {
    const query = `
      UPDATE alunos SET nome = ?, email = ?, senha = ? WHERE id = ?;
    `;
    await this.dbInstance?.run(query, [nome, email, senha, id]);
    console.log('Aluno atualizado com sucesso!');
  }

  // Excluir aluno
  async deleteAluno(id: number) {
    const query = `DELETE FROM alunos WHERE id = ?`;
    await this.dbInstance?.run(query, [id]);
    console.log('Aluno excluído com sucesso!');
  }

  // Funções para gerenciar treinos
  async addTreino(alunoId: number, nome: string) {
    const query = `INSERT INTO treinos (aluno_id, nome) VALUES (?, ?)`;
    await this.dbInstance?.run(query, [alunoId, nome]);
    console.log('Treino adicionado com sucesso!');
  }

  async getTreinos(alunoId: number) {
    const query = `SELECT * FROM treinos WHERE aluno_id = ?`;
    const result = await this.dbInstance?.query(query, [alunoId]);
    return result?.values || [];
  }

  async deleteTreino(treinoId: number) {
    const query = `DELETE FROM treinos WHERE id = ?`;
    await this.dbInstance?.run(query, [treinoId]);
    console.log('Treino removido com sucesso!');
  }

  // Funções para gerenciar exercícios
  async addExercicio(treinoId: number, nome: string, series: number, repeticoes: number) {
    const query = `INSERT INTO exercicios (treino_id, nome, series, repeticoes) VALUES (?, ?, ?, ?)`;
    await this.dbInstance?.run(query, [treinoId, nome, series, repeticoes]);
    console.log('Exercício adicionado com sucesso!');
  }

  async getExercicios(treinoId: number) {
    const query = `SELECT * FROM exercicios WHERE treino_id = ?`;
    const result = await this.dbInstance?.query(query, [treinoId]);
    return result?.values || [];
  }

  async deleteExercicio(exercicioId: number) {
    const query = `DELETE FROM exercicios WHERE id = ?`;
    await this.dbInstance?.run(query, [exercicioId]);
    console.log('Exercício removido com sucesso!');
  }
}
