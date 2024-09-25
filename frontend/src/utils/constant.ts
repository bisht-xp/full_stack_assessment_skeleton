export interface User {
  id: number;
  username: string;
  email: string;
}


export interface Home {
  id: number;
  street_address: string;
  state: string;
  city: string;
  zip_code: string;
  price: string;
  num_bedrooms: number;
  num_bathrooms: number;
}