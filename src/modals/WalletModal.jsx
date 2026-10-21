import React, { useState } from 'react';
import CryptoJS from "crypto-js";
import { paymentWallet } from '../store/services/Wallet';

const WalletModal = ({setWalletModalOpen, paymentData}) => {
  const [walletPin,setWalletPin] = useState("");
 console.log(paymentData)

    const handleWalletPayment = async (e) => {
      e.preventDefault();
      const key = CryptoJS.enc.Utf8.parse("240B07179B22C8B5"); // 16-byte key
      const iv = CryptoJS.enc.Utf8.parse("C267E4C6C84F1A40");
      let info = {
        Scheme: "wallet",
        Pin: walletPin,
      };
  
      const dataString = JSON.stringify(info);
  
      const encrypted = CryptoJS.AES.encrypt(dataString, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });
  
      const encryptedHex = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
  
      try {
        {
          const res = await paymentWallet({
            Amount: paymentData.Amount,
            Description: paymentData.Description,
            "Email Address": paymentData["Email Address"],
            EmailAddress: paymentData.EmailAddress,
            "Phone Number": paymentData["Phone Number"],
            ProductId: paymentData.ProductId,
            ReferrerEmailAddress: paymentData.ReferrerEmailAddress,
            ReturnUrl: paymentData.ReturnUrl,
            VendorParameterValue: paymentData.VendorParameterValue,
            Scheme: "wallet",
            PaymentInformation: encryptedHex,
          });
          console.log(res);
          // setInitialState3(false);
          // setInitialState4(true);
          // if (res.Success === true) {
          //   setIsSuccess(true);
          // }
          // setTransactionDetails(res.Data);
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.message);
        }
      }
    };

  return (
   <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
      <h2 className="text-xl font-semibold mb-4">Wallet Payment</h2>
      <form onSubmit={handleWalletPayment}>
      <label className="block mb-2 text-sm font-medium">PIN</label>
      <input
        type="password"
        value={walletPin}
        onChange={(e) => setWalletPin(e.target.value)}
        className="w-full border rounded px-3 py-2 mb-4"
        placeholder="Enter your wallet PIN"
      />
      <div className="flex justify-end gap-4">
        <button
          onClick={() => setWalletModalOpen(false)}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>
        <button
          type='submit'
          className="px-4 py-2 bg-orange-500 text-black rounded"
        >
          Confirm
        </button>
      </div>
      </form>
    </div>
  </div>
  )
}

export default WalletModal