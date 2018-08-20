import {ServiceDescription} from "./service-description";

export class Service {

  id: number;
  available: boolean;
  name: string;
  serviceDescription: ServiceDescription[] = [];

}
