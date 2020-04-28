export class EmpresaModel {
    name: string;
    contact: ContactModel;
    email: string;
    phoneNumber: number;
    address: AddressModel;
    requestServiceByMail: boolean;
    servicesPrice: ServicePriceModel;
    closingDocument: Array<ClosingDocumentModel>;
    serviceWarranty: boolean;
    logo: File;
    selfFormat: boolean;

    constructor() {}
  }

export class EmpresaModelNew {
    name: string;
    contact: ContactModel;
    email: string;
    phoneNumber: number;
    address: AddressModel;
    requestServiceByMail: boolean;
    servicesPrice: ServicePriceModel;
    closingDocument: ClosingDocumentModel;
    serviceWarranty: boolean;
    logo: File;
    selfFormat: boolean;

    constructor() {}
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
