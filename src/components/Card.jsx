import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../store/slices/productSlice';

const Card = ({ id, name, price, imageUrl, onEdit }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteProduct(id));
  };

  return (
    <div className="card-wrapper col-md-4">
      <div className="card">
        <div
          className="card-image"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        <div className="card-body text-center">
          <h5 className="card-title">{name}</h5>
          
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
