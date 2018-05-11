import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {ExtensionPoint} from 'render'
import Card from '@vtex/styleguide/lib/Card'

export class Product extends Component {
  render() {
    const {product: {productName, productId}} = this.props
    return (
      <Card>{productName}: {productName}</Card>
    )
  }
}

Product.propTypes = {
  product: PropTypes.shape({
    productName: PropTypes.string,
    productId: PropTypes.string,
  })
}
