import React, { useState, useContext } from "react";
import { Form, Button, Schema } from "rsuite";
import { RegistrationContext } from "../context/RegistrationContext";

const model = Schema.Model({
  firstName: Schema.Types.StringType().isRequired(
    "Please enter your First name."
  ),
  lastName: Schema.Types.StringType().isRequired(
    "Please enter your Last name."
  ),
  phone: Schema.Types.StringType()
    .isRequired("Please enter your Phone number.")
    .pattern(/^[0-9]{10}$/, "The phone number must contain 10 digits."),
});

const RegistrationForm: React.FC = () => {
  const context = useContext(RegistrationContext);

  if (!context) {
    throw new Error("RegistrationContext is not available");
  }

  const { addUser } = context;

  const [formValue, setFormValue] = useState<{
    firstName: string;
    lastName: string;
    phone: string;
  }>({
    firstName: "",
    lastName: "",
    phone: "",
  });

  const handleSubmit = () => {
    const newUser = {
      id: new Date().getTime().toString(),
      ...formValue,
    };

    addUser(newUser);
    setFormValue({ firstName: "", lastName: "", phone: "" });
  };

  return (
    <Form
      model={model}
      formValue={formValue}
      onChange={(value: Partial<typeof formValue>) =>
        setFormValue((prev) => ({ ...prev, ...value }))
      }
      onSubmit={handleSubmit}
      fluid
    >
      <Form.Group>
        <Form.ControlLabel className="text-md font-medium">
          First name
        </Form.ControlLabel>
        <Form.Control
          name="firstName"
          placeholder="Please enter your first name..."
          className="h-12 !bg-neutral-100 !rounded-full !outline-none !shadow-none"
        />
      </Form.Group>

      <Form.Group>
        <Form.ControlLabel className="text-md font-medium">
          Last name
        </Form.ControlLabel>
        <Form.Control
          name="lastName"
          placeholder="Please enter your last name..."
          className="h-12 !bg-neutral-100 !rounded-full !outline-none !shadow-none"
        />
      </Form.Group>

      <Form.Group>
        <Form.ControlLabel className="text-md font-medium">
          Phone number
        </Form.ControlLabel>
        <Form.Control
          name="phone"
          placeholder="Please enter your hone number..."
          className="h-12 !bg-neutral-100 !rounded-full !outline-none !shadow-none"
        />
      </Form.Group>

      <Button
        appearance="primary"
        type="submit"
        className="!text-md !font-semibold !rounded-full w-24 h-11 !bg-violet-700"
      >
        Submit
      </Button>
    </Form>
  );
};

export default RegistrationForm;
