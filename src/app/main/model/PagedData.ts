export class PagedData<T> {
    // [x: string]: any;
    //The number of elements in the page
    size: number;
    //Data
    data = new Array<T>();
    //The total number of elements
    totalItems: number = 0;
    //The total number of pages
    totalPages: number = 0;
    //The current page number
    currentPage: number = 0;
}
