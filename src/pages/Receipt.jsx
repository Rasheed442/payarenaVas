import React, { useEffect, useRef, useState } from "react";
import cloud from "../assets/icons/cloud.svg";
import { useDispatch, useSelector } from "react-redux";
import { receiptActions } from "../store/services/catalog/receipt.service";
import { getReceipt } from "../store/api/catalog/receipt";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "../assets/images/logo.svg";
import { BulkRec } from "../store/services/transactions";

const Receipt = () => {
  const transactionId = window.location.search.split("&")[0].split("=")[1];
  const myElementRef = useRef(null);
  const [invoice, setInvoice] = useState(null);
  const dispatch = useDispatch();
  const [pdfLoading, setPdfLoading] = useState(false);

  const extractKeys = (obj) => {
    return Object.keys(obj);
  };

  useEffect(() => {
    setInvoice(myElementRef.current);
  }, [myElementRef.current]);

  useEffect(() => {
    dispatch(getReceipt(transactionId));
  }, [dispatch]);

  const { data: receipt, loading } = useSelector((state) => state.receipt);

  const convertedObject = {};

  receipt?.Data?.forEach((item) => {
    convertedObject[item.Key] = item.Value;
  });

  const modifiedReceipt = {};

  for (const key in convertedObject) {
    if (Object.prototype.hasOwnProperty.call(convertedObject, key)) {
      let modifiedKey = key.toLowerCase();

      // Check if the key has a space
      if (modifiedKey.includes(" ")) {
        const words = modifiedKey.split(" ");
        modifiedKey =
          words.shift() +
          words
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join("");
      }

      modifiedReceipt[modifiedKey] = convertedObject[key];
    }
  }

  const pdfDownloadHandler = () => {
    const capture = myElementRef.current;
    setPdfLoading(true);
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const componentWidth = pdf.internal.pageSize.getWidth();
      const componentHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(
        componentWidth / imgWidth,
        componentHeight / imgHeight
      );
      const imgX = (componentWidth - imgWidth * ratio) / 2;
      const imgY = (componentHeight - imgHeight * ratio) / 2;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      setPdfLoading(false);
      pdf.save("receipt.pdf");
    });
  };
  // console.log(receipt.Logo);

  const retrieveBulk = async () => {
    try {
      const blobData = await BulkRec(transactionId);
      // Get the content type from the response headers
      const contentType = blobData.type;
      // Create a blob from the response data
      const blob = new Blob([blobData], { type: contentType });
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
      // Create a temporary <a> element
      const link = document.createElement("a");
      link.href = url;
      // Set the filename
      link.download = "bulkPaymentStatement";
      // Simulate a click on the link to initiate the download
      link.click();
      // Cleanup
      window.URL.revokeObjectURL(url);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <section className="w-full max-w-[1440px] mx-auto relative">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            className="px-[9rem] md:px-[1.5rem] receipt-page"
            ref={myElementRef}
          >
            <div className="pt-[8rem] flex justify-center">
              <div className="flex flex-col justify-center items-center bottom-5 w-[500px]">
                <div>
                  <img
                    alt=""
                    src={logo}
                    srcSet=""
                    className="w-[120px] flex justify-center"
                  />
                </div>
                <div>
                  <img
                    alt=""
                    srcSet=""
                    // src={logo}
                    src={receipt.Logo}
                    className="w-[80px]"
                  />
                </div>
              </div>
            </div>
            <h2 className="font- text-[#242331] text-[1.5rem] text-center md:pt-[1rem] md:text-[1.5rem]">
              Transaction Receipt
            </h2>{" "}
            <div className="flex justify-center items-center mt-[2rem]">
              <div
                className="w-[500px] border-dashed border-2 border-[#bcbbbb] p-[2rem]"
                id="document_to_print"
              >
                {receipt?.Data?.map((item, index) => (
                  <span
                    key={index}
                    className="flex justify-between items-center border-b border-[#c0c0c0] py-4"
                  >
                    <p className="text-[#808080] font-medium font-sans">
                      {item.Key}
                    </p>
                    <p
                      className={`text-[#808080] font-medium font-sans ${
                        item.Key === "Status" && item.Value !== "APPROVED"
                          ? "text-[#ff4747] font-medium font-sans"
                          : "text-[#328B2B] font-medium font-sans"
                      }`}
                    >
                      {item.Value}
                    </p>
                  </span>
                ))}
                {receipt?.IsBulk && (
                  <div className="flex justify-center mt-7">
                    <div
                      className="border-b border-[#475467] font-semibold text-xs text-[#475467] w-fit cursor-pointer"
                      onClick={() => retrieveBulk()}
                    >
                      Download Statement for Bulk Airtime
                    </div>
                  </div>
                )}
                <span className="flex items-center gap-7">
                  <button className="bg-transparent border text-accent1 w-full h-[40px] rounded-lg text-[13px] mt-[1.5rem] flex justify-center items-center gap-3 cursor-pointer first-letter:8765431">
                    <Link to="/payment/airtime-recharge">
                      Return to payment
                    </Link>
                  </button>
                  <button
                    className="bg-accent1 text-white w-full h-[40px] rounded-lg text-[13px] mt-[1.5rem] flex justify-center items-center gap-3 cursor-pointer first-letter:8765431"
                    onClick={pdfDownloadHandler}
                    disabled={!(pdfLoading === false)}
                  >
                    <img src={cloud} className="w-[20px]" alt="" />
                    {pdfLoading ? "Downloading..." : "Download"}
                  </button>
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Receipt;
