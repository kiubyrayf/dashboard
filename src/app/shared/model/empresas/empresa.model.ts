import {Deserializable} from './deserializable.model';

export class EmpresaModel {
    constructor(
      public name: string,
      public logo: string,
      public email: string,
      public phoneNumber: number,
      public address: AddressModel,
      public contact: ContactModel,
      public servicesPrice: ServicePriceModel,
      public closingDocument: Array<ClosingDocumentModel>,
      public selfFormat?: boolean,
      public serviceWarranty?: boolean,
      public requestServiceByMail?: boolean,
    ) {}
  }

export class EmpresaModelNew implements Deserializable {
    constructor(
      public name: string,
      public logo: string,
      public email: string,
      public phoneNumber: number,
      public address: AddressModel,
      public contact: ContactModel,
      public servicesPrice: ServicePriceModel,
      public closingDocument: ClosingDocumentModel[],
      public selfFormat?: boolean,
      public serviceWarranty?: boolean,
      public requestServiceByMail?: boolean,
    ) {}

    deserialize(input: any) {
      Object.assign(this, input);
      return this;
    }
}

export class ClosingDocumentModel {
id: string;
name: string;
file: File;
}

export class ServicePriceModel {
foreign: number;
local: number;
viaticForeign: number;
viaticLocal: number;
visitNotRealized: number;
visitRealized: number;
endingPrice: number;
disscount: number;
}

export class ContactModel {
job: string;
phoneNumber: number;
email: string;
paymentPerson: string;
fax: number;
schedule: ScheduleModel;
}

export class ScheduleModel {
mondayStart: Date;
mondayEnd: Date;
tuesdayStart: Date;
tuesdayEnd: Date;
wednesdayStart: Date;
wednesdayEnd: Date;
thursdayStart: Date;
thursdayEnd: Date;
fridayStart: Date;
fridayEnd: Date;
saturdayStart: Date;
saturdayEnd: Date;
sundayStart: Date;
sundayEnd: Date;
}

export class AddressModel {
street: string;
number: string;
suburb: string;
cp: number;
municipality: string;
}
