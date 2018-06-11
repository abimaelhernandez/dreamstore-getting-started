import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {ExtensionPoint} from 'render'
import Card from '@vtex/styleguide/lib/Card'

const productLink = (product) => `https://dreamstore.myvtexdev.com/${product.linkText}/p`

// We can make any architecture we wish using default React
export class Product extends Component {
  render() {
    const {product} = this.props
    return (
      <Card>{product.productName}</Card>
    )
  }
}

Product.propTypes = {
  product: PropTypes.shape({
    productName: PropTypes.string,
    productId: PropTypes.string,
  })
}
