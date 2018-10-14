import {Component, OnInit} from '@angular/core';
import {ProposalService} from '../../../../shared/service/proposal.service';
import {Proposal} from '../../../../shared/models/proposal';
import {ActivatedRoute} from '@angular/router';
import {ImagePipePipe} from '../../../../shared/pipe/pipe/image.pipe';
import {isNullOrUndefined} from 'util';
import {LangSort} from '../../../../shared/models/utils/lang-sort';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.css'],
  providers: [ImagePipePipe, ProposalService]
})
export class ProposalComponent implements OnInit {

  proposal: Proposal;
  id: number;
  img: string = '';

  constructor(private _proposalService: ProposalService, private _router: ActivatedRoute, private _imagePipe: ImagePipePipe, private _translate: TranslateService) {
    // this.lang = this._translate.currentLang;
    // this._translate.onLangChange.subscribe(next=>{
    //   this.lang = next.lang;
    // });
    _router.params.subscribe(next => {
      _proposalService.findOneAvailable(next['id']).subscribe(next => {
        this.proposal = next;
        this.proposal.proposalDescriptions = LangSort.sort(this.proposal.proposalDescriptions);
        this.id = next['id'];
        this.img = this._imagePipe.transform(next.picturePath);
      }, error => {
        console.log(error);
      });
    });
  }

  ngOnInit() {
  }

  isNull(object: any): Boolean {
    if (Array.isArray(object)) {
      return !isNullOrUndefined(object[0]);
    } else {
      return !isNullOrUndefined(object);
    }
  }
}
