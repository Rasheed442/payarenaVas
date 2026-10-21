import { useEffect, useState } from "react";

const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pagesToShow = 2; // Number of pages to show on each side of the current page
    const pagesAroundCurrent = pagesToShow * 2;

    let startPage = currentPage - pagesToShow;
    let endPage = currentPage + pagesToShow;

    if (startPage <= 0) {
      endPage += Math.abs(startPage) + 1;
      startPage = 1;
    }

    if (endPage > totalPages) {
      startPage -= endPage - totalPages;
      endPage = totalPages;
    }

    const pages = [];

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("...");
      }
    }

    for (
      let i = Math.max(1, startPage);
      i <= Math.min(endPage, totalPages);
      i++
    ) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    setPageNumbers(pages);
  }, [totalItems, itemsPerPage, currentPage]);

  return (
    <nav>
      <ul className="flex items-center flex-wrap gap-2 justify-center mt-4">
        {currentPage > 1 && (
          <span>
            <svg
              onClick={() => paginate(currentPage - 1)}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.9254 4.55806C13.1915 4.80214 13.1915 5.19786 12.9254 5.44194L8.4375 9.55806C8.17138 9.80214 8.17138 10.1979 8.4375 10.4419L12.9254 14.5581C13.1915 14.8021 13.1915 15.1979 12.9254 15.4419C12.6593 15.686 12.2278 15.686 11.9617 15.4419L7.47378 11.3258C6.67541 10.5936 6.67541 9.40641 7.47378 8.67418L11.9617 4.55806C12.2278 4.31398 12.6593 4.31398 12.9254 4.55806Z"
                fill="#1C1C1C"
              />
            </svg>
          </span>
        )}
        {pageNumbers.map((number, index) => (
          <li key={index}>
            {number === "..." ? (
              <span className="px-4 py-2">{number}</span>
            ) : (
              <button
                onClick={() => paginate(number)}
                className={`text-[12px] ${
                  currentPage === number ? "font-bold bg-black-shade/5" : "  "
                } shadow-transparent shadow-2xl border-text-orange px-4 py-2 mx-1 rounded `}
              >
                {number}
              </button>
            )}
          </li>
        ))}
        {currentPage < Math.ceil(totalItems / itemsPerPage) && (
          <span>
            <svg
              onClick={() => paginate(currentPage + 1)}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.07459 15.4419C6.80847 15.1979 6.80847 14.8021 7.07459 14.5581L11.5625 10.4419C11.8286 10.1979 11.8286 9.80214 11.5625 9.55806L7.07459 5.44194C6.80847 5.19786 6.80847 4.80214 7.07459 4.55806C7.34072 4.31398 7.77219 4.31398 8.03831 4.55806L12.5262 8.67418C13.3246 9.40641 13.3246 10.5936 12.5262 11.3258L8.03831 15.4419C7.77219 15.686 7.34072 15.686 7.07459 15.4419Z"
                fill="#1C1C1C"
              />
            </svg>
          </span>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
