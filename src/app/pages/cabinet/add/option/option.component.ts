import {Component, OnInit} from '@angular/core';
import {ServiceDescription} from '../../../../shared/models/service-description';
import {Service} from '../../../../shared/models/service';
import {ServiceService} from '../../../../shared/service/service.service';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css'],
  providers:[ServiceService]
})
export class OptionComponent implements OnInit {

  service: Service = new Service();
  description: ServiceDescription[] = [];
  allService: Service[] = [];

  constructor(private _serviceService: ServiceService) {
    this.description = [new ServiceDescription(), new ServiceDescription(), new ServiceDescription(), new ServiceDescription()];
    this.service.serviceDescription = this.description;
  }

  ngOnInit() {
    this._serviceService.findAll().subscribe(value => {
      this.allService = value;
      console.log(value);
    });
  }

  addDescr(title: string, header: string, text: string, index: number) {
    switch (index) {
      case 0: {
        this.service.serviceDescription[index].language = 'EN';
        this.service.serviceDescription[index].title = title;
        this.service.serviceDescription[index].headerText = header;
        this.service.serviceDescription[index].mainText = text;
        break;
      }
      case 1: {
        this.service.serviceDescription[index].language = 'UK';
        this.service.serviceDescription[index].title = title;
        this.service.serviceDescription[index].headerText = header;
        this.service.serviceDescription[index].mainText = text;
        break;
      }
      case 2: {
        this.service.serviceDescription[index].language = 'PL';
        this.service.serviceDescription[index].title = title;
        this.service.serviceDescription[index].headerText = header;
        this.service.serviceDescription[index].mainText = text;
        break;
      }
      case 3: {
        this.service.serviceDescription[index].language = 'RU';
        this.service.serviceDescription[index].title = title;
        this.service.serviceDescription[index].headerText = header;
        this.service.serviceDescription[index].mainText = text;
        break;
      }
    }
  }

  addservice(form: HTMLFormElement) {
    this._serviceService.save(this.service, form).subscribe(next => {
      console.log(next);
    }, error => {
      console.log(error);
    }, () => {
      form.reset();
      this.getService();
    });
  }

  getService() {
    this._serviceService.findAll().subscribe(value => {
      this.allService = value;
      console.log(value);
    });
  }

}
