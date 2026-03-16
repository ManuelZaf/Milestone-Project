const addToCartButtonElement = document.querySelector(
  '#product-details button',
);

const cartBadgeElements = document.querySelectorAll('.nav-items .badge');

async function addToCart() {
  const productId = addToCartButtonElement.dataset.productid; //We have access to this from the dataset attribute of this element
  const csrfToken = addToCartButtonElement.dataset.csrf;

  let response;

  try {
    response = await fetch('/cart/items', {
      method: 'POST',
      body: JSON.stringify({
        productId: productId,
        //We need to provide the productId of the product that should be added to the cart.
        //We need that in the cart.contorller from the incoming request body.
        _csrf: csrfToken,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    alert('Something went wrong!');
    return;
  }

  if (!response.ok) {
    alert('Something went wrong!');
    return;
  }

  const responseData = await response.json(); //This method decode the response data from JSON to regular JS
  //it yields a promise and we have to await this

  const newTotalQuantity = responseData.newTotalItems;

  for (const cartBadgeElement of cartBadgeElements) {
    cartBadgeElement.textContent = newTotalQuantity;
  }
}

addToCartButtonElement.addEventListener('click', addToCart);
