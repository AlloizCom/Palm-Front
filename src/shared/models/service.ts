import {ServiceDescription} from "./service-description";

export class Service {

  id: number;
  available: boolean;
  picturePath: string;
  name: string;
  serviceDescriptions: ServiceDescription[] = [];

}
