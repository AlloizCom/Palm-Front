import {ServiceDescription} from "./service-description";

export class Service {

  id: number;
  available: boolean;
  image: string;
  name: string;
  serviceDescriptions: ServiceDescription[] = [];

}
