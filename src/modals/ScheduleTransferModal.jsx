import React, { useRef, useState } from "react";
import AppModal from "../components/Modal/AppModal";
import { Field, Form, Formik } from "formik";
import { ComboSelect, Input, PinInput, TextArea } from "../components/Fields";
import Button from "../components/bits/Button";
import * as Yup from "yup";

export default function ScheduleTransferModal({ modal, closeModal }) {
  const formRef = useRef();
  const [error, setError] = useState();
  const [pin, setPin] = useState();

  const initialValues = {
    amount: "",
    beneficiary: "",
    account: "",
  };

  const initialValues2 = {
    method: "",
    description: "",
  };

  const initialValues3 = {
    pin: "",
  };
  const validateSchema = Yup.object().shape({
    amount: Yup.string().required("Amount is required!"),
    beneficiary: Yup.string().required("Beneficiary Number is required!"),
    account: Yup.string().required("Account is required!"),
  });

  const validateSchema2 = Yup.object().shape({
    method: Yup.string().required("Method is required!"),
    description: Yup.string().required("Description is required!"),
  });
  const validateSchema3 = Yup.object().shape({
    pin: Yup.string().required("Pin is required!"),
  });

  const [steps, setSteps] = useState(0);

  return (
    <AppModal
      modalState={modal}
      heading="Schedule Transfer"
      desc="To send money, provide the details below"
      closeModal={closeModal}
    >
      <div
        className={
          (steps === 0 &&
            "opacity-1 pointer-events-auto relative  transition-all") ||
          "opacity-0 pointer-events-none absolute top-0 transition-all"
        }
      >
        <Formik
          innerRef={formRef}
          initialValues={initialValues}
          validationSchema={validateSchema}
          onSubmit={() => {
            setSteps(1);
          }}
        >
          {({ isSubmitting, isValid, values }) => (
            <div className="flex-[1] py-[0]">
              <Form className="mt-10">
                <Input
                  error={error}
                  showError={error}
                  label="Amount"
                  type="number"
                  name="amount"
                  placeHolder="Enter Amount"
                />
                <ComboSelect
                  options={[{ name: "Airtime" }, { name: "Bills Payment" }]}
                  optionLabel="name"
                  optionValue="name"
                  label="Select Transaction Type"
                  placeholder="Choose Transaction Type"
                  name="beneficiary"
                />
                <ComboSelect
                  disabled={!values.beneficiary}
                  options={[{ name: "Airtime" }, { name: "Bills Payment" }]}
                  optionLabel="name"
                  optionValue="name"
                  label="Select Bills Category"
                  placeholder="Choose Category"
                  name="merchant"
                />
                <Input
                  error={error}
                  showError={error}
                  label="Email"
                  type="email"
                  name="account"
                  placeHolder="Enter Email"
                />
                <div className="border-dashed border rounded-lg border-[#a3a3a3c1]">
                  <div className="p-6 flex justify-between items-center border-b border-[#d7d7d783]">
                    <div>
                      <div className="text-sm text-[#6A6A6A]">
                        Account Number
                      </div>
                      <div className="text-lg">0123456789</div>
                    </div>
                    <div>
                      <div className="text-sm text-[#6A6A6A] text-right">
                        Bank Name
                      </div>
                      <div className="text-lg">Guarantee Trust Bank</div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div>
                      <div className="text-sm text-[#6A6A6A]">
                        Beneficiary Name
                      </div>
                      <div className="text-lg">Daniel Adekoya</div>
                    </div>
                  </div>
                </div>
                <Button
                  text="PROCEED"
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
      </div>
      <div
        className={
          (steps === 1 && "opacity-1 pointer-events-auto transition-all") ||
          "opacity-0 pointer-events-none absolute top-0 transition-all"
        }
      >
        <Formik
          innerRef={formRef}
          initialValues={initialValues2}
          validationSchema={validateSchema2}
          onSubmit={() => {
            setSteps(2);
          }}
        >
          {({ isSubmitting, isValid }) => (
            <div className="flex-[1] py-[0]">
              <Form className="mt-10">
                <ComboSelect
                  options={[{ name: "hi" }, { name: "ho" }]}
                  optionLabel="name"
                  optionValue="name"
                  label="Payment Method"
                  placeholder="Choose Category"
                  name="method"
                />
                <TextArea
                  error={error}
                  showError={error}
                  label="Description"
                  type="email"
                  name="description"
                  placeHolder="Enter"
                />

                <Button
                  text="PROCEED"
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
      </div>
      <div
        className={
          (steps === 2 && "opacity-1 pointer-events-auto transition-all") ||
          "opacity-0 pointer-events-none absolute top-0 transition-all"
        }
      >
        <Formik
          innerRef={formRef}
          initialValues={initialValues2}
          validationSchema={validateSchema2}
          onSubmit={() => {
            setSteps(3);
          }}
        >
          {({ isSubmitting, isValid, values }) => (
            <div className="flex-[1] py-[0]">
              <Form className="mt-10">
                <PinInput
                  name="pin"
                  label="Enter 4 digit pin"
                  // label=""
                  numInputs={4}
                />

                <Button
                  text="PROCEED"
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
      </div>
    </AppModal>
  );
}
