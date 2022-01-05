import ProductItem from "./ProductItem"
import classes from "./Products.module.css"

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    price: 6,
    title: "JS book",
    description: "You do not know JS",
  },
  {
    id: "p2",
    price: 8,
    title: "TS book",
    description: "You do not know TS",
  },
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map(({ title, price, description, key }) => (
          <ProductItem
            key={key}
            title={title}
            price={price}
            description={description}
          />
        ))}
      </ul>
    </section>
  )
}

export default Products
