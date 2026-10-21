import { ErrorMessage, Field } from "formik";
import DatePicker from "react-datepicker";
import { classNames } from "../../lib/utils";

export default function Component({
  name,
  label,
  helpText,
  extraClasses = "",
  altLink,
  placeholder,
  format,
  icon,
  showError = true,
  rightIcon,
  ...props
}) {
  return (
    <Field name={name}>
      {({
        field: { value },
        form: { setFieldValue },
        meta: { touched, error },
      }) => {
        const formatValue = (val) => (format ? format(val) : val);
        return (
          <fieldset className="space-y-2">
            <div className="flex justify-between items-center">
              {label ? (
                <label
                  htmlFor={name}
                  className="text-sm font-bold text-gray-900"
                >
                  {label}
                </label>
              ) : (
                <span />
              )}
              {altLink && <span className="items-end">{altLink}</span>}
            </div>
            <div className="relative">
              {icon && (
                <div className="absolute z-10 inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  {icon}
                </div>
              )}
              <DatePicker
                {...props}
                id={name}
                onChange={(val) => {
                  setFieldValue(name, val, true);
                }}
                selected={formatValue(value)}
                placeholderText={placeholder}
                className={classNames(
                  icon ? "pl-12" : "pl-4",
                  rightIcon ? "pr-12" : "pr-4",
                  touched && error && error[name]
                    ? "border-red-500"
                    : "border-gray-200",
                  extraClasses,
                  "border border-gray-200 block font-medium w-full py-3 placeholder-gray-300 rounded-sm focus:ring-primary focus:border-primary focus:shadow-none sm:text-sm caret-primary"
                )}
                calendarClassName="!border-gray-200 !shadow !font-sans !text-xs !font-medium !rounded-xs"
              />
              {rightIcon && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  {rightIcon}
                </div>
              )}
            </div>
            {helpText && <p className="text-xs text-gray-400">{helpText}</p>}
            {showError && (
              <ErrorMessage name={name}>
                {(msg) => (
                  <div className="text-xs text-red-500 opacity-80">{msg}</div>
                )}
              </ErrorMessage>
            )}
          </fieldset>
        );
      }}
    </Field>
  );
}
