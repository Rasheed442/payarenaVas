import React, { useState, useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { passwordChange } from "../store/services/auth/forgotPassword";

export default function ChangePasswordModal({ modal, closeModal }) {
  const [loading, setLoading] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [matchError, setMatchError] = useState("");

  const getPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = getPasswordStrength(newPassword);
  const strengthPercent = strength * 25;
  const strengthLabel = ["Weak", "Medium", "Strong", "Very Strong"][strength - 1] || "Very Weak";

  useEffect(() => {
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      setMatchError("Passwords do not match");
    } else {
      setMatchError("");
    }
  }, [newPassword, confirmPassword]);

  // const handlePasswordChange = (e) => {
  //   e.preventDefault();
  //   if (newPassword !== confirmPassword) {
  //     setMatchError("Passwords do not match");
  //     return;
  //   }
  //   console.log("Password changed!");
  //   handleSubmit(); // Call the submit function after validation
  // };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ Needed to stop page reload

    setLoading(true);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }


    try {
      const response = await passwordChange({
        OldPassword: oldPassword,
        NewPassword: newPassword,
      });
      console.log("Response:", response);
      closeModal();
    } catch (error) {
      console.error("API error:", error);
      toast.error(error?.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }

  };



  if (!modal) return null;

  useEffect(() => {
    // Disable scroll on open
    document.body.style.overflow = "hidden";

    return () => {
      // Re-enable scroll on close
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="z-50 fixed inset-0 overflow-y-auto bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md min-h-screen flex flex-col absolute right-0 p-10">
        {/* Close Icon */}
        <svg
          onClick={closeModal}
          style={{ marginLeft: "auto", cursor: "pointer" }}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.94 1.02L2 0.08 0.11 1.96 1.06 2.9 2.94 1.02ZM17.06 18.89L18 19.83 19.89 17.94 18.94 17 17.06 18.89ZM1.06 17 0.11 17.94 2 19.83 2.94 18.89 1.06 17ZM18.94 2.9 19.89 1.96 18 0.08 17.06 1.02 18.94 2.9ZM1.06 2.9 17.06 18.89 18.94 17 2.94 1.02 1.06 2.9ZM2.94 18.89 18.94 2.9 17.06 1.02 1.06 17 2.94 18.89Z"
            fill="#252B33"
          />
        </svg>

        <div>
          <p className="text-3xl font-semibold">Change Password</p>
          <p className="font-normal text-[20px] mt-1">
            Provide the required info below to change
            your password
          </p>
          <div className="w-[100px] border-b mt-4 border-[#A7A9C0]"></div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-8">
          {/* Old Password */}
          <div>
            <label className="text-[#004663] text-[15px] font-medium">Old Password</label>
            <div className="relative mt-1">
              <input
                type={showOldPassword ? "text" : "password"}
                className="w-full h-12 rounded border border-[#CDCDCD] px-4 pr-12 focus:outline-none"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <div
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? (
                  <EyeSlashIcon className="w-5 h-5 text-gray" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-gray" />
                )}
              </div>
            </div>
          </div>

          {/* New Password with Strength Meter */}
          <div>
            <label className="text-[#004663] text-[15px] font-medium">New Password</label>
            <div className="relative mt-1">
              <input
                type={showNewPassword ? "text" : "password"}
                className="w-full h-12 rounded border border-[#CDCDCD] px-4 pr-12 focus:outline-none"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <div
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeSlashIcon className="w-5 h-5 text-gray" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-gray" />
                )}
              </div>
            </div>

            {/* Strength Meter */}
            {newPassword && (
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm text-gray-700">
                  <span>Security level:</span>
                  <span className="font-medium">{strengthLabel} ({strengthPercent}%)</span>
                </div>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-2 flex-1 rounded ${strength >= i ? "bg-green" : "bg-gray"}`}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="text-sm text-gray mt-2 flex flex-col gap-2">
              <p>Your password must contain the following:</p>
              <ul className="list-disc ml-5">
                <li>At least 8 characters</li>
                <li>Mix of upper and lowercase letters</li>
                <li>Numbers and special characters</li>
              </ul>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-[#004663] text-[15px] font-medium">Confirm Password</label>
            <div className="relative mt-1">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full h-12 rounded border border-[#CDCDCD] px-4 pr-12 focus:outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeSlashIcon className="w-5 h-5 text-gray" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-gray" />
                )}
              </div>
            </div>
            {matchError && (
              <p className="text-sm text-red mt-1">{matchError}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-12 mt-6 bg-[#f58220] text-white font-semibold rounded hover:bg-[#e57210] transition"
          >
            UPDATE PASSWORD
          </button>
        </form>
      </div>
    </div>
  );
}
