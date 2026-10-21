import React, { useState, useRef, useEffect } from "react";
import { Form, Formik } from "formik";
import { ComboSelect, Input } from "../../components/Fields";
import Button from "../../components/bits/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  catalogActions,
  catalogSelector,
} from "../../store/services/catalog/catalog.service";
import {
  validateActions,
  validateSelector,
} from "../../store/services/catalog/validate.service";
import {
  processProduct,
  validateProduct,
} from "../../store/api/catalog/validateProduct";
import { TailSpin } from "react-loader-spinner";
import { useLocation } from "react-router-dom";

const BettingLottery = () => {
  const [disableField, setdisableField] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [extraInputField, setExtraInputField] = useState();
  const [error, setError] = useState();
  const location = useLocation();

  const formRef = useRef();

  const [initialValues, setinitialValues] = useState({
    Amount: "",
    VendorParameterValue: "",
    EmailAddress: "",
    ProductId: "",
  });

  const dispatch = useDispatch();

  const { billerData, selectedBiller, billerIsLink } =
    useSelector(catalogSelector);

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

  const { loading, processData, validateData, formData } =
    useSelector(validateSelector);
  const extraField = (data) => {
    return data?.map((data) => {
      return (
        <Input
          error={error}
          showError={error}
          label={data?.Label}
          type="text"
          name={data?.Label}
          required
          placeHolder=""
        />
      );
    });
  };
  useEffect(() => {
    setExtraInputField(null);
  }, [selectedBiller]);

  useEffect(() => {}, [billerIsLink]);

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
                      Betting & Lottery
                    </h3>
                    <p className="text-[#464255]">
                      To pay betting & lottery, provide the details below
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
                            item.Parameters.forEach((element) => {
                              const { Label } = element;
                              updatedInitialValues[Label] = "";
                              setinitialValues(updatedInitialValues);
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
                        label="Betting & Lottery Products"
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
          {validateData?.Success === true && (
            <Formik
              innerRef={formRef}
              onSubmit={async (values) => {
                try {
                  dispatch(processProduct(formData));
                } catch (err) {
                  console.log(err);
                }
              }}
              initialValues={initialValues}
            >
              {({ isSubmitting, isValid, values, setFieldValue }) => (
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

export default BettingLottery;
