import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails, updateProduct } from "../actions/productActions";
import axios from 'axios'
import Loading from "../components/Loading";

const ProductEdit = ({ isOpen }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [printLength, setPrintLength] = useState(0);
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(1);
  const [uploading, setUploading] = useState(false);

  const { isLoading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const { isLoading: isLoadingUpdate, error: errorUpdate, success: successUpdate } = useSelector(
    (state) => state.productUpdate
  );

  useEffect(() => {
    if(successUpdate) {
      dispatch({ type: 'PRODUCT_UPDATE_RESET'});
      history.push('/admin/productlist')
    } else {
      if (!product.name || product._id !== id) {
        dispatch(fetchProductDetails(id));
      } else {
        setName(product.name);
        setImage(product.image);
        setAuthor(product.author);
        setGenre(product.genre);
        setPublisher(product.publisher);
        setPublicationDate(product.publicationDate);
        setDescription(product.description);
        setLanguage(product.language);
        setPrintLength(product.printLength);
        setPrice(product.price);
        setCountInStock(product.countInStock);
      }
    }
  }, [dispatch, product, history, id, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct({
      _id: id,
      name,
      price,
      description,
      image,
      author,
      genre,
      publicationDate,
      publisher,
      language,
      printLength,
      countInStock,
    }))
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  return (
    <div className={isOpen ? "product-edit open" : "product-edit"}>
      <div className="edit-form">
        <h3>Edit Product</h3>
        {isLoadingUpdate && <Loading /> }
        {errorUpdate && <p>{errorUpdate}</p>}
        {isLoading && <Loading /> }
        {error && <p>{error}</p>}
        {isLoading ? ( <Loading /> ) : error ? ( <p className="error">{error}</p>) : (
          <form onSubmit={submitHandler}>
            <label htmlFor="name"> Name </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="author"> Author </label>
            <input
              type="text"
              name="author"
              id="author"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <label htmlFor="price"> Price </label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <label htmlFor="image"> Image </label>
            <input
              type="text"
              name="image"
              id="image"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <label htmlFor="myfile">Select a file : </label>
            <input 
              type="file" 
              id="myfile" 
              name="myfile"
              onChange={uploadFileHandler}
            />
            {uploading && <p>Loading ...</p>}
            <label htmlFor="genre"> Genre </label>
            <input
              type="text"
              name="genre"
              id="genre"
              placeholder="Genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
            <label htmlFor="publisher"> Publisher </label>
            <input
              type="text"
              name="publisher"
              id="publisher"
              placeholder="Publisher"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
            />
            <label htmlFor="pdate"> Publication Date </label>
            <input
              type="text"
              id="pdate"
              name="publicationDate"
              placeholder="YYYY-MM-DD"
              value={publicationDate}
              onChange={(e) => setPublicationDate(e.target.value)}
            />
            <label htmlFor="language"> Language </label>
            <input
              type="text"
              name="language"
              id="language"
              placeholder="Language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
            <label htmlFor="name"> Print Length </label>
            <input
              type="number"
              name="printLength"
              id="printLength"
              placeholder="Print Length"
              value={printLength}
              onChange={(e) => setPrintLength(e.target.value)}
            />
            <label htmlFor="stock"> Count in stock </label>
            <input
              type="number"
              name="countInStock"
              id="stock"
              placeholder="Count In Stock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            />
            <label htmlFor="description"> Description </label>
            <textarea rows="10" cols="40"
              name="description"
              id="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Save Changes</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductEdit;
