// import {
//   addDoc, collection, doc, setDoc, Timestamp,
// } from 'firebase/firestore';
// import {
//   deleteObject,
//   getDownloadURL,
//   ref,
//   uploadBytesResumable,
// } from 'firebase/storage';
// import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { db, storage } from '../../../firebase/config';
// import Card from '../../card/Card';
// import Loader from '../../loader/Loader';
// import styles from './AddProduct.module.scss';
// import { selectProducts } from '../../../redux/slice/productSlice';

// const categories = [
//   { id: 1, name: 'Laptop' },
//   { id: 2, name: 'Electronics' },
//   { id: 3, name: 'Fashion' },
//   { id: 4, name: 'Phone' },
// ];

// const initialState = {
//   name: '',
//   imageURL: '',
//   price: 0,
//   category: '',
//   brand: '',
//   desc: '',
// };

// function detectForm(id, f1, f2) {
//   if (id === 'ADD') {
//     return f1;
//   }
//   return f2;
// }

// const AddProduct = () => {
//   const { id } = useParams();
//   const products = useSelector(selectProducts);
//   const productEdit = products.find((item) => item.id === id);
//   console.log(productEdit);

//   const [product, setProduct] = useState(() => {
//     const newState = detectForm(id, { ...initialState }, productEdit);
//     return newState;
//   });

//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   // function detectForm(id, f1, f2) {
//   //   if (id === 'ADD') {
//   //     return f1;
//   //   }
//   //   return f2;
//   // }

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProduct({ ...product, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     // console.log(file);

//     const storageRef = ref(storage, `eshop/${Date.now()}${file.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//       'state_changed',
//       (snapshot) => {
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setUploadProgress(progress);
//       },
//       (error) => {
//         toast.error(error.message);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           setProduct({ ...product, imageURL: downloadURL });
//           toast.success('Image uploaded successfully.');
//         });
//       },
//     );
//   };

//   const addProduct = (e) => {
//     e.preventDefault();
//     // console.log(product);
//     setIsLoading(true);

//     try {
//       const docRef = addDoc(collection(db, 'products'), {
//         name: product.name,
//         imageURL: product.imageURL,
//         price: Number(product.price),
//         category: product.category,
//         brand: product.brand,
//         desc: product.desc,
//         createdAt: Timestamp.now().toDate(),
//       });
//       setIsLoading(false);
//       setUploadProgress(0);
//       setProduct({ ...initialState });

//       toast.success('Product uploaded successfully.');
//       navigate('/admin/all-products');
//     } catch (error) {
//       setIsLoading(false);
//       toast.error(error.message);
//     }
//   };

//   const editProduct = (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     if (product.imageURL !== productEdit.imageURL) {
//       const storageRef = ref(storage, productEdit.imageURL);
//       deleteObject(storageRef);
//     }

//     try {
//       setDoc(doc(db, 'products', id), {
//         name: product.name,
//         imageURL: product.imageURL,
//         price: Number(product.price),
//         category: product.category,
//         brand: product.brand,
//         desc: product.desc,
//         createdAt: productEdit.createdAt,
//         editedAt: Timestamp.now().toDate(),
//       });
//       setIsLoading(false);
//       toast.success('Product Edited Successfully');
//       navigate('/admin/all-products');
//     } catch (error) {
//       setIsLoading(false);
//       toast.error(error.message);
//     }
//   };

//   return (
//     <>
//       {isLoading && <Loader />}
//       <div className={styles.product}>
//         <h2>{detectForm(id, 'Add New Product', 'Edit Product')}</h2>
//         <Card cardClass={styles.card}>
//           <form onSubmit={detectForm(id, addProduct, editProduct)}>
//             <label htmlFor="productName">Product name:</label>
//             <input
//               type="text"
//               placeholder="Product name"
//               required
//               name="name"
//               id="productName"
//               value={product.name}
//               onChange={(e) => handleInputChange(e)}
//             />

//             <label htmlFor="productImage">Product image:</label>
//             <Card cardClass={styles.group}>
//               {uploadProgress === 0 ? null : (
//                 <div className={styles.progress}>
//                   <div
//                     className={styles['progress-bar']}
//                     style={{ width: `${uploadProgress}%` }}
//                   >
//                     {uploadProgress < 100
//                       ? `Uploading ${uploadProgress}`
//                       : `Upload Complete ${uploadProgress}%`}
//                   </div>
//                 </div>
//               )}

//               <input
//                 type="file"
//                 accept="image/*"
//                 placeholder="Product Image"
//                 name="image"
//                 id="productImage"
//                 onChange={(e) => handleImageChange(e)}
//               />

//               {product.imageURL === '' ? null : (
//                 <input
//                   type="text"
//                   // required
//                   placeholder="Image URL"
//                   name="imageURL"
//                   value={product.imageURL}
//                   disabled
//                 />
//               )}
//             </Card>

//             <label htmlFor="productPrice">Product price:</label>
//             <input
//               type="number"
//               placeholder="Product price"
//               required
//               name="price"
//               id="productPrice"
//               value={product.price}
//               onChange={(e) => handleInputChange(e)}
//             />
//             <label htmlFor="productCategory">Product Category:</label>
//             <select
//               required
//               name="category"
//               id="productCategory"
//               value={product.category}
//               onChange={(e) => handleInputChange(e)}
//             >
//               <option value="" disabled>
//                 -- choose product category --
//               </option>
//               {categories.map((cat) => (
//                 <option key={cat.id} value={cat.name}>
//                   {cat.name}
//                 </option>
//               ))}
//             </select>

//             <label htmlFor="productCompany">Product Company/Brand:</label>
//             <input
//               type="text"
//               placeholder="Product brand"
//               required
//               name="brand"
//               id="productCompany"
//               value={product.brand}
//               onChange={(e) => handleInputChange(e)}
//             />

//             <label htmlFor="productDescription">Product Description</label>
//             <textarea
//               name="desc"
//               id="productDescription"
//               required
//               value={product.desc}
//               onChange={(e) => handleInputChange(e)}
//               cols="30"
//               rows="10"
//             />

//             <button type="button" className="--btn --btn-primary">
//               {detectForm(id, 'Save Product', 'Edit Product')}
//             </button>
//           </form>
//         </Card>
//       </div>
//     </>
//   );
// };

// export default AddProduct;
import {
  addDoc, collection, doc, setDoc, Timestamp,
} from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db, storage } from '../../../firebase/config';
import Card from '../../card/Card';
import Loader from '../../loader/Loader';
import styles from './AddProduct.module.scss';
import { selectProducts } from '../../../redux/slice/productSlice';

const categories = [
  { id: 1, name: 'Laptop' },
  { id: 2, name: 'Electronics' },
  { id: 3, name: 'Fashion' },
  { id: 4, name: 'Phone' },
];

const initialState = {
  name: '',
  imageURL: '',
  price: 0,
  category: '',
  brand: '',
  desc: '',
};

function detectForm(id, f1, f2) {
  if (id === 'ADD') {
    return f1;
  }
  return f2;
}

const AddProduct = () => {
  const { id } = useParams();
  const products = useSelector(selectProducts);
  const productEdit = products.find((item) => item.id === id);
  console.log(productEdit);

  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, { ...initialState }, productEdit);
    return newState;
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const storageRef = ref(storage, `eshop/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          toast.success('Image uploaded successfully.');
        });
      },
    );
  };

  const addProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      addDoc(collection(db, 'products'), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate(),
      }).then(() => {
        setIsLoading(false);
        setUploadProgress(0);
        setProduct({ ...initialState });

        toast.success('Product uploaded successfully.');
        navigate('/admin/all-products');
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const editProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (product.imageURL !== productEdit.imageURL) {
      const storageRef = ref(storage, productEdit.imageURL);
      deleteObject(storageRef);
    }

    try {
      setDoc(doc(db, 'products', id), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: productEdit.createdAt,
        editedAt: Timestamp.now().toDate(),
      }).then(() => {
        setIsLoading(false);
        toast.success('Product Edited Successfully');
        navigate('/admin/all-products');
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.product}>
        <h2>{detectForm(id, 'Add New Product', 'Edit Product')}</h2>
        <Card cardClass={styles.card}>
          <form onSubmit={detectForm(id, addProduct, editProduct)}>
            <label htmlFor="productName">
              Product name:
              <input
                type="text"
                placeholder="Product name"
                required
                name="name"
                id="productName"
                value={product.name}
                onChange={(e) => handleInputChange(e)}
              />
            </label>

            <label htmlFor="productImage">
              Product image:
              <input
                type="file"
                accept="image/*"
                placeholder="Product Image"
                name="image"
                id="productImage"
                onChange={(e) => handleImageChange(e)}
              />

            </label>
            <Card cardClass={styles.group}>
              {uploadProgress === 0 ? null : (
                <div className={styles.progress}>
                  <div
                    className={styles['progress-bar']}
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {uploadProgress < 100
                      ? `Uploading ${uploadProgress}`
                      : `Upload Complete ${uploadProgress}%`}
                  </div>
                </div>
              )}

              {product.imageURL === '' ? null : (
                <input
                  type="text"
                  placeholder="Image URL"
                  name="imageURL"
                  value={product.imageURL}
                  disabled
                />
              )}
            </Card>

            <label htmlFor="productPrice">
              Product price:
              <input
                type="number"
                placeholder="Product price"
                required
                name="price"
                id="productPrice"
                value={product.price}
                onChange={(e) => handleInputChange(e)}
              />
            </label>

            <label htmlFor="productCategory">
              Product Category:
              <select
                required
                name="category"
                id="productCategory"
                value={product.category}
                onChange={(e) => handleInputChange(e)}
              >
                <option value="" disabled>
                  -- choose product category --
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </label>

            <label htmlFor="productCompany">
              Product Company/Brand:
              <input
                type="text"
                placeholder="Product brand"
                required
                name="brand"
                id="productCompany"
                value={product.brand}
                onChange={(e) => handleInputChange(e)}
              />
            </label>

            <label htmlFor="productDescription">
              Product Description
              <textarea
                name="desc"
                id="productDescription"
                required
                value={product.desc}
                onChange={(e) => handleInputChange(e)}
                cols="30"
                rows="10"
              />
            </label>

            <button type="submit" className="--btn --btn-primary">
              {detectForm(id, 'Save Product', 'Edit Product')}
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddProduct;
