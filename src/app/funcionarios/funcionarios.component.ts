import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../classes/Funcionario';
import { FuncionariosService } from '../servicos/funcionarios.service'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})

export class FuncionariosComponent implements OnInit {

  funcionarios: Funcionario[];

  constructor(
    private funcionariosService: FuncionariosService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getFuncionarios();
  }

  getFuncionarios(): void {
    this.funcionariosService.getFuncionarios()
      .subscribe(funcionarios => this.funcionarios = funcionarios)
  }

  adicionarFuncionario(): void {
    this.router.navigate(['funcionarios/cadastrar']);
  }

  editarFuncionario(id: number): void {
    this.router.navigate(['funcionarios/detalhes/', id]);
  }

  deletarFuncionario(funcionario: Funcionario): void {
    this.funcionarios = this.funcionarios.filter(h => h !== funcionario);
    this.funcionariosService.deletarFuncionario(funcionario).subscribe();
  }

}
