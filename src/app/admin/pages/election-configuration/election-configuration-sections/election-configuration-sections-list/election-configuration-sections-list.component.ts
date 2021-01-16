import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Section } from './../../../../../shared/models/section';
import { SectionService } from './../../../../../shared/services/section.service';
import { EStateSection } from 'src/app/shared/enums/e-state-section.enum';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-election-configuration-sections-list',
  templateUrl: './election-configuration-sections-list.component.html',
  styleUrls: ['./election-configuration-sections-list.component.css']
})
export class ElectionConfigurationSectionsListComponent implements OnInit {

  items$: Observable<Section[]>;

  public stateSection = EStateSection;

  public electionId: string;

  public sectionIdHasOpened: string;

  constructor(
    public route: ActivatedRoute,
    public sectionService: SectionService,
    private toastr: ToastrService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.electionId = paramMap.get('electionId');
      this.items$ = this.sectionService.getSectionsByElectionIdOrderBy(this.electionId);
    });
  }

  startSection(section: Section, sections: Section[]): void {

    const sectionsHasOpened = sections.filter(x => x.state == this.stateSection.Started);

    if (sectionsHasOpened.length > 0) {
      this.toastr.warning(`Finalize a sessão '${sectionsHasOpened[0]?.title}' para iniciar essa sessão.`, 'Já existe uma sessão iniciada!');
      this.sectionIdHasOpened = sectionsHasOpened[0]?.id;
      return;
    }

    if (section.state == EStateSection.Pending) {
      Swal.fire({
        title: 'Deseja iniciar a sessão?',
        text: 'Ao iniciar a sessão, a votação será liberada e será gerado um link para compartilhamento!',
        icon: 'info',
        showCancelButton: true,
        buttonsStyling: false,
        reverseButtons: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
        customClass: {
          confirmButton: 'btn btn-outline-info w-25 ml-1',
          cancelButton: 'btn btn-outline-danger w-25 mr-1',
        },
      }).then((result) => {
        if (result.isConfirmed) {

          section.state = EStateSection.Started;
          section.dateInitial = new Date();
          this.sectionService.update(section, this.electionId).then(
            () => {
              this.toastr.success('Sessão iniciada com sucesso.', 'Sucesso!');
            },
            (err) => {
              this.toastr.error('Não foi possível iniciar.', 'Erro!');
            }
          );
        }
      });
    }
  }

  stopSection(section: Section): void {
    //TODO validar se falta pessoas para votar

    if (section.state == EStateSection.Started) {
      Swal.fire({
        title: 'Deseja finalizar a sessão?',
        text: 'Ao finalizar a sessão, a votação termina e o resultado estará disponível',
        icon: 'info',
        showCancelButton: true,
        buttonsStyling: false,
        reverseButtons: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
        customClass: {
          confirmButton: 'btn btn-outline-info w-25 ml-1',
          cancelButton: 'btn btn-outline-danger w-25 mr-1',
        },
      }).then((result) => {
        if (result.isConfirmed) {

          section.state = EStateSection.Finalized;
          section.dateFinal = new Date();
          this.sectionService.update(section, this.electionId).then(
            () => {
              this.sectionIdHasOpened = null;
              this.toastr.success('Sessão finalizada com sucesso.', 'Sucesso!');
            },
            (err) => {
              this.toastr.error('Não foi possível finalizar.', 'Erro!');
            }
          );
        }
      });
    }
  }
}
