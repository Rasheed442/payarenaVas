import { ErrorMessage, Field } from "formik";
import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";

export default function Component({
  name,
  label,
  helpText,
  extraClasses = "mx-auto w-[50%]",
  altLink,
  format,
  placeHolder,
  icon,
  showError = true,
  rightIcon,
  error,
  numInputs = 6,
  className = "p-2 border-gray-200 !w-12 mx-4 rounded text-gray-800 ",
  ...props
}) {
  const [exError, setShowExError] = useState(error);

  useEffect(() => {
    const timeout = setTimeout(() => setShowExError(error), 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [error]);
  return (
    <Field name={name}>
      {({
        field: { value },
        meta: { touched, error },
        form: { setFieldValue },
      }) => {
        const formatValue = (val) => (format ? format(val) : val);
        return (
          <fieldset className="space-y-2 mb-6">
            {label && (
              <div className="flex justify-between items-center mt-3 mb-2">
                {label ? (
                  <label
                    htmlFor={name}
                    className=" tracking-wider text-sm text-gray-900"
                  >
                    {label}
                  </label>
                ) : (
                  <span />
                )}
                {altLink && <span className="items-end">{altLink}</span>}
              </div>
            )}
            <div className="relative">
              <OTPInput
                value={formatValue(value)}
                onChange={(e, d) => {
                  setFieldValue(name, e);
                }}
                inputType="number"
                numInputs={numInputs}
                containerStyle="w-[100%]"
                inputStyle={{
                  width: "100%",
                  height: "10vh",
                  outline: "none",
                  fontSize: "20px",
                  appearance: "none",
                  borderRadius: "4px",
                  border: "1px solid #CDCDCD",
                }}
                renderSeparator={
                  <span>
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </span>
                }
                renderInput={(props) => (
                  <input
                    type="number"
                    style={{
                      marginBottom: "20px",
                      width: "60%",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    {...props}
                  />
                )}
              />
            </div>
            {helpText && <p className="text-xs text-gray-400">{helpText}</p>}
            {showError && (
              <ErrorMessage name={name}>
                {(msg) => (
                  <div className="text-xs flex items-center text-red opacity-80">
                    {msg}
                  </div>
                )}
              </ErrorMessage>
            )}
            {exError && (
              <div className="text-xs flex items-center text-red-500 opacity-80">
                {exError}
              </div>
            )}
          </fieldset>
        );
      }}
    </Field>
  );
}
