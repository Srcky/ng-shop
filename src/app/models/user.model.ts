export interface User {
  orders: [];
  id: number;
  name: {
    firstName: string;
    lastName: string;
  };
  phone: number;
  avatar: string;
  email: string;
  address: {
    country: string;
    city: string;
    zip: string;
    street: string;
  };
  role: 'ADMIN' | 'CUSTOMER';
}
