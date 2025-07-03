export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions?: string[];
  [key: string]: unknown;
}
