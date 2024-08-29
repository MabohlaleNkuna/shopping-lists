// src/components/Card.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../store/slices/productSlice';
import StyledImage from './StyledImage'; // Import the StyledImage component

const Card = ({ id, name, price, imageUrl, onEdit }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteProduct(id));
  };

  return (
    <div className="card-wrapper col-md-4">
      <div className="card">
        <div className="card-image">
          <StyledImage src={imageUrl} alt={name} />
        </div>
        <div className="card-body text-center">
          <h5 className="card-title">{name}</h5>
          <p className="card-price">{price}</p> {/* Assuming you want to display the price */}
          <button
            className="btn btn-danger"
            onClick={handleDelete}
          >
            Delete
          </button>
          {onEdit && (
            <button
              className="btn btn-warning mt-2"
              onClick={() => onEdit(id)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
