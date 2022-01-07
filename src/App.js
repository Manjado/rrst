import { Fragment, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import Cart from "./components/Cart/Cart"
import Layout from "./components/Layout/Layout"
import Products from "./components/Shop/Products"
import { uiActions } from "./store/ui-slice"
import Notification from "./components/UI/Notification"

let isInitial = true

function App() {
  const dispatch = useDispatch()
  const showCart = useSelector((state) => state.ui.cartIsVisible)
  const cart = useSelector((state) => state.cart)
  const notification = useSelector((state) => state.ui.notification)

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          titile: "Sending",
          message: "Sending cart data!",
        })
      )
      const response = await fetch(
        "https://food-app-994e5-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      )

      if (!response.ok) {
        throw new Error("Sending cart data failed.")
      }

      dispatch(
        uiActions.showNotification({
          status: "success",
          titile: "Success",
          message: "Sent cart data successfully!",
        })
      )

      //const responseData = await response.json()
    }

    if (isInitial) {
      isInitial = false
      return
    }

    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          titile: "Error!",
          message: "Sending cart data failed!",
        })
      )
    })
  }, [cart, dispatch])
  console.log("notification", notification)
  const { status, title, message } = notification || {}
  return (
    <Fragment>
      {notification && (
        <Notification status={status} title={title} message={message} />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  )
}

export default App
