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
import { Switch } from "@mui/material";

export default function TransactionNotificationsModal({ modal, closeModal }) {
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
      heading="Notification"
      desc="Select your preferred transaction notification below "
      closeModal={closeModal}
      walletBalance={false}
    >
      {/* <Formik
        innerRef={formRef}
        initialValues={initialValues}
        validationSchema={validateSchema}
        onSubmit={() => {}}
      >
        {({ isSubmitting, isValid }) => (
          <div className="flex-[1] py-[0]">
            <Form className="mt-10">
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
      </Formik> */}

      <div className="mb-10">
        <div className="text-[#004663]">Credits Alerts</div>

        <div className="flex justify-between items-center border-b border-[#dfdfdf] py-2">
          <span>Allow Email Credit Notifications</span> <Switch />{" "}
        </div>
        <div className="flex justify-between items-center border-b border-[#dfdfdf] py-2">
          <span>Allow SMS Credit Notifications</span> <Switch />{" "}
        </div>
      </div>

      <div className="mb-10">
        <div className="text-[#004663]">Debit Alerts</div>

        <div className="flex justify-between items-center border-b border-[#dfdfdf] py-2">
          <span>Allow Email Debit Notifications</span> <Switch />{" "}
        </div>
        <div className="flex justify-between items-center border-b border-[#dfdfdf] py-2">
          <span>Allow SMS Debit Notifications</span> <Switch />{" "}
        </div>
      </div>
    </AppModal>
  );
}
