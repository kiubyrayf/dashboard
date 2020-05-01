export interface BusinessInterface {
    name: string;
    contact: {
        job: string;
        phoneNumber: string;
        email: string;
        paymentPerson: string;
        fax: string;
        schedule: {
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
        }
    };
    email: string;
    phoneNumber: string;
    address: {
        street: string;
        number: string;
        suburb: string;
        cp: string;
        municipality: string;
    };
    logo: string;
    selfFormat: boolean;
    requestServiceByMail: boolean;
    [closingDocument: number]: {
        id: number;
        name: string;
        file: string;
    } | null;
    servicesPrice: {
        foreign: string;
        local: string;
        viaticForeign: string;
        viaticLocal: string;
        visitNotRealized: string;
        visitRealized: string;
        endingPrice: string;
        disscount: string;
    };
    idOwner: {
        id: number;
        photography: string;
        firstName: string;
        middleName: string;
        lastName: string;
        email: string
    } | null;
    serviceWarranty: boolean;
}

