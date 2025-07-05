export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone_number?: string;
  country?: string;
  permissions?: string[];
  [key: string]: unknown;
}
