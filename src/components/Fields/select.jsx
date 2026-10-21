import { ErrorMessage, Field } from "formik";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { classNames } from "../../lib/utils";

export default function Component({
  name,
  label,
  format,
  options = [],
  extraClasses = "",
  optionLabel = "name",
  optionValue = "code",
  placeholder,
  showError = true,
  enablePlaceholder = true,
  helpText,
  altLink,
  ...props
}) {
  return (
    <Field name={name}>
      {({ field: { onChange, onBlur, value }, meta: { touched, error } }) => {
        const formatValue = (val) => (format ? format(val) : val);
        return (
          <fieldset className="text-left justify-start mt-5 space-y-1 w-full">
            {label && (
              <div className="flex justify-between items-center">
                {label ? (
                  <label
                    htmlFor={name}
                    className="text-2xs uppercase tracking-wider font-bold text-gray-900"
                  >
                    {label}
                  </label>
                ) : (
                  <span />
                )}
                {altLink && <span className="items-end">{altLink}</span>}
              </div>
            )}
            <div className="relative bg-white">
              <select
                {...props}
                required
                id={name}
                onChange={onChange}
                onBlur={onBlur}
                value={formatValue(value)}
                className={classNames(
                  extraClasses,
                  touched && error ? "border-red-500" : "border-gray-200",
                  "appearance-none bg-none border border-gray-200 block font-medium w-full py-3 placeholder-gray-300 rounded-sm focus:ring-primary focus:border-primary focus:shadow-none sm:text-sm caret-primary disabled:bg-gray-100 py-3 pl-3 pr-10 text-black"
                )}
              >
                {enablePlaceholder && (
                  <option value="" disabled selected hidden>
                    {placeholder || ""}
                  </option>
                )}
                {options.map((c, idx) => (
                  <option key={idx} value={c[optionValue]}>
                    {c[optionLabel]}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center">
                <ChevronUpDownIcon
                  strokeWidth={2}
                  className="h-4 w-4 text-black"
                  aria-hidden="true"
                />
              </div>
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
