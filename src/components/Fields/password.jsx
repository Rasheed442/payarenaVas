import { ErrorMessage, Field } from "formik";
import { classNames } from "../../lib/utils";
import React, { useEffect, useState } from "react";
import useToggle from "../../lib/useToggle";

export default function Component({
  name,
  label,
  helpText,
  extraClasses = "",
  altLink,
  format,
  placeHolder,
  icon,
  showError = true,
  rightIcon,
  error,
  ...props
}) {
  const [open, toggle] = useToggle();
  const [exError, setShowExError] = useState(error);

  useEffect(() => {
    const timeout = setTimeout(() => setShowExError(error), 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [error]);

  return (
    <Field name={name}>
      {({ field: { onChange, onBlur, value }, meta: { touched, error } }) => {
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
              {icon && (
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  {icon}
                </div>
              )}
              <input
                {...props}
                id={name}
                type={open ? "text" : "password"}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeHolder}
                value={formatValue(value)}
                className={classNames(
                  "border border-[#EFF0F6] rounded-[.4rem] h-[55px] w-[100%] px-[1rem] outline-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm caret-primary disabled:bg-gray-100"
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
              <div className="text-xs flex items-center text-red opacity-80">
                {exError}
              </div>
            )}
          </fieldset>
        );
      }}
    </Field>
  );
}
