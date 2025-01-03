import React, { useState, useEffect } from "react";
import { Registration, RegistrationContext } from "./RegistrationContext";

interface RegistrationProviderProps {
  children: React.ReactNode;
}

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

  // State สำหรับเก็บข้อมูลลงทะเบียน
  const [registrations, setRegistrations] = useState<Registration[]>(() => {
    const storedData = localStorage.getItem("registrations");
    return storedData ? JSON.parse(storedData) : mockRegistrations; // ใช้ Mock Data ถ้าไม่มีใน LocalStorage
  });

  // State สำหรับที่นั่งที่เหลือ
  const [availableSeats, setAvailableSeats] = useState(() => {
    const storedSeats = localStorage.getItem("availableSeats");
    return storedSeats
      ? parseInt(storedSeats, 10)
      : 50 - mockRegistrations.length; // คำนวณจำนวนที่นั่งเหลือจาก Mock Data
  });

  // ฟังก์ชันสำหรับอัปเดตที่นั่ง
  const updateSeat = (id: string, seat: number) => {
    setRegistrations((prev) =>
      prev.map((registration) =>
        registration.id === id ? { ...registration, seat } : registration
      )
    );
  };

  // บันทึกข้อมูลลง Local Storage เมื่อ `registrations` หรือ `availableSeats` เปลี่ยนแปลง
  useEffect(() => {
    localStorage.setItem("registrations", JSON.stringify(registrations));
    localStorage.setItem("availableSeats", availableSeats.toString());
  }, [registrations, availableSeats]);

  // ฟังก์ชันสำหรับเพิ่มผู้ใช้ใหม่
  const addUser = (user: Omit<Registration, "id">) => {
    if (availableSeats > 0) {
      const maxId = registrations.length
        ? Math.max(...registrations.map((reg) => parseInt(reg.id, 10)))
        : 0; // หา id สูงสุดใน registrations
      const newUser = { ...user, id: (maxId + 1).toString() }; // เพิ่ม id ใหม่
      setRegistrations([...registrations, newUser]);
      setAvailableSeats((prev) => prev - 1); // ลดจำนวนที่นั่ง
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
        updateSeat,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};
