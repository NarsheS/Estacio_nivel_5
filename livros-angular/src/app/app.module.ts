import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ControleEditoraService } from './controle-editora.service';
import { ControleLivrosService } from './controle-livros.service';
import { LivroListaComponent } from './livro-lista/livro-lista.component'
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { LivroDadosComponent } from './livro-dados/livro-dados.component';

@NgModule({
  declarations: [
    AppComponent,
    LivroListaComponent,
    LivroDadosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ControleEditoraService, ControleLivrosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
