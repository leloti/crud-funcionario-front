import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { DetalhesComponent } from './detalhes/detalhes.component';

const routes: Routes = [
  { path: '', redirectTo: '/funcionarios', pathMatch: 'full' },
  { path: 'funcionarios', component: FuncionariosComponent },
  { path: 'funcionarios/detalhes/:id', component: DetalhesComponent },
  { path: 'funcionarios/cadastrar', component: DetalhesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
