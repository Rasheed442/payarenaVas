import { Field } from "formik";

export default function Component({
  name,
  label,
  helpText,
  type = "checkbox",
  extraClasses = "",
  altLink,
  format,
  icon,
  ...props
}) {
  return (
    <Field name={name}>
      {({ field: { onChange, onBlur, value } }) => {
        const formatValue = (val) => (format ? format(val) : val);
        return (
          <fieldset className="relative flex items-center w-full">
            <div className="flex items-center h-5">
              <input
                {...props}
                id={name}
                onChange={onChange}
                onBlur={onBlur}
                value={formatValue(value)}
                className={
                  "w-4 h-4 text-primary border-gray-200 rounded focus:ring-primary"
                }
                type={"checkbox"}
              />
            </div>
            <div className="ml-3">
              <label
                htmlFor={name}
                className="text-sm font-medium text-gray-900"
              >
                {label || "Select"}
              </label>
            </div>
          </fieldset>
        );
      }}
    </Field>
  );
}
