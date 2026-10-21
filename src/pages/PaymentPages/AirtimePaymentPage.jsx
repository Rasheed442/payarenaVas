import React, { useRef, useState, useEffect } from "react";
import Button from "../../components/bits/Button";
import * as Yup from "yup";
import { ComboSelect, Input } from "../../components/Fields";
import { useLocation } from "react-router-dom";
import { Form, Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import {
  catalogActions,
  catalogSelector,
} from "../../store/services/catalog/catalog.service";
import {
  validateProduct,
  processProduct,
} from "../../store/api/catalog/validateProduct";
import { TailSpin } from "react-loader-spinner";
import {
  validateActions,
  validateSelector,
} from "../../store/services/catalog/validate.service";
import { toast } from "sonner";

const AirtimePaymentPage = () => {
  const formRef = useRef();
  const [error, setError] = useState();
  const [disableField, setdisableField] = useState(false);
  const location = useLocation();

  const initialValues = {
    Amount: "",
    VendorParameterValue: "",
    EmailAddress: "",
    ProductId: "",
  };
  const validateSchema = Yup.object().shape({
    Amount: Yup.string().required("Amount is required!"),
    VendorParameterValue: Yup.string()
      .trim()
      .required("Phone Number is required!"),
    EmailAddress: Yup.string().required("Email is required!"),
    ProductId: Yup.string().required("Selec a product"),
  });

  const dispatch = useDispatch();

  const { billerData, selectedBiller, billerIsLink } = useSelector(
    catalogSelector
  );

  const selectOption = () => {
    return billerData
      ? billerData?.filter((data) => data?.Url === selectedBiller.toLowerCase())
      : [];
  };

  const { loading, processData, validateData, formData } = useSelector(
    validateSelector
  );

  // A successful validation belongs to the selected network and phone number.
  // Do not leave its confirmation step active after switching networks.
  useEffect(() => {
    dispatch(validateActions.clearState());
  }, [dispatch, selectedBiller]);

  useEffect(() => {
    dispatch(catalogActions.resetBillerData());
  }, [location.pathname]);
  useEffect(() => {}, [selectedBiller]);

  return (
    <>
      {!selectedBiller ? (
        <>
          {billerIsLink === true ? (
            <div className="min-h-[400px] flex justify-center items-center">
              Page redirected to associated product's official website
            </div>
          ) : (
            <div className="min-h-[400px] flex justify-center items-center">
              Kindly choose a product to proceed
            </div>
          )}
        </>
      ) : (
        <>
          {validateData && validateData?.Success === true ? null : (
            <Formik
              innerRef={formRef}
              onSubmit={(values) => {
                if (!values.VendorParameterValue?.trim()) {
                  toast.error("Phone Number is required!");
                  return;
                }
                try {
                  dispatch(
                    validateProduct({
                      ...values,
                      ReturnUrl: `${window.location.href}`,
                    })
                  );
                  dispatch(
                    validateActions.updateFormData({
                      ...values,
                      ReturnUrl: `${window.location.href}`,
                    })
                  );
                } catch (err) {}
              }}
              initialValues={initialValues}
              validationSchema={validateSchema}
            >
              {({
                isSubmitting,
                isValid,
                values,
                setFieldValue,
                resetForm,
              }) => {
                useEffect(() => {
                  resetForm();
                }, [selectedBiller]);
                return (
                  <div className="flex-[1] py-[0]">
                    <h3 className="font-roboto text-[1.5rem] text-[#464255]">
                      Airtime Vending
                    </h3>
                    <p className="text-[#464255]">
                      To buy Airtime, provide the details below
                    </p>
                    <Form className="mt-10">
                      <ComboSelect
                        options={selectOption()[0]?.Products}
                        optionLabel="Name"
                        optionValue="Id"
                        onItemSelected={(item) => {
                          if (item.CanChangePrice === true) {
                            setdisableField(false);
                            setFieldValue("Amount", "");

                            return;
                          }
                          setFieldValue("Amount", item.Price.toString());
                          setdisableField(true);
                        }}
                        label="Airtime Recharge Products"
                        placeholder="Select airtime product"
                        name="ProductId"
                      />
                      <Input
                        error={error}
                        showError={error}
                        label="Amount"
                        type="text"
                        name="Amount"
                        placeHolder="Enter Amount"
                        disabled={disableField}
                        validate={(value) => {
                          let errorMessage;
                          if (!/^\d+(\.\d{1,2})?$/i.test(value)) {
                            errorMessage = "Invalid amount";
                          }
                          return errorMessage;
                        }}
                      />
                      <Input
                        error={error}
                        showError={error}
                        label="Phone Number"
                        type="text"
                        name="VendorParameterValue"
                        placeHolder="Enter Phone Number"
                        validate={(value) => {
                          let errorMessage;
                          if (!value?.trim()) {
                            errorMessage = "Phone Number is required!";
                          } else if (!/^(\+234|0)\d{10}$/i.test(value)) {
                            errorMessage = "Invalid phone number";
                          }
                          return errorMessage;
                        }}
                      />
                      <Input
                        error={error}
                        showError={error}
                        label="Email"
                        type="email"
                        name="EmailAddress"
                        placeHolder="Enter Email"
                        validate={(value) => {
                          let errorMessage;
                          if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                              value
                            )
                          ) {
                            errorMessage = "Invalid email address";
                          }
                          return errorMessage;
                        }}
                      />
                      <Button
                        type="button"
                        action={() => {
                          if (!values.VendorParameterValue?.trim()) {
                            toast.error("Phone Number is required!");
                            formRef.current?.setFieldTouched(
                              "VendorParameterValue",
                              true
                            );
                            return;
                          }
                          formRef.current?.handleSubmit();
                        }}
                        text={
                          loading ? (
                            <TailSpin
                              height="30"
                              width="30"
                              color="#ffffff"
                              ariaLabel="tail-spin-loading"
                              radius="1"
                              wrapperStyle={{}}
                              wrapperClass=""
                              visible={true}
                            />
                          ) : (
                            "PROCEED"
                          )
                        }
                        background="#F58220"
                        color="#ffffff"
                        style={{
                          flexDirection: "row-reverse",
                          marginTop: "4rem",
                        }}
                        height="50px"
                        fontSize="13px"
                      />
                    </Form>
                  </div>
                );
              }}
            </Formik>
          )}
          {validateData && validateData?.Success === true && (
            <Formik
              innerRef={formRef}
              onSubmit={(values) => {
                // Guard the debit step as well as the initial validation step.
                if (!formData?.VendorParameterValue?.trim()) {
                  toast.error("Phone Number is required!");
                  dispatch(validateActions.clearState());
                  return;
                }
                try {
                  dispatch(processProduct(formData));
                } catch (err) {}
              }}
              initialValues={initialValues}
            >
              {({ isSubmitting, isValid, values, setFieldValue }) => (
                <div className="flex-[1] py-[0]">
                  <h3 className="font-roboto text-[1.5rem] text-[#464255]">
                    Airtime Vending
                  </h3>
                  <p className="text-[#464255]">
                    To buy Airtime, provide the details below
                  </p>

                  <Form className="mt-10">
                    {validateData?.Data?.map((data) => {
                      return (
                        <div className="flex flex-col mb-[1rem]">
                          <label htmlFor="" className="mb-[0.8rem]">
                            {data?.Key}
                          </label>
                          <input
                            type="text"
                            value={data?.Value}
                            className="border border-[#EFF0F6] rounded-[.4rem] h-[55px] w-[100%] px-[1rem] outline-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm caret-primary disabled:bg-gray-100"
                            disabled
                          />
                        </div>
                      );
                    })}

                    <Button
                      text={
                        loading ? (
                          <TailSpin
                            height="30"
                            width="30"
                            color="#ffffff"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                          />
                        ) : (
                          "PROCEED"
                        )
                      }
                      background="#F58220"
                      color="#ffffff"
                      style={{
                        flexDirection: "row-reverse",
                        marginTop: "4rem",
                      }}
                      height="50px"
                      fontSize="13px"
                    />
                  </Form>
                </div>
              )}
            </Formik>
          )}
        </>
      )}
    </>

    //   <div className="flex-[0.5] flex justify-end">
    //     <AdBanner />
    //   </div>
    // </div>
  );
};

export default AirtimePaymentPage;
