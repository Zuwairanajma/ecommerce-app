// import React, { useEffect, useState } from 'react';
// import { BsFillGridFill } from 'react-icons/bs';
// import { FaListAlt } from 'react-icons/fa';
// import { useDispatch, useSelector } from 'react-redux';
// import styles from './ProductList.module.scss';
// import Search from '../../search/Search';
// import ProductItem from '../productItem/ProductItem';
// import {
//   FILTER_BY_SEARCH,
//   selectFilteredProducts,
//   SORT_PRODUCTS,
// } from '../../../redux/slice/filterSlice';
// import Pagination from '../../pagination/Pagination';

// const ProductList = ({ products }) => {
//   const [grid, setGrid] = useState(true);
//   const [search, setSearch] = useState('');
//   const [sort, setSort] = useState('latest');
//   const filteredProducts = useSelector(selectFilteredProducts);

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [productsPerPage] = useState(9);
//   // Get Current Products
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = filteredProducts.slice(
//     indexOfFirstProduct,
//     indexOfLastProduct,
//   );

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(SORT_PRODUCTS({ products, sort }));
//   }, [dispatch, products, sort]);

//   useEffect(() => {
//     dispatch(FILTER_BY_SEARCH({ products, search }));
//   }, [dispatch, products, search]);

//   return (
//     <div className={styles['product-list']} id="product">
//       <div className={styles.top}>
//         <div className={styles.icons}>
//           <BsFillGridFill
//             size={22}
//             color="orangered"
//             onClick={() => setGrid(true)}
//           />

//           <FaListAlt size={24} color="#0066d4" onClick={() => setGrid(false)} />

//           <p>
//             <b>{filteredProducts.length}</b>
//             {' '}
//             Products found.
//           </p>
//         </div>
//         {/* Search Icon */}
//         <div>
//           <Search value={search} onChange={(e) => setSearch(e.target.value)} />
//         </div>
//         {/* Sort Products */}
//         <div className={styles.sort}>
//           <label>Sort by:</label>
//           <select value={sort} onChange={(e) => setSort(e.target.value)}>
//             <option value="latest">Latest</option>
//             <option value="lowest-price">Lowest Price</option>
//             <option value="highest-price">Highest Price</option>
//             <option value="a-z">A - Z</option>
//             <option value="z-a">Z - A</option>
//           </select>
//         </div>
//       </div>

//       <div className={grid ? `${styles.grid}` : `${styles.list}`}>
//         {products.lenght === 0 ? (
//           <p>No product found.</p>
//         ) : (
//           <>
//             {currentProducts.map((product) => (
//               <div key={product.id}>
//                 <ProductItem {...product} grid={grid} product={product} />
//               </div>
//             ))}
//           </>
//         )}
//         <Pagination
//           currentPage={currentPage}
//           setCurrentPage={setCurrentPage}
//           productsPerPage={productsPerPage}
//           totalProducts={filteredProducts.length}
//         />
//       </div>
//     </div>
//   );
// };

// export default ProductList;

import React, { useEffect, useState } from 'react';
import { BsFillGridFill } from 'react-icons/bs';
import { FaListAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types'; // Import PropTypes
import styles from './ProductList.module.scss';
import Search from '../../search/Search';
import ProductItem from '../productItem/ProductItem';
import {
  FILTER_BY_SEARCH,
  selectFilteredProducts,
  SORT_PRODUCTS,
} from '../../../redux/slice/filterSlice';
import Pagination from '../../pagination/Pagination';

const ProductList = ({ products }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('latest');
  const filteredProducts = useSelector(selectFilteredProducts);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SORT_PRODUCTS({ products, sort }));
  }, [dispatch, products, sort]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);

  return (
    <div className={styles['product-list']} id="product">
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill
            size={22}
            color="orangered"
            onClick={() => setGrid(true)}
          />
          <FaListAlt
            size={24}
            color="#0066d4"
            onClick={() => setGrid(false)}
          />
          <p>
            <b>{filteredProducts.length}</b>
            Products found.
          </p>
        </div>
        {/* Search Icon */}
        <div>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {/* Sort Products */}
        <div className={styles.sort}>
          <label htmlFor="sortSelect">
            Sort by:
            <select
              id="sortSelect"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="latest">Latest</option>
              <option value="lowest-price">Lowest Price</option>
              <option value="highest-price">Highest Price</option>
              <option value="a-z">A - Z</option>
              <option value="z-a">Z - A</option>
            </select>
          </label>

        </div>
      </div>

      <div className={grid ? `${styles.grid}` : `${styles.list}`}>
        {products.length === 0 ? (
          <p>No product found.</p>
        ) : (
          <>
            {filteredProducts.map((product) => (
              <div key={product.id}>
                <ProductItem
                  id={product.id}
                 // Pass other necessary props directly
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  grid={grid}
                />
              </div>
            ))}
          </>
        )}
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          productsPerPage={productsPerPage}
          totalProducts={filteredProducts.length}
        />
      </div>
    </div>
  );
};

// Define prop types for the ProductList component
ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      // Add more prop types based on your product object structure
    }),
  ).isRequired,
};

export default ProductList;
