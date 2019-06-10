import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../classes/Funcionario';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { FuncionariosService } from '../servicos/funcionarios.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css'],
})
export class DetalhesComponent implements OnInit {

  funcionario: Funcionario
  ehEdicao: boolean = false
  error: boolean = true
  funcionarioForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private funcionariosService: FuncionariosService,
    private router: Router
  ) {   }

  get id() { return this.funcionarioForm.get('id'); }
  get nome() { return this.funcionarioForm.get('nome'); }
  get sobrenome() { return this.funcionarioForm.get('sobrenome'); }
  get email() { return this.funcionarioForm.get('email'); }
  get numeroPis() { return this.funcionarioForm.get('numeroPis'); }
  
  ngOnInit() {
    this.inicializarFuncionario()

    this.funcionarioForm = new FormGroup(
    {
      'id': new FormControl(this.funcionario.id, []),
      'nome': new FormControl(this.funcionario.nome, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ]),
      'sobrenome': new FormControl(this.funcionario.sobrenome, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      'email': new FormControl(this.funcionario.email, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.email
      ]),
      'numeroPis': new FormControl(this.funcionario.numeroPis, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ])
    });
    
    this.route.params.subscribe(
      params => {
        if (params["id"] != null) {
          this.consultarFuncionario(params["id"]);
          this.ehEdicao = true
        } 
      }
    );
  }

  consultarFuncionario(id: number): void {
    this.funcionariosService.consultarFuncionarioId(id)
      .subscribe(funcionario =>  {
        this.funcionario = funcionario;
        this.inicializarForm();
      })
  }

  salvar(funcionarioForm: FormGroup): void {
    this.funcionario = funcionarioForm.value;
    if (this.funcionario.id == undefined) {
      this.funcionariosService.adicionarFuncionario(this.funcionario).subscribe(
          funcionario => {
            this.funcionario = funcionario
            this.inicializarForm();

            this.recarregar(this.funcionario.id)
          },
          error => {
            console.log(error);
          }
        )
    } else {
      this.funcionariosService.editarFuncionario(this.funcionario).subscribe(
        funcionario => {
          this.funcionario = funcionario;
          this.inicializarForm();

          window.location.reload();
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  recarregar(idFuncionario : number): void {
    this.router.navigate(['funcionarios/detalhes/', idFuncionario]);
  } 
  
  goBack(): void {
    this.router.navigate(['funcionarios/']);
  }

  inicializarForm(): void {
    this.funcionarioForm.get('id').setValue(this.funcionario.id);        
    this.funcionarioForm.get('nome').setValue(this.funcionario.nome);        
    this.funcionarioForm.get('sobrenome').setValue(this.funcionario.sobrenome);        
    this.funcionarioForm.get('email').setValue(this.funcionario.email);        
    this.funcionarioForm.get('numeroPis').setValue(this.funcionario.numeroPis);  
  }

  inicializarFuncionario(): void {
    this.funcionario = new Funcionario;
    // this.funcionario.id = null;
    // this.funcionario.nome = '';
    // this.funcionario.sobrenome = '';
    // this.funcionario.email = '';
    // this.funcionario.numeroPis = '';
  }

}
