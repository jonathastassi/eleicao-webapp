import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EStateElection } from '../enums/e-state-election.enum';
import { Election } from '../models/election';

@Injectable({
  providedIn: 'root'
})
export class SharedLinkService {

  constructor(
    private toastr: ToastrService,
  ) { }

  sharedLink(election: Election): void {

    if (election.state == EStateElection.Finalized) {
      this.toastr.error("Eleição já foi finalizada.", "Atenção");
      return;
    }

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
