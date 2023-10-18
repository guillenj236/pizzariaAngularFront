import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SaboreslistComponent } from './sabores/saboreslist/saboreslist.component';
import { SaboresdetailsComponent } from './sabores/saboresdetails/saboresdetails.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { IndexComponent } from './layout/index/index.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './sistema/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EstoqueProddetailsComponent } from './estoqueProd/estoque-proddetails/estoque-proddetails.component';
import { EstoquProdlistComponent } from './estoqueProd/estoqu-prodlist/estoqu-prodlist.component';

@NgModule({
  declarations: [
    AppComponent,
    SaboreslistComponent,
    SaboresdetailsComponent,
    HeaderComponent,
    FooterComponent,
    IndexComponent,
    LoginComponent,
    EstoqueProddetailsComponent,
    EstoquProdlistComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
