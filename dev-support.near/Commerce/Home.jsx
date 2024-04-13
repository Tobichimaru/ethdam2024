const products = Near.view("commerce.dev-support.near", "get_items");

const thisUserProducts = products.filter(product => product.owner_id === context.accountId);
const otherProductsForSale = products.filter(product => product.owner_id !== context.accountId && product.status === "FORSALE");
const otherProductsSold = products.filter(product => product.owner_id !== context.accountId && product.status === "SOLD");

return <>
  <div class="row">
    <div>
      <h2>Your Items</h2>
      {thisUserProducts.map(product => (
        <div class="col-6">
          <Widget
            src="dev-support.near/widget/Commerce.Product.Preview"
            props={{
              title: product.name,
              text: product.description,
              price: product.price,
              img: product.image
            }}
          />
        </div>
      ))}
    </div>
    
    <div>
      <h2>Items For Sale</h2>
      {otherProductsForSale.map(product => (
        <div class="col-6">
          <Widget
            src="dev-support.near/widget/Commerce.Product.Preview"
            props={{
              title: product.name,
              text: product.description,
              price: product.price,
              img: product.image
            }}
          />
        </div>
      ))}
    </div>
    
    <div>
      <h2>Sold Items</h2>
      {otherProductsSold.map(product => (
        <div class="col-6">
          <Widget
            src="dev-support.near/widget/Commerce.Product.Preview"
            props={{
              title: product.name,
              text: product.description,
              price: product.price,
              img: product.image
            }}
          />
        </div>
      ))}
    </div>
  </div>
</>