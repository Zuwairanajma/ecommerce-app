// import React, { useState } from 'react';
// import styles from './Pagination.module.scss';

// const Pagination = ({
//   currentPage,
//   setCurrentPage,
//   productsPerPage,
//   totalProducts,
// }) => {
//   const pageNumbers = [];
//   const totalPages = totalProducts / productsPerPage;
//   // Limit the page Numbers shown
//   const [pageNumberLimit] = useState(5);
//   const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
//   const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

//   // Paginate
//   const paginate = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   // GO to next page
//   const paginateNext = () => {
//     setCurrentPage(currentPage + 1);
//     // Show next set of pageNumbers
//     if (currentPage + 1 > maxPageNumberLimit) {
//       setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
//       setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
//     }
//   };

//   // GO to prev page
//   const paginatePrev = () => {
//     setCurrentPage(currentPage - 1);
//     // Show prev set of pageNumbers
//     if ((currentPage - 1) % pageNumberLimit === 0) {
//       setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
//       setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
//     }
//   };

//   for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
//     pageNumbers.push(i);
//   }
//   // console.log(pageNumbers);

//   return (
//     <ul className={styles.pagination}>
//       <li
//         onClick={paginatePrev}
//         className={currentPage === pageNumbers[0] ? `${styles.hidden}` : null}
//       >
//         Prev
//       </li>

//       {pageNumbers.map((number) => {
//         if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
//           return (
//             <li
//               key={number}
//               onClick={() => paginate(number)}
//               className={currentPage === number ? `${styles.active}` : null}
//             >
//               {number}
//             </li>
//           );
//         }
//       })}

//       <li
//         onClick={paginateNext}
//         className={
//           currentPage === pageNumbers[pageNumbers.length - 1]
//             ? `${styles.hidden}`
//             : null
//         }
//       >
//         Next
//       </li>

//       <p>
//         <b className={styles.page}>{`page ${currentPage}`}</b>
//         <span>{' of '}</span>
//         <b>{`${Math.ceil(totalPages)}`}</b>
//       </p>
//     </ul>
//   );
// };

// export default Pagination;

import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import styles from './Pagination.module.scss';

const Pagination = ({
  currentPage,
  setCurrentPage,
  productsPerPage,
  totalProducts,
}) => {
  const pageNumbers = [];
  const totalPages = totalProducts / productsPerPage;
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginateNext = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const paginatePrev = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className={styles.pagination}>
      <li
        onClick={paginatePrev}
        onKeyDown={(e) => {
          if (e.keyCode === 13 || e.keyCode === 27) {
            paginatePrev();
          }
        }}
        className={
          currentPage === pageNumbers[0] ? styles.hidden : null
        }
        tabIndex={0}
        role="menuitem"
      >
        Prev
      </li>

      {pageNumbers.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
          return (
            <li
              key={number}
              onClick={() => paginate(number)}
              onKeyDown={(e) => {
                if (e.keyCode === 13 || e.keyCode === 27) {
                  paginate(number);
                }
              }}
              className={
                currentPage === number ? styles.active : null
              }
              tabIndex={0}
              role="menuitem"
            >
              {number}
            </li>
          );
        }
        return null; // Ensure a value is returned for all cases
      })}

      <li
        onClick={paginateNext}
        onKeyDown={(e) => {
          if (e.keyCode === 13 || e.keyCode === 27) {
            paginateNext();
          }
        }}
        className={
          currentPage === pageNumbers[pageNumbers.length - 1]
            ? styles.hidden
            : null
        }
        tabIndex={0}
        role="menuitem"
      >
        Next
      </li>

      <p>
        <b className={styles.page}>{`page ${currentPage}`}</b>
        <span>{' of '}</span>
        <b>{`${Math.ceil(totalPages)}`}</b>
      </p>
    </ul>
  );
};

// Define PropTypes for the component's props
Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  productsPerPage: PropTypes.number.isRequired,
  totalProducts: PropTypes.number.isRequired,
};

export default Pagination;
