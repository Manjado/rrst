import { useDispatch } from "react-redux"

import { uiActions } from "../../store/ui-slice"
import classes from "./CartButton.module.css"

const CartButton = (props) => {
  const dispatch = useDispatch()

  const toggleCrtHandler = () => {
    dispatch(uiActions.toggle())
  }

  return (
    <button className={classes.button} onClick={toggleCrtHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  )
}

export default CartButton
