import { useContext, useEffect } from 'react'
import { ShopContext } from "../context/ShopContext"
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

function Verify() {
  const { navigate, token, setCartItems } = useContext(ShopContext)
  const [searchParams] = useSearchParams()

  const verifyPayment = async () => {
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    if (!token) return

    try {
      const response = await axios.post(
        "Backend_Url/api/order/verifyStripe",
        { success, orderId },
        { headers: { token } }
      )

      if (response.data.success) {
        setCartItems({})
        navigate('/orders')
      } else {
        navigate('/cart')
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    verifyPayment()
  }, [token])

  return <div></div>
}

export default Verify
