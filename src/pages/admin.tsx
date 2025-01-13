import React, { useContext } from "react";
import TableView from "../components/TableView";
import { Card, Heading } from "rsuite";
import CardResult from "../components/CardResult";
import { RegistrationContext } from "../context/RegistrationContext";
import { MdEventSeat } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";

const AdminPage: React.FC = () => {
  const context = useContext(RegistrationContext);

  if (!context) {
    throw new Error("RegistrationContext is not available");
  }

  const { availableSeats, registrations, totalSeats } = context;
  return (
    <div className="mx-auto py-6 px-8">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <CardResult
          icon={MdEventSeat}
          number={`${availableSeats}/${totalSeats}`}
          description="จำนวนที่นั่งคงเหลือ"
        />
        <CardResult
          icon={FaUsers}
          number={registrations.length}
          description="จำนวนคนลงทะเบียน"
        />
      </div>
      <Card className="p-6 !border-0 !rounded-2xl shadow-xl">
        <Heading level={2} className="text-2xl !mb-6 !font-semibold">
          List User
        </Heading>
        <TableView isAdmin />
      </Card>
    </div>
  );
};

export default AdminPage;
