import { Component, OnInit } from '@angular/core';
import {Proposal} from "../../../../shared/models/proposal";
import {ProposalService} from "../../../../shared/service/proposal.service";

@Component({
  selector: 'app-proposal-update',
  templateUrl: './proposal-update.component.html',
  styleUrls: ['./proposal-update.component.css'],
  providers:[ProposalService]
})
export class ProposalUpdateComponent implements OnInit {

  proposal: Proposal[] = [];

  constructor(private _proposalService: ProposalService) {
    _proposalService.findAll().subscribe(next => {
        this.proposal = next;
        console.log(this.proposal)
      }
    ), error => {
      console.log(error)
    }
  }

  deleteService(i){
    this._proposalService.delete(i).subscribe(next =>{
      this._proposalService.findAll().subscribe(value => {
        this.proposal = value;
        console.log(value);
      });
    }), error => {
      console.log(error);
    }
  }


  ngOnInit() {
  }

}
