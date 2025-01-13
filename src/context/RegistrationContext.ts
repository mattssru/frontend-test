import { createContext } from 'react';

export interface Registration {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  seat?: number;
}

export interface RegistrationContextType {
  registrations: Registration[];
  addUser: (user: Omit<Registration, "id">) => void;
  updateSeat: (id: string, seat: number) => void;
  availableSeats: number;
  totalSeats: number;
}

export const RegistrationContext = createContext<RegistrationContextType | null>(null);
