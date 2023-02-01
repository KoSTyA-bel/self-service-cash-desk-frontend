import React from 'react';

import styles from './Pagination.module.scss';

import { useDispatch, useSelector } from 'react-redux';

import { nextPage, prevPage } from '../../redux/slices/productSlice';

import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

const Pagination = () => {
  const dispatch = useDispatch();
  const pageNumber = useSelector((state) => state.products.page);

  const onClickNextPage = () => {
    dispatch(nextPage());
  };

  const onClickPrevPage = () => {
    dispatch(prevPage());
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.arrows}>
        <BsChevronLeft className={styles.arrow} onClick={onClickPrevPage} />
        <p>{pageNumber}</p>
        <BsChevronRight className={styles.arrow} onClick={onClickNextPage} />
      </div>
    </div>
  );
};

export default Pagination;
