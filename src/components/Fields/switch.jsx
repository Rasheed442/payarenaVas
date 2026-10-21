import { Field } from "formik";
import { Switch } from "@headlessui/react";
import { classNames } from "../../lib/utils";

export default function Component({
  name,
  label,
  helpText,
  type = "checkbox",
  extraClasses = "",
  altLink,
  format,
  icon,
  onChange,
  ...props
}) {
  return (
    <Field name={name}>
      {({ field: { value }, form: { setFieldValue } }) => {
        const formatValue = (val) => (format ? format(val) : val);
        const handleChange = (val) => {
          setFieldValue && setFieldValue(name, val, true);
          setTimeout(() => onChange && onChange(val), 100);
        };
        return (
          <fieldset className="relative flex items-center w-full">
            <div className="flex items-center">
              <Switch
                checked={formatValue(value)}
                onChange={handleChange}
                className="flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bg-white w-full h-full rounded-md"
                />
                <span
                  aria-hidden="true"
                  className={classNames(
                    formatValue(value) ? "bg-primary" : "bg-gray-200",
                    "pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200"
                  )}
                />
                <span
                  aria-hidden="true"
                  className={classNames(
                    formatValue(value) ? "translate-x-5" : "translate-x-0",
                    "pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200"
                  )}
                />
              </Switch>
            </div>
            <div className="">
              {label && (
                <label
                  htmlFor={name}
                  className="ml-3 text-sm font-semibold text-gray-900"
                >
                  {label}
                </label>
              )}
            </div>
          </fieldset>
        );
      }}
    </Field>
  );
}
