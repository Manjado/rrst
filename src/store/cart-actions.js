import { uiActions } from "./ui-slice"
import { cartActions } from "./cart-slice"

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://food-app-994e5-default-rtdb.europe-west1.firebasedatabase.app/cart.json"
      )

      if (!response.ok) {
        throw new Error("Could not fetch cart data!")
      }

      const data = await response.json()

      return data
    }

    try {
      const cartData = await fetchData()
      console.log(cartData, "cd")
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      )
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          titile: "Error!",
          message: "Fetching cart data failed!",
        })
      )
    }
  }
}

export const sendCartData = ({ items, totalQuantity }) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        titile: "Sending",
        message: "Sending cart data!",
      })
    )

    const sendRequest = async () => {
      const response = await fetch(
        "https://food-app-994e5-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({ items, totalQuantity }),
        }
      )

      if (!response.ok) {
        throw new Error("Sending cart data failed.")
      }
    }
    try {
      await sendRequest()

      dispatch(
        uiActions.showNotification({
          status: "success",
          titile: "Success",
          message: "Sent cart data successfully!",
        })
      )
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          titile: "Error!",
          message: "Sending cart data failed!",
        })
      )
    }
  }
}
