import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CashRegister from '../../../components/CashRegister/CashRegister';

import styles from './Administration.module.scss';

import {
  createSelfCheckout,
  getSelfCheckouts,
  deleteSelfCheckout,
  updateSelfCheckout,
} from '../../../redux/slices/selfCheckoutSlice';
import { Link } from 'react-router-dom';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';

const SelfCheckouts = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.selfCheckouts.selfCheckouts);
  const [isActive, setActive] = React.useState(false);

  const onChangeActivity = (e) => {
    if (e.target.checked) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  const onClickButton = async () => {
    await dispatch(createSelfCheckout(isActive));
    dispatch(getSelfCheckouts());
  };

  const onClickDelete = async (id) => {
    await dispatch(deleteSelfCheckout(id));
    dispatch(getSelfCheckouts());
  };

  const onClickChangeActivity = async (id, activity) => {
    await dispatch(updateSelfCheckout({ id, data: { isActive: !activity } }));
    dispatch(getSelfCheckouts());
  };

  React.useEffect(() => {
    dispatch(getSelfCheckouts());
  }, []);

  return (
    <div>
      <header>
        <Link to="/admin">
          <BsFillArrowLeftSquareFill className={styles.arrow} />
        </Link>
        <h1>Selfcheckouts</h1>
      </header>
      <div className={styles.activity}>
        <p>Active</p>
        <input onChange={onChangeActivity} type="checkbox" />
        <button onClick={onClickButton}>Create</button>
      </div>
      <div className={styles.cashregs}>
        {items.map((obj, index) => (
          <CashRegister
            key={obj.id}
            {...obj}
            index={index}
            isAdmin={true}
            onClickDelete={() => onClickDelete(obj.id)}
            onClickChangeActivity={() => onClickChangeActivity(obj.id, obj.isActive)}
          />
        ))}
      </div>
    </div>
  );
};

export default SelfCheckouts;
