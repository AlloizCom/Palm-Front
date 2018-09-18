import { Component, OnInit } from '@angular/core';
import {ProposalService} from "../../../../../shared/service/proposal.service";
import {Proposal} from "../../../../../shared/models/proposal";

@Component({
  selector: 'app-proposal-item',
  templateUrl: './proposal-item.component.html',
  styleUrls: ['./proposal-item.component.css'],
  providers:[ProposalService]
})
export class ProposalItemComponent implements OnInit {

  proposals:Proposal[]=[];

  constructor(private _proposalService:ProposalService) {
    this._proposalService.findAllAvailable().subscribe(next=>{
      this.proposals = next;
    })
  }

  ngOnInit() {
  }

}
