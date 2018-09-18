import {ProposalDescription} from "./proposal-description";

export class Proposal {

  id: number;
  available: boolean;
  picturePath: string;
  proposalDescriptions: ProposalDescription[] = [];

}
