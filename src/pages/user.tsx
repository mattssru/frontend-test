import React, { useContext } from "react";
import TableView from "../components/TableView";
import RegistrationForm from "../components/RegistrationForm";
import { Card, Heading, Text } from "rsuite";
import CardResult from "../components/CardResult";
import { RegistrationContext } from "../context/RegistrationContext";
import { MdEventSeat } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";

const UserPage: React.FC = () => {
  const context = useContext(RegistrationContext);

  if (!context) {
    throw new Error("RegistrationContext is not available");
  }

  const { availableSeats, registrations } = context;
  return (
    <div className="mx-auto py-6 px-8">
      <h1 className="text-2xl font-bold mb-4">User register</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div>
          <Card className="p-6 !border-0 !rounded-2xl shadow-xl mb-5">
            <Heading level={2} className="text-2xl !font-semibold">
              Register
            </Heading>
            <Text muted className="!mb-6">
              Fill in the form below to register for work
            </Text>
            <RegistrationForm />
          </Card>
        </div>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <CardResult
              icon={MdEventSeat}
              number={availableSeats}
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
              List of collaborators
            </Heading>
            <TableView isAdmin={false} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
