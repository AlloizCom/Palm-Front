import {ServiceDescription} from "./service-description";

export class Service {

  id: number;
  available: boolean;
  showOnTop: boolean;
  picturePath: string;
  name: string;
  serviceDescriptions: ServiceDescription[] = [];

}
