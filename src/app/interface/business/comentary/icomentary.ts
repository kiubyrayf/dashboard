export interface IComentary {
    id: number;
    text: string;
    owner: {
        firstName: string;
        middleName: string;
        lastName: string;
        email: string;
    };
    dateCreate: string;
    dateUpdate: string;
    dateDelete: string;
}
