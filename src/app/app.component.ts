import { Component, OnInit } from '@angular/core';
import { ListService } from './services/list.service';
import { List } from './models/list';
import { NgForm } from '@angular/forms';
import { ValidateBrService } from 'angular-validate-br';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  list = {} as List;
  lists: List[];

  constructor(private listService: ListService, private validateBrService: ValidateBrService) { }

  ngOnInit() {
    this.getLists();
  }


  // defini se um dado será criado ou atualizado
  saveList(form: NgForm) {
    if (this.list.id !== undefined) {
      this.listService.updateList(this.list).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.listService.saveList(this.list).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obtém todos os dados
  getLists() {
    this.listService.getLists().subscribe((lists: List[]) => {
      this.lists = lists;
    });
  }

  // deleta um dado
  deleteList(list: List) {
    var mensagem;
    var retorno = confirm("Você realmente quer deletar este item?");
    if (retorno == true) {
      mensagem = "Operação confirmada";
      this.listService.deleteList(list).subscribe(() => {
        this.getLists();
      });
    }
    else {
      mensagem = "Você cancelou a operação";
    }
  }

  // copia o dado para ser editado.
  editList(list: List) {
    this.list = { ...list };
  }

  adicionarNovo(form: NgForm) {
    this.cleanForm(form);
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getLists();
    form.resetForm();
    this.list = {} as List;
  }
}

