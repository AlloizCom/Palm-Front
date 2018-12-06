import {Component, OnInit} from '@angular/core';
import {ProposalService} from "../../../../../shared/service/proposal.service";
import {Proposal} from "../../../../../shared/models/proposal";
import {LangSort} from "../../../../../shared/models/utils/lang-sort";

@Component({
  selector: 'app-proposal-item',
  templateUrl: './proposal-item.component.html',
  styleUrls: ['./proposal-item.component.css'],
  providers: [ProposalService]
})
export class ProposalItemComponent implements OnInit {

  proposals: Proposal[] = [];

  constructor(private _proposalService: ProposalService) {
    this._proposalService.findAllAvailable().subscribe(next => {
      this.proposals = next;
      for (let i = 0; i < this.proposals.length; i++) {
        this.proposals[i].proposalDescriptions = LangSort.sort(this.proposals[i].proposalDescriptions);
      }
    })
  }

  ngOnInit() {
  }

}
