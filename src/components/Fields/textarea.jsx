import { ErrorMessage, Field } from "formik";
import { classNames } from "../../lib/utils";

export default function Component({
  name,
  label,
  helpText,
  extraClasses = "",
  altLink,
  format,
  icon,
  rightIcon,
  ...props
}) {
  return (
    <Field name={name}>
      {({ field: { onChange, onBlur, value }, meta: { touched, error } }) => {
        const formatValue = (val) => (format ? format(val) : val);
        return (
          <fieldset className="space-y-2">
            <div className="flex justify-between items-center">
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
              {altLink && <div className="items-end">{altLink}</div>}
            </div>
            <div className="relative">
              {icon && (
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  {icon}
                </div>
              )}
              <textarea
                id={name}
                onChange={onChange}
                onBlur={onBlur}
                value={formatValue(value)}
                className={classNames(
                  "h-[150px] p-4 border border-[#EFF0F6] rounded-[.4rem] w-[100%] px-[1rem] outline-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm caret-primary disabled:bg-gray-100"
                )}
                {...props}
              />
              {rightIcon && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  {rightIcon}
                </div>
              )}
            </div>
            {helpText && <p className="text-xs text-gray-400">{helpText}</p>}
            <ErrorMessage name={name}>
              {(msg) => (
                <div className="text-xs text-red opacity-80">{msg}</div>
              )}
            </ErrorMessage>
          </fieldset>
        );
      }}
    </Field>
  );
}
