export class EmpresaModel {
    name: string;
    contact: {
        job: string;
		phoneNumber: number;
		email: string;
		paymentPerson: string;
		fax: number;
		schedule: {
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
        };
    };
    email: string;
    phoneNumber: number;
    address: {
		street: string;
		number: string;
		suburb: string;
		cp: number;
		municipality: string;
    };
    requestServiceByMail: boolean;
    servicesPrice: {
        foreign: number;
		local: number;
		viaticForeign: number;
		viaticLocal: number;
		visitNotRealized: number;
		visitRealized: number;
		endingPrice: number;
		disscount: number;
    };
    closingDocument: {
            id: string;
            closingDocumentTotal: number;
            closingDocument_1: File;
        }; // noe se que onda aqui;
    serviceWarranty: boolean;
    logo: File;
    selfFormat: boolean;

    constructor() {}
  }
