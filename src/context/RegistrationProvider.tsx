import React, { useState, useEffect } from "react";
import { Registration, RegistrationContext } from "./RegistrationContext";

interface RegistrationProviderProps {
  children: React.ReactNode;
}

const TOTAL_SEATS = 15;

export const RegistrationProvider: React.FC<RegistrationProviderProps> = ({
  children,
}) => {
  const mockRegistrations = [
    { id: "1", firstName: "Emily", lastName: "Clark", phone: "0891234567" },
    { id: "2", firstName: "Michael", lastName: "Johnson", phone: "0899876543" },
    { id: "3", firstName: "Sarah", lastName: "Williams", phone: "0895555555" },
    { id: "4", firstName: "David", lastName: "Brown", phone: "0896666666" },
    { id: "5", firstName: "Sophia", lastName: "Davis", phone: "0897777777" },
    { id: "6", firstName: "James", lastName: "Wilson", phone: "0898888888" },
    {
      id: "7",
      firstName: "Isabella",
      lastName: "Martinez",
      phone: "0899999999",
    },
    { id: "8", firstName: "Daniel", lastName: "Taylor", phone: "0892223333" },
    { id: "9", firstName: "Mia", lastName: "Anderson", phone: "0894445555" },
    { id: "10", firstName: "William", lastName: "Thomas", phone: "0896667777" },
  ];
  const [registrations, setRegistrations] = useState<Registration[]>(() => {
    const storedData = localStorage.getItem("registrations");
    return storedData ? JSON.parse(storedData) : mockRegistrations;
  });

  const [totalSeats] = useState(TOTAL_SEATS);
  const [availableSeats, setAvailableSeats] = useState(() => {
    const storedSeats = localStorage.getItem("availableSeats");
    return storedSeats
      ? parseInt(storedSeats, 10)
      : TOTAL_SEATS - mockRegistrations.length;
  });

  const updateSeat = (id: string, seat: number): string | null => {
    if (seat < 1 || seat > 50) {
      return `กรุณากรอกหมายเลขที่นั่งระหว่าง 1 ถึง 50`;
    }
    const isSeatTaken = registrations.some(
      (reg) => reg.seat === seat && reg.id !== id
    );
    if (isSeatTaken) {
      return `ที่นั่งหมายเลข ${seat} ถูกจองไปแล้ว`;
    }
    setRegistrations((prev) =>
      prev.map((registration) =>
        registration.id === id ? { ...registration, seat } : registration
      )
    );
    return null;
  };

  useEffect(() => {
    localStorage.setItem("registrations", JSON.stringify(registrations));
    localStorage.setItem("availableSeats", availableSeats.toString());
  }, [registrations, availableSeats]);

  const addUser = (user: Omit<Registration, "id">) => {
    if (availableSeats > 0) {
      const maxId = registrations.length
        ? Math.max(...registrations.map((reg) => parseInt(reg.id, 10)))
        : 0;
      const newUser = { ...user, id: (maxId + 1).toString() };
      setRegistrations([...registrations, newUser]);
      setAvailableSeats((prev) => prev - 1);
    } else {
      alert("No seats available!");
    }
  };

  return (
    <RegistrationContext.Provider
      value={{
        registrations,
        addUser,
        availableSeats,
        totalSeats,
        updateSeat,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};
