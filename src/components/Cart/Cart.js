import React, { useContext } from "react";
import styles from "./Cart.module.css";
import Modal from "./../UI/Modal";
import CartContext from "./../../store/cart-context";
import CartItem from "./CartItem";
const Cart = (props) => {
  const ctx = useContext(CartContext);
  const hasItems = ctx.items.length > 0;
  const totalAmount = `$${Math.abs(ctx.totalAmount.toFixed(2))}`;
  const addCartItemHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };
  const removeCartItemHandler = (id) => {
    ctx.removeItem(id);
  };
  const cartItems = (
    <ul className={styles["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={addCartItemHandler.bind(null, item)}
          onRemove={removeCartItemHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onHideCart={props.onCloseCart}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onCloseCart}>
          Close
        </button>
        {hasItems && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
