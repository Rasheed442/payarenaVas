import { classNames } from "../../lib/utils";

export default function Component({
  type = "button",
  loading = false,
  onPress,
  buttonStyle = "shade",
  loadingText = "Please wait...",
  disabled = false,
  extraClasses = "",
  children,
  ...props
}) {
  const styles = {
    light:
      "inline-flex items-center disabled:opacity-40 justify-center w-full px-5 py-3.5 uppercase text-xs tracking-wider font-bold text-black transition-all duration-200 bg-gray-100 border border-gray-100 rounded-sm ring-transparent focus:outline-none hover:ring-2 hover:ring-offset-0 hover:ring-black hover:border-black hover:ring-black hover:text-gray-900",
    shade:
      "inline-flex items-center disabled:opacity-40 justify-center w-full px-5 py-3.5 uppercase text-xs tracking-wider font-bold font-semibold text-white transition-all duration-200 bg-primary border border-transparent rounded-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary hover:bg-primary-500",
    transparent: "",
    cancel:
      "mt-2 flex justify-center items-center bg-gray-200 text-white whitespace-nowrap text-2xl font-bold rounded-full w-7 h-7 hover:ring-2 hover:ring-offset-0 hover:ring-black hover:border-black hover:ring-black hover:text-gray-900",
  };

  const buttonClasses = styles[buttonStyle] || styles.transparent;

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={classNames(buttonClasses, extraClasses)}
      type={type}
    >
      {loading ? loadingText : children}
    </button>
  );
}
