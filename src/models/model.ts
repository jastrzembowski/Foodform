export interface Product {
  name: String;
  preparation_time: any;
  type?: string;
  no_of_slices?: number | undefined;
  diameter?: number;
  spiciness_scale?: number | undefined;
  slices_of_bread?: number;
  id: number;
}
export interface Errors {
  name?: String;
  preparation_time?: String;
  type?: String;
  no_of_slices?: String;
  diameter?: String;
  spiciness_scale?: String;
  slices_of_bread?: String;
}
export interface OrderState {
  list: Product[];
  status: string;
}
