import { Field, useFormikContext } from "formik";
import { classNames } from "../../lib/utils";

export default function Component({
  name,
  label,
  helpText,
  groupClass = "w-full grid grid-cols-1 relative z-0 md:grid-cols-2 gap-4",
  optionClass = "border border-gray-200 inline-flex font-medium w-full py-3.5 px-3.5 placeholder-gray-300 rounded-sm text-sm cursor-pointer justify-center items-center",
  options = [],
  optionLabel = "name",
  optionValue = "code",
  checkboxVisible = false,
  multiple = false,
  checkboxClass = "w-4 h-4 text-primary border-gray-200 rounded-full focus:ring-primary mr-4",
  selectedOptionClass = "border-0 text-primary",
  altLink,
  format,
  extraClasses = "",
  onClick,
  ...props
}) {
  const { values } = useFormikContext();
  const formatValue = (option) =>
    format ? format(option) : option[optionLabel];

  return (
    <fieldset className="space-y-3">
      <div>
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
          {altLink && <div className="items-end">{altLink}</div>}
        </div>
        {helpText && <p className="text-xs text-gray-400">{helpText}</p>}
      </div>
      <div
        role="group"
        aria-labelledby={name}
        className={classNames(groupClass, "relative w-full")}
      >
        {options.map((option, idx) => {
          const value = option[optionValue];
          const isChecked =
            value && values && values[name] && values[name] === value;
          return (
            <label
              onClick={onClick}
              key={idx}
              className={classNames(
                isChecked
                  ? "ring-1 ring-offset-0 w-full ring-primary border-primary"
                  : "border-gray-200",
                isChecked ? selectedOptionClass : "",
                optionClass,
                extraClasses
              )}
            >
              <Field
                type={multiple ? "checkbox" : "radio"}
                name={name}
                value={value}
                className={classNames(
                  checkboxVisible ? "inline-block" : "hidden",
                  checkboxClass
                )}
              />
              {formatValue(option)}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
