export interface IDivision {
    businessId?: number;
    id?: number;
    name: string;
    contact: IcontactDivision[];
}

export interface IcontactDivision {
    id?: number;
    job: string;
    phoneNumber: string;
    email: string;
    paymentPerson: string;
    fax: string;
    schedule: {
        id?: number;
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