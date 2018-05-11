import React, {Component} from 'react'
import {graphql} from 'react-apollo'
import {Product} from './nested_components/product'

import listProductsQuery from './graphql/listProducts.graphql'

const MAX_ITEMS = 3

class ListProducts extends Component {
  render () {
    const {
      maxItems,
      data: {
        loading,
        products
      }
    } = this.props

    return (
      <div>
      <div className="mh5-ns f4">{products && products.slice(0, maxItems).map(product => (<Product product={product}/>))}</div>
      </div>
    )
  }
}

ListProducts.defaultProps = {
  maxItems: MAX_ITEMS
}

ListProducts.getSchema = (props) => {
  return {
    title: 'ListProducts',
    description: 'A simple shelf',
    type: 'object',
    properties: {
      maxItems: {
        title: 'Max Items',
        type: 'number',
        default: ListProducts.defaultProps.maxItems,
      },
    },
  }
}

ListProducts.propTypes = {
  maxItems: PropTypes.int,
}

export default graphql(listProductsQuery, {
  options: ({
    maxItems = ListProducts.defaultProps.maxItems,
  }) => ({
    variables: {
      from: 0,
      to: maxItems-1
    }
  })
})(ListProducts)
