export interface HttpInterface {
    status: number;
    message: any;
    data: any;
    pages: {
        currentPage: number,
        nextPage: number,
        previousPage: number,
        totalRegisters: number,
        totalPages: number
    };
}
