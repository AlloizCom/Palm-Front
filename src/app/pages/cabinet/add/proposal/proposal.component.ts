import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Proposal} from "../../../../../shared/models/proposal";
import {ProposalDescription} from "../../../../../shared/models/proposal-description";
import {ProposalService} from "../../../../../shared/service/proposal.service";

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.css'],
  providers: [ProposalService]
})
export class ProposalComponent implements OnInit {

  proposalForm: FormGroup;
  proposal: Proposal = new Proposal();
  descriptions: ProposalDescription[] = [];

  appear = false;
  image: string;

  constructor(private _proposalService: ProposalService) {
    this.descriptions = [new ProposalDescription(), new ProposalDescription(),
      new ProposalDescription(), new ProposalDescription()];
    this.proposal.proposalDescriptions = this.descriptions;

  }

  ngOnInit() {
    this.proposalForm = new FormGroup({
      TitleEn: new FormControl('', [Validators.required, Validators.minLength(3)]),
      HeaderTextareaEn: new FormControl('', [Validators.required, Validators.minLength(3)]),
      textEn: new FormControl('', [Validators.required, Validators.minLength(3)]),
      TitleUk: new FormControl('', [Validators.required, Validators.minLength(3)]),
      HeaderTextareaUk: new FormControl('', [Validators.required, Validators.minLength(3)]),
      textUk: new FormControl('', [Validators.required, Validators.minLength(3)]),
      TitlePl: new FormControl('', [Validators.required, Validators.minLength(3)]),
      HeaderTextareaPl: new FormControl('', [Validators.required, Validators.minLength(3)]),
      textPl: new FormControl('', [Validators.required, Validators.minLength(3)]),
      TitleRu: new FormControl('', [Validators.required, Validators.minLength(3)]),
      HeaderTextareaRu: new FormControl('', [Validators.required, Validators.minLength(3)]),
      textRu: new FormControl('', [Validators.required, Validators.minLength(3)]),
      multipartFile: new FormControl(null, [this.validateImages]),
      available: new FormControl(false)
    });
    this.proposalForm.valueChanges.subscribe(value => {
      this.proposal.proposalDescriptions[0].language = 'EN';
      this.proposal.proposalDescriptions[0].title = value.TitleEn;
      this.proposal.proposalDescriptions[0].headerText = value.HeaderTextareaEn;
      this.proposal.proposalDescriptions[0].mainText = value.textEn;
      this.proposal.proposalDescriptions[1].language = 'UK';
      this.proposal.proposalDescriptions[1].title = value.TitleUk;
      this.proposal.proposalDescriptions[1].headerText = value.HeaderTextareaUk;
      this.proposal.proposalDescriptions[1].mainText = value.textUk;
      this.proposal.proposalDescriptions[2].language = 'PL';
      this.proposal.proposalDescriptions[2].title = value.TitlePl;
      this.proposal.proposalDescriptions[2].headerText = value.HeaderTextareaPl;
      this.proposal.proposalDescriptions[2].mainText = value.textPl;
      this.proposal.proposalDescriptions[3].language = 'RU';
      this.proposal.proposalDescriptions[3].title = value.TitleRu;
      this.proposal.proposalDescriptions[3].headerText = value.HeaderTextareaRu;
      this.proposal.proposalDescriptions[3].mainText = value.textRu;
      this.proposal.available = value.available;
    });
  }

  addProposal(form: HTMLFormElement) {
    // console.log(this.proposal);
    this._proposalService.save(this.proposal, form).subscribe(next => {
      // console.log(next);
    }, error => {
      console.log(error);
    }, () => {
      this.image = null;
      form.reset();
      alert("Пропозиція добавлена")
    });
  }

  readUrl(event: any) {
    this.appear = false;
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.image = event.target.result;
        this.appear = true;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  validateImages(c: FormControl): { [key: string]: any } {
    return c.value == null || c.value.length == 0 ? {"required": true} : null;
  }

}
