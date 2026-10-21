import React, { useRef, useState } from "react";
import AppModal from "../components/Modal/AppModal";
import { Field, Form, Formik } from "formik";
import {
  ComboSelect,
  Input,
  Password,
  PinInput,
  TextArea,
} from "../components/Fields";
import Button from "../components/bits/Button";
import * as Yup from "yup";

export default function ResetPinModal({ modal, closeModal }) {
  const formRef = useRef();
  const [error, setError] = useState();
  const [pin, setPin] = useState();

  const initialValues = {
    otp: "",
    new_pin: "",
    confirm_pin: "",
  };

  const validateSchema = Yup.object().shape({
    otp: Yup.string().required("Otp is required!"),
    new_pin: Yup.string().required("Pin is required!"),
    confirm_pin: Yup.string()
      .required("Pin is required!")
      .oneOf([Yup.ref("new_pin")], "Pins do not match"),
  });

  return (
    <AppModal
      modalState={modal}
      heading="Reset PIN"
      desc="Provide the required info below to reset 
      your pin."
      closeModal={closeModal}
      walletBalance={false}
    >
      <Formik
        innerRef={formRef}
        initialValues={initialValues}
        validationSchema={validateSchema}
        onSubmit={() => {}}
      >
        {({ isSubmitting, isValid }) => (
          <div className="flex-[1] py-[0]">
            <Form className="mt-10">
              <Input
                error={error}
                showError={error}
                label="Enter OTP"
                type="number"
                name="otp"
                placeHolder="Enter otp"
              />

              <PinInput
                name="new_pin"
                label="Enter New 4 digit pin"
                // label=""
                numInputs={4}
              />
              <PinInput
                name="confirm_pin"
                label="Confirm New 4 digit pin"
                // label=""
                numInputs={4}
              />

              <Button
                text="UPDATE"
                background="#F58220"
                color="#ffffff"
                style={{ flexDirection: "row-reverse", marginTop: "4rem" }}
                height="50px"
                fontSize="13px"
              />
            </Form>
          </div>
        )}
      </Formik>
    </AppModal>
  );
}
