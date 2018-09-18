import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ImagePipePipe} from "../../../../../shared/pipe/pipe/image.pipe";
import {ActivatedRoute} from "@angular/router";
import {Proposal} from "../../../../../shared/models/proposal";
import {ProposalService} from "../../../../../shared/service/proposal.service";

@Component({
  selector: 'app-proposal-one',
  templateUrl: './proposal-one.component.html',
  styleUrls: ['./proposal-one.component.css'],
  providers:[ProposalService, ImagePipePipe]
})
export class ProposalOneComponent implements OnInit {

  proposalUpdateForm: FormGroup;
  proposal: Proposal = new Proposal();
  img: string = '';
  descriptions:FormArray;

  constructor(private _router: ActivatedRoute, private _proposalService: ProposalService, private _imagePipe: ImagePipePipe) {
    _router.params.subscribe(next => {
      _proposalService.findOne(next['id']).subscribe(next => {
        this.proposal = next;
        console.log(next);
        this.img = this._imagePipe.transform(next.picturePath);
      })
    })
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.img = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  ngOnInit() {

    this._router.params.subscribe(next => {
      this.descriptions = new FormArray([
        this.getFormGroupDescription(),
        this.getFormGroupDescription(),
        this.getFormGroupDescription(),
        this.getFormGroupDescription(),
      ]);

      this.proposalUpdateForm = new FormGroup({
        id: new FormControl(),
        amenityDescriptions: this.descriptions,
        available: new FormControl(null),
        picturePath: new FormControl(''),
        proposalDescriptions: this.descriptions,
      });
      this.proposalUpdateForm.valueChanges.subscribe(next => {
        this.proposal= next;
        console.log('Value ', next)
      });
      this._proposalService.findOne(next['id']).subscribe(next => {
        console.log(next);
        this.proposal = next;
        this.proposalUpdateForm.patchValue(<any>next);
      }, err => {
        console.error(err);
      });
    })

  }
  update(form) {
    console.log(this.proposal);
    this._proposalService.update(this.proposal, form).subscribe(next => {
      this.proposal = next;
      this.proposalUpdateForm.patchValue(<any>next);
    }, error => {
      console.log(error);
    })
  }
  private getFormGroupDescription() {
    return new FormGroup({
      language: new FormControl(''),
      title: new FormControl('', Validators.required),
      headerText: new FormControl('', Validators.required),
      mainText: new FormControl('', Validators.required),
      id:new FormControl(),
      available:new FormControl(),
    });
  }

}
