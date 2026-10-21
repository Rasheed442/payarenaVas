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

const CableTv = () => {
  const formRef = useRef();
  const [extraInputField, setExtraInputField] = useState();
  const [error, setError] = useState();
  const [disableField, setdisableField] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const location = useLocation();

  const [initialValues, setinitialValues] = useState({
    Amount: "",
    VendorParameterValue: "",
    EmailAddress: "",
    ProductId: "",
    Month: "",
  });

  const dispatch = useDispatch();

  const { billerData, selectedBiller, billerIsLink } =
    useSelector(catalogSelector);
  console.log(billerData, selectedBiller, billerIsLink);

  useEffect(() => {
    dispatch(catalogActions.resetBillerData());
  }, [location.pathname]);

  const selectOption = () => {
    return billerData
      ? billerData?.filter(
          (data) =>
            data?.Name === selectedBiller ||
            data?.Name === selectedBiller.toLowerCase()
        )
      : [];
  };
  console.log(selectOption());

  const { loading, processData, validateData, formData } =
    useSelector(validateSelector);
  const extraField = (data) => {
    return data?.map((data) => {
      return (
        <ComboSelect
          options={[
            { month: 1 },
            { month: 2 },
            { month: 3 },
            { month: 4 },
            { month: 5 },
            { month: 6 },
            { month: 7 },
            { month: 8 },
            { month: 9 },
            { month: 10 },
            { month: 11 },
            { month: 12 },
          ]}
          optionLabel="month"
          optionValue="month"
          // onItemSelected={(item) => {
          //   if (item.Parameters.length > 0) {
          //     const updatedInitialValues = { ...initialValues };
          //     console.log(item.Parameters);
          //     item.Parameters.forEach((element) => {
          //       const { Label } = element;
          //       updatedInitialValues[Label] = "";
          //       setinitialValues(updatedInitialValues);

          //       console.log(updatedInitialValues, element);
          //     });
          //     setExtraInputField(extraField(item.Parameters));
          //   }
          //   if (item.CanChangePrice === true) {
          //     setdisableField(false);
          //     setFieldValue("Amount", "");
          //     return;
          //   } else {
          //     setFieldValue("Amount", item.Price.toString());
          //     setdisableField(true);
          //   }
          // }}
          label={data?.Label}
          placeholder="Select month"
          name="Month"
        />
      );
    });
  };
  useEffect(() => {
    setExtraInputField(null);
  }, [selectedBiller]);

  useEffect(() => {
    console.log("true");
  }, [billerIsLink]);

  console.log(initialValues);

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
          {validateData && validateData.Success === true ? null : (
            <Formik
              innerRef={formRef}
              onSubmit={(values) => {
                try {
                  console.log(values);
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
                } catch (err) {
                  console.log(err);
                }
              }}
              initialValues={initialValues}
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
                      Cable TV{" "}
                    </h3>
                    <p className="text-[#464255]">
                      Pay all your bills from the comfort of your home
                    </p>

                    <Form className="mt-10">
                      <ComboSelect
                        options={selectOption()[0]?.Products}
                        optionLabel="Name"
                        optionValue="Id"
                        onItemSelected={(item) => {
                          setSelectedProduct(item);

                          if (item.Parameters.length > 0) {
                            const updatedInitialValues = { ...initialValues };
                            console.log(item.Parameters);
                            item.Parameters.forEach((element) => {
                              const { Label } = element;
                              updatedInitialValues[Label] = "";
                              setinitialValues(updatedInitialValues);

                              console.log(updatedInitialValues, element);
                            });
                            setExtraInputField(extraField(item.Parameters));
                          }
                          if (item.CanChangePrice === true) {
                            setdisableField(false);
                            setFieldValue("Amount", "");
                            return;
                          } else {
                            setFieldValue("Amount", item.Price.toString());
                            setdisableField(true);
                          }
                        }}
                        label="Cable TV Products"
                        placeholder="Select product"
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
                      {extraInputField}
                      <Input
                        error={error}
                        showError={error}
                        label={
                          selectedProduct?.ParameterLabel ||
                          "Vendor Parameter Value"
                        }
                        type="text"
                        name="VendorParameterValue"
                        placeHolder=""
                        validate={(value) => {
                          let errorMessage;
                          if (!/^[0-9]+$/i.test(value)) {
                            errorMessage = "Invalid Smart number";
                          }
                          return errorMessage;
                        }}
                      />
                      {extraField()}
                      <Input
                        error={error}
                        showError={error}
                        label="Email"
                        type="email"
                        name="EmailAddress"
                        placeHolder=""
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
                      <Input
                        error={error}
                        showError={error}
                        label="Referrer Email Address"
                        type="email"
                        name="ReferrerEmailAddress"
                        placeHolder=""
                      />
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
                        type="submit"
                      />
                    </Form>
                  </div>
                );
              }}
            </Formik>
          )}
          {validateData && validateData.Success === true && (
            <Formik
              innerRef={formRef}
              onSubmit={async (values) => {
                try {
                  console.log(values);
                  dispatch(processProduct(formData));
                } catch (err) {
                  console.log(err);
                }
              }}
              initialValues={initialValues}
            >
              {({
                isSubmitting,
                isValid,
                values,
                setFieldValue,
                handleReset,
              }) => (
                <div className="flex-[1] py-[0]">
                  <h3 className="font-roboto text-[1.5rem] text-[#464255]">
                    Collections & Levies{" "}
                  </h3>
                  <p className="text-[#464255]">
                    To pay collections & levies, provide the details below
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
  );
};

export default CableTv;
