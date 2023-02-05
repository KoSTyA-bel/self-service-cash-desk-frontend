import React from 'react';

import styles from './Pagination.module.scss';

import { useDispatch, useSelector } from 'react-redux';

import { nextPage, prevPage } from '../../redux/slices/productSlice';

import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

const Pagination = () => {
  const dispatch = useDispatch();
  const pageNumber = useSelector((state) => state.products.page);
  const isActive = useSelector((state) => state.products.isActive);

  const onClickNextPage = () => {
    if (isActive) {
      dispatch(nextPage());
    }
  };

  const onClickPrevPage = () => {
    if (pageNumber > 1) {
      dispatch(prevPage());
    }
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.arrows}>
        <BsChevronLeft
          className={`${styles.arrow} ${pageNumber <= 1 ? styles.arrowInactive : null}`}
          onClick={onClickPrevPage}
        />
        <p>{pageNumber}</p>
        <BsChevronRight
          className={`${styles.arrow} ${!isActive ? styles.arrowInactive : null}`}
          onClick={onClickNextPage}
        />
      </div>
    </div>
  );
};

export default Pagination;
