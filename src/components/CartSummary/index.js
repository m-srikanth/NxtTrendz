import Popup from 'reactjs-popup'
import {Component} from 'react'
import CartContext from '../../context/CartContext'

import './index.css'

class CartSummary extends Component {
  state = {isDisabled: false, isSuc: false}

  changeStat = () => {
    this.setState(pre => ({isDisabled: !pre.isDisabled}))
  }

  sucPrint = () => {
    this.setState(pre => ({isSuc: !pre.isSuc}))
  }

  render() {
    const {isDisabled, isSuc} = this.state
    console.log(isDisabled)

    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          let total = 0
          let itemsNo = 0
          cartList.forEach(eachCartItem => {
            total += eachCartItem.price * eachCartItem.quantity
            itemsNo += eachCartItem.quantity
          })

          return (
            <>
              <div className="cart-summary-container">
                <h1 className="order-total-value">
                  <span className="order-total-label">Order Total:</span> Rs{' '}
                  {total}
                  /-
                </h1>
                <p className="total-items">{cartList.length} Items in cart</p>
                <Popup
                  trigger={
                    <button type="button" className="checkout-button d-sm-none">
                      Checkout
                    </button>
                  }
                  position="center"
                >
                  {close => (
                    <div className="div1">
                      <button type="button" onClick={() => close()}>
                        close
                      </button>
                      <input type="checkbox" id="check" disabled="true" />
                      <label htmlFor="check">Net Banking</label>
                      <input
                        type="checkbox"
                        id="check"
                        onClick={this.changeStat}
                      />
                      <label htmlFor="check">Cash on Delivery</label>
                      {isDisabled && (
                        <button
                          type="button"
                          className="checkout-button"
                          onClick={this.sucPrint}
                        >
                          Confirm Order
                        </button>
                      )}
                      {isSuc && <p>Your order has been placed successfully</p>}
                      <h1 className="order-total-value">
                        <span className="order-total-label">Total Cost:</span>{' '}
                        Rs {total}
                        /-
                      </h1>
                      <p>Number of Items: {itemsNo}</p>
                    </div>
                  )}
                </Popup>
              </div>
              <Popup
                trigger={
                  <button type="button" className="checkout-button d-lg-none">
                    Checkout
                  </button>
                }
                position="right center"
              >
                {close => (
                  <div className="div1">
                    <button type="button" onClick={() => close()}>
                      close
                    </button>
                    <input
                      type="checkbox"
                      id="check"
                      onClick={this.changeStat}
                    />
                    <label htmlFor="check">Cash on Delivery</label>
                    {isDisabled && (
                      <button
                        type="button"
                        className="checkout-button"
                        onClick={this.sucPrint}
                      >
                        Confirm Order
                      </button>
                    )}
                    {isSuc && <p>Your order has been placed successfully</p>}
                    <h1 className="order-total-value">
                      <span className="order-total-label">Total Cost:</span> Rs{' '}
                      {total}
                      /-
                    </h1>
                    <p>Number of Items: {itemsNo}</p>
                  </div>
                )}
              </Popup>
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartSummary
