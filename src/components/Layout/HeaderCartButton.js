import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.css";
import CartContext from "./../../store/cart-context";
const HeaderCartButton = (props) => {
  const [cartIsAnimated, setCartIsAnimated] = useState(false);
  const ctx = useContext(CartContext);
  const { items } = ctx;
  const numberOfItems = items.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.amount;
  }, 0);
  const btnClasses = `${styles.button} ${cartIsAnimated ? styles.bump : ""}`;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setCartIsAnimated(true);
    const timer = setTimeout(() => {
      setCartIsAnimated(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfItems}</span>
    </button>
  );
};

export default HeaderCartButton;
