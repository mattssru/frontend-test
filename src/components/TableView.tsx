import React, { useContext, useState } from "react";
import { Button, Form, InputGroup, Modal, Table } from "rsuite";
import { RegistrationContext } from "../context/RegistrationContext";
import EditIcon from "@rsuite/icons/Edit";
import SearchIcon from "@rsuite/icons/Search";

const { Column, HeaderCell, Cell } = Table;

interface TableViewProps {
  isAdmin: boolean;
}

const TableView: React.FC<TableViewProps> = ({ isAdmin }) => {
  const [selectedUser, setSelectedUser] = React.useState<{
    id: string;
    seat?: number;
  } | null>(null);
  const [modalSeats, setModalSeats] = React.useState(false);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortType, setSortType] = useState<"asc" | "desc" | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);
  const [newSeat, setNewSeat] = React.useState<number | undefined>(undefined);
  const [search, setSearch] = useState<string>("");

  const context = useContext(RegistrationContext);

  if (!context) {
    throw new Error("RegistrationContext is not available");
  }

  const { registrations, updateSeat } = context;
  console.log("registrations :>> ", registrations);

  const getFilteredData = () => {
    const lowercasedSearch = search.toLowerCase();
    return registrations.filter(
      (reg) =>
        reg.firstName.toLowerCase().includes(lowercasedSearch) ||
        reg.lastName.toLowerCase().includes(lowercasedSearch) ||
        reg.phone.includes(lowercasedSearch)
    );
  };

  const getSortedData = () => {
    const filteredData = getFilteredData();
    if (sortColumn && sortType) {
      return [...filteredData].sort((a, b) => {
        const x = a[sortColumn as keyof typeof a];
        const y = b[sortColumn as keyof typeof b];

        if (typeof x === "string" && typeof y === "string") {
          return sortType === "asc" ? x.localeCompare(y) : y.localeCompare(x);
        } else if (typeof x === "number" && typeof y === "number") {
          return sortType === "asc" ? x - y : y - x;
        }
        return 0;
      });
    }
    return filteredData;
  };

  const handleSortColumn = (
    sortColumn: string | undefined,
    sortType: "asc" | "desc" | undefined
  ) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn || null);
      setSortType(sortType);
    }, 500);
  };

  const handleEditSeat = (rowData: { id: string; seat?: number }) => {
    setSelectedUser(rowData);
    setNewSeat(rowData.seat || undefined);
    setModalSeats(true);
  };

  const handleConfirmSeat = () => {
    if (!selectedUser || newSeat === undefined) {
      alert("กรุณาเลือกผู้ใช้งานและกรอกหมายเลขที่นั่ง");
      return;
    }

    const isSeatTaken = registrations.some(
      (reg) => reg.seat === newSeat && reg.id !== selectedUser.id
    );

    if (isSeatTaken) {
      alert(`ที่นั่งหมายเลข ${newSeat} ถูกใช้งานแล้ว`);
      return;
    }

    updateSeat(selectedUser.id, newSeat);
    setModalSeats(false);
    alert(`กำหนดที่นั่งหมายเลข ${newSeat} สำเร็จ`);
  };

  return (
    <>
      <Form>
        <Form.Group controlId={"input-1"} className="flex justify-end mb-4">
          <InputGroup inside className="!border-gray-600">
            <Form.Control
              name="input-1"
              placeholder="Search..."
              className="h-11 !outline-none !shadow-none"
              value={search}
              onChange={(value) => setSearch(value)}
            />
            <InputGroup.Addon>
              <SearchIcon />
            </InputGroup.Addon>
          </InputGroup>
        </Form.Group>
      </Form>
      <Table
        data={getSortedData()}
        sortColumn={sortColumn || undefined}
        sortType={sortType}
        onSortColumn={handleSortColumn}
        loading={loading}
        bordered
        cellBordered
        height={500}
      >
        <Column sortable width={60} align="center" fixed="left">
          <HeaderCell>#</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column sortable flexGrow={2} minWidth={170} fullText>
          <HeaderCell>First Name</HeaderCell>
          <Cell dataKey="firstName" />
        </Column>

        <Column sortable flexGrow={2} minWidth={170} fullText>
          <HeaderCell>Last Name</HeaderCell>
          <Cell dataKey="lastName" />
        </Column>

        <Column sortable flexGrow={1} minWidth={120} fullText>
          <HeaderCell>Phone Number</HeaderCell>
          <Cell dataKey="phone" />
        </Column>
        {isAdmin && (
          <Column sortable align="center" width={100}>
            <HeaderCell>Seat Number</HeaderCell>
            <Cell dataKey="seat" />
          </Column>
        )}

        {isAdmin && (
          <Column width={70} align="center" fixed="right">
            <HeaderCell>Action</HeaderCell>
            <Cell>
              {(rowData: { id: string; seat?: number }) => (
                <Button
                  appearance="link"
                  onClick={() => handleEditSeat(rowData)}
                >
                  <EditIcon color="#000" />
                </Button>
              )}
            </Cell>
          </Column>
        )}
      </Table>
      <Modal open={modalSeats} onClose={() => setModalSeats(false)}>
        <Modal.Header>
          <Modal.Title className="!font-semibold">
            กำหนดที่นั่งผู้่ร่วมงาน
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            fluid
            onSubmit={handleConfirmSeat}
            formValue={{ seat: newSeat }}
            onChange={(formValue) => setNewSeat(formValue.seat)}
          >
            <Form.Group>
              <Form.ControlLabel>Seat Number</Form.ControlLabel>
              <Form.Control
                name="seat"
                placeholder="Enter seat number"
                type="number"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleConfirmSeat}
            appearance="primary"
            className="!text-md !font-semibold !rounded-full w-24 h-11 !bg-violet-700"
          >
            Confirm
          </Button>
          <Button
            onClick={() => setModalSeats(false)}
            appearance="subtle"
            className="!text-md !font-semibold !rounded-full w-24 h-11 !bg-gray-200"
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TableView;
