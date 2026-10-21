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
import { useLocation, useParams } from "react-router-dom";
import { TbPencil } from "react-icons/tb";
import { loginSelector } from "../../store/services/auth/login";
import WalletModal from "../../modals/WalletModal";
import { toast } from "sonner";

const PaymentPage = () => {
  const { paymenttype } = useParams();
  const { paymentbiller } = useParams();
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [walletPin, setWalletPin] = useState("");
  const [walletPaymentData, setWalletPaymentData] = useState(null);
  const [disableField, setdisableField] = useState(false);
  const [extraInputField, setExtraInputField] = useState();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [amountError, setAmountError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const token = localStorage.getItem("token");

  //This is a cheat (work-around) to keep updating my useEffect dep for persisting values
  const [formSubmitted, setformSubmitted] = useState(false);

  const [error, setError] = useState();

  const formRef = useRef();

  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState("gateway"); // default to gateway

  const queryParams = new URLSearchParams(location.search);
  const paymentType = queryParams.get("paymenttype");
  const billertype = parseInt(queryParams.get("billertype"));
  // console.log("🚀 ~ PaymentPage ~ currencyFromQuery:", paymentType);
  // console.log("🚀 ~ PaymentPage ~ id:", billertype);

  const submittedValue = JSON.parse(localStorage.getItem("submittedData"));
  let myVariable;

  useEffect(() => {
    // console.log("🚀 ~ PaymentPage ~ currencyFromQuery:", paymentType);
    // console.log("🚀 ~ PaymentPage ~ id:", billertype);
  }, [paymentType, billertype]);

  useEffect(() => {
    if (submittedValue !== null) {
      setinitialValues(submittedValue);
    } else {
      setinitialValues({
        ProductId: "",
        Amount: "",
        VendorParameterValue: "",
        EmailAddress: "",
        ReferrerEmailAddress: "",
      });
    }
  }, [formSubmitted]);

  const [initialValues, setinitialValues] = useState({
    ProductId: "",
    Amount: "",
    VendorParameterValue: "",
    EmailAddress: "",
    ReferrerEmailAddress: "",
  });

  const dispatch = useDispatch();

  const { billerData, selectedBiller, billerIsLink } =
    useSelector(catalogSelector);

  // console.log(billerIsLink);

  useEffect(() => {
    dispatch(catalogActions.resetBillerData());
  }, [location.pathname]);

  const selectOption = () => {
    return billerData
      ? billerData?.filter(
          (data) =>
            data?.Name === selectedBiller ||
            data?.Url === selectedBiller.toLowerCase()
        )
      : [];
  };

  const { loading, processData, validateData, formData } =
    useSelector(validateSelector);
  const { selectedPayment } = useSelector(catalogSelector);
  const isAirtimePayment = selectedPayment
    ?.toLowerCase()
    .includes("airtime");
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
    dispatch(validateActions.clearState());
    setinitialValues({
      ProductId: "",
      Amount: "",
      VendorParameterValue: "",
      EmailAddress: "",
      ReferrerEmailAddress: "",
    });
    localStorage.setItem(
      "submittedData",
      JSON.stringify({
        ProductId: "",
        Amount: "",
        VendorParameterValue: "",
        EmailAddress: "",
        ReferrerEmailAddress: "",
      })
    );
  }, [selectedBiller]);

  useEffect(() => {
    // console.log("true");
  }, [billerIsLink]);

  const handleAmount = (amount, item) => {
    console.log(amount);
    if (item.MinAmount != null && amount < item.MinAmount) {
      setAmountError(`Amount must be greater than ${item.MinAmount}`);
      setButtonDisabled(true);
    } else if (item.MaxAmount != null && amount > item.MaxAmount) {
      setAmountError(`Amount must be less than ${item.MaxAmount}`);
      setButtonDisabled(true);
    } else {
      setAmountError("");
      setButtonDisabled(false);
    }
  };
 const handleWalletPayment = (pin) => {
  const data = {
    ...formData,
    Pin: pin,
    ReturnUrl: `${window.location.origin}/transaction-report`,
  };

  for (let index = 0; index < validateData.Data.length; index++) {
    const element = validateData.Data[index];
    data[element.Key] = element.Value;
  }

  // Dispatch wallet payment thunk
  dispatch(processWalletPayment(data)); // You'd implement this thunk
};



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
                if (
                  isAirtimePayment &&
                  !values.VendorParameterValue?.trim()
                ) {
                  toast.error("Phone Number is required!");
                  formRef.current?.setFieldTouched(
                    "VendorParameterValue",
                    true
                  );
                  return;
                }
                try {
                  dispatch(validateProduct(values));
                  dispatch(validateActions.updateFormData(values));
                  console.log(values);
                  setformSubmitted(!formSubmitted);
                  localStorage.setItem("submittedData", JSON.stringify(values));
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
                      {selectedPayment}{" "}
                    </h3>
                    <p className="text-[#464255]">
                      To pay for {selectedPayment?.toLowerCase()}, provide the
                      details below
                    </p>

                    <Form className="mt-10 ">
                      <div className="h-[450px] max-h-[450px] overflow-y-scroll">
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
                            console.log(item);
                            if (item.CanChangePrice === true) {
                              setdisableField(false);
                              setFieldValue("Amount", "");
                              return;
                            } else {
                              setFieldValue("Amount", item.Price.toString());
                              setdisableField(true);
                            }
                          }}
                          label={`${selectedPayment} Products`}
                          placeholder="Select product"
                          name="ProductId"
                        />
                        {selectedProduct?.AmountFromVendor == false ? (
                          <>
                            <Input
                              error={error}
                              showError={error}
                              onChange={(e) =>
                                handleAmount(e.target.value, selectedProduct)
                              }
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
                            <p className="text-xs flex items-center text-red opacity-80">
                              {amountError}
                            </p>
                          </>
                        ) : (
                          ""
                        )}

                        {selectedProduct && (
                          <Input
                            error={error}
                            showError={error}
                            label={
                              selectedProduct?.ParameterLabel ||
                              "VendorParameterValue"
                            }
                            type="text"
                            name="VendorParameterValue"
                            placeHolder=""
                            validate={(value) => {
                              if (
                                isAirtimePayment &&
                                !value?.trim()
                              ) {
                                return "Phone Number is required!";
                              }
                            }}
                          />
                        )}
                        {extraInputField}
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
                        {token && (
                        <div className="mt-4">
                         <label className="block mb-2 font-medium text-gray-700">Payment Method</label>
                         <div className="flex flex-col sm:flex-row gap-4">
                         <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="wallet"
                              checked={paymentMethod === "wallet"}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <span>Pay with Wallet</span>
                          </label>

                          <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name="paymentMethod"
                                value="gateway"
                                checked={paymentMethod === "gateway"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                               />
                            <span>Pay with Phone/Card/Transfer</span>
                           </label>
                         </div>
                        </div>
                        )}
                      </div>
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
                          marginTop: "2rem",
                        }}
                        height="50px"
                        fontSize="13px"
                        disabled={buttonDisabled}
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
                  console.log(validateData);
                  let data = {
                    ...formData,
                    ReturnUrl: `${window.location.origin}/transaction-report`,
                  };
                  for (
                    let index = 0;
                    index < validateData.Data.length;
                    index++
                  ) {
                    const element = validateData.Data[index];
                    data[element.Key] = element.Value;
                  }
                  if (
                    isAirtimePayment &&
                    !data.VendorParameterValue?.trim()
                  ) {
                    toast.error("Phone Number is required!");
                    dispatch(validateActions.clearState());
                    return;
                  }
                  if (paymentMethod === "wallet") {
                  //  dispatch(processWalletPayment(data)); // create this
                   console.log("Paying with wallet", data);
                   setWalletModalOpen(true);
                   setWalletPaymentData(data);
                   // Optionally, dispatch a wallet payment thunk here
                   } else {
                   dispatch(processProduct(data));
                  }

                  // dispatch(processProduct(data));
                  // console.log({
                  //   ...formData,
                  //   ReturnUrl: `${window.location.origin}/transaction-report`,
                  // });
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
                      {selectedPayment}{" "}
                    </h3>
                    <p className="text-[#464255]">
                      To pay for {selectedPayment.toLowerCase()}, provide the
                      details below
                    </p>
                    <Form className="mt-10">
                      {validateData?.Data?.map((data) => {
                        return (
                          <div className="flex flex-col mb-[1rem]">
                            <label htmlFor="" className="mb-[0.8rem]">
                              {data?.Key}
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                value={data?.Value}
                                className="border border-[#EFF0F6] rounded-[.4rem] h-[55px] w-[100%] px-[1rem] outline-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm caret-primary disabled:bg-gray-100"
                                disabled
                              />
                              <span className=" absolute top-1/2 left-[95%] transform -translate-x-1/2 -translate-y-1/2 text-[#5e5e5e] text-[1.5rem]">
                                <TbPencil
                                  onClick={() => {
                                    dispatch(validateActions.clearState());
                                    dispatch(validateActions.goBackToStep1());
                                  }}
                                />
                              </span>
                            </div>
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
                );
              }}
            </Formik>
          )}
        </>
      )}
      {walletModalOpen &&  ( <WalletModal setWalletModalOpen={setWalletModalOpen}  paymentData={walletPaymentData}/>)}
    </>
  );
};

export default PaymentPage;
