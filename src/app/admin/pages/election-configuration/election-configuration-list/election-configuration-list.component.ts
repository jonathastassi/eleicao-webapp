import { ElectionService } from 'src/app/shared/services/election.service';
import { Component } from '@angular/core';
import { Election } from 'src/app/shared/models/election';
import { Observable } from 'rxjs';
import { EStateElection } from 'src/app/shared/enums/e-state-election.enum';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-election-configuration-list',
  templateUrl: './election-configuration-list.component.html',
  styleUrls: ['./election-configuration-list.component.css'],
})
export class ElectionConfigurationListComponent {
  items$: Observable<Election[]>;

  public stateElection = EStateElection;

  constructor(public electionService: ElectionService, private toastr: ToastrService) {
    this.items$ = electionService.getAllOrderByDateAsc();
  }

  sharedLink(election: Election): void {
    const linkUrl = 'https://' + window.location.host + '/#/p/eleicao/' + election.reference;

    if (navigator.share) {
      navigator.share({
        title: 'Compartilhar Eleição - ' + election.title,
        text: election.title + ' - Clique aqui para votar',
        url: linkUrl,
      }).then(() => {
        this.toastr.success("Link compartilhado com sucesso.", "Sucesso!")
      })
      .catch(e => this.toastr.error("Não foi possível copiar o link.", "Erro"));
    } else {
      navigator.clipboard.writeText(linkUrl).then(() => {
        this.toastr.success("Link copiado para a área de transferência. Agora basta colar e compartilhar onde deseja.", "Copiado")
      }).catch(e => this.toastr.error("Não foi possível copiar o link.", "Erro"));
    }
  }
}

//TODO Tratar quando não tiver eleições cadastradas
