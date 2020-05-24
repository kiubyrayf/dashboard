export interface BusinessInterface {
    id: number;
    name: string;
    contact: IContact[];
    email: string;
    phoneNumber: string;
    address: {
        id: number;
        street: string;
        number: string;
        suburb: string;
        cp: string;
        municipality: string;
        scheduleStart: string;
        scheduleEnd: string;
    };
    logo: string;
    selfFormat: boolean;
    requestServiceByMail: boolean;
    closingDocument: [{
        id: number;
        name: string;
        file: string;
    }];
    buyOrder: [{
        id: number;
        name: string;
        file: string;
    }];
    comentary: [{
        id: number;
        text: string;
        owner: {
            firstName: string;
            middleName: string;
            lastName: string;
            email: string
        }; // sepaararlo para aqui
    }];
    servicesPriceChecker: {
        id: number;
        foreign: string;
        local: string;
        viaticForeign: string;
        viaticLocal: string;
        visitNotRealized: string;
        visitRealized: string;
    };
    owner: {
        id: number;
        photography: string;
        firstName: string;
        middleName: string;
        lastName: string;
        email: string
    };
    serviceWarranty: boolean;
    services: [{
        id: number;
        priceStart: string;
        priceEnd: string;
        priceDisscount: string;
    }];
}

export interface IContact {
    id: number; // se pone el id
    job: string;
    phoneNumber: string; // falto esto
    email: string;
    paymentPerson: string;
    fax: string;
    schedule: {
        id: string;
        mondayStart: string;
        mondayEnd: string;
        tuesdayStart: string;
        tuesdayEnd: string;
        wednesdayStart: string;
        wednesdayEnd: string;
        thursdayStart: string;
        thursdayEnd: string;
        fridayStart: string;
        fridayEnd: string;
        saturdayStart: string;
        saturdayEnd: string;
        sundayStart: string;
        sundayEnd: string;
    };
}
