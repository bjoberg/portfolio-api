export default interface PaginationResponse {
  totalItems: number;
  pageCount: number;
  page: number;
  limit: number;
  rows: [];
}