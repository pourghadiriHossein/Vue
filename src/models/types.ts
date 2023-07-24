export class FetchResponse<model> {
  meta?: {
    pagination?: {
      [key: string]: {
        per_page?: number;
        total?: number;
        first_item?: number;
        last_item?: number;
        last_page?: number;
        current_page?: number;
      };
    };
  };
  [key: string]: Array<model>;
}
