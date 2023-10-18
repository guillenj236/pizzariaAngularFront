import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './sistema/login/login.component';
import { IndexComponent } from './layout/index/index.component';
import { SaboreslistComponent } from './sabores/saboreslist/saboreslist.component';
import { SaboresdetailsComponent } from './sabores/saboresdetails/saboresdetails.component';
import { EstoquProdlistComponent } from './estoqueProd/estoqu-prodlist/estoqu-prodlist.component';
import { EstoqueProddetailsComponent } from './estoqueProd/estoque-proddetails/estoque-proddetails.component';

const routes: Routes = [
  { path:"", redirectTo: "login", pathMatch: 'full' },
  { path:"login", component: LoginComponent },
  {path: "admin", component: IndexComponent, children:[
    {path: "sabores", component:SaboreslistComponent},
    {path:"sabores/novo", component:SaboresdetailsComponent},
    {path: "estoqueProd", component:EstoquProdlistComponent},
    {path: "estoqueProd/novo", component: EstoqueProddetailsComponent}
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
