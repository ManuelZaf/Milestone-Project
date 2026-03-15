const updateOrderFormElements = document.querySelectorAll( //can be multiple items, have to choose all of them
  '.order-actions form'
);

async function updateOrder(event) {
  event.preventDefault();
  const form = event.target;

  const formData = new FormData(form);
  //built-in class in JS, can extract data from the form
  //using this .get method to get the different values that are part of the that form
  const newStatus = formData.get('status');
  const orderId = formData.get('orderid');
  const csrfToken = formData.get('_csrf');

  let response;

  try {
    response = await fetch(`/admin/orders/${orderId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        newStatus: newStatus,
        _csrf: csrfToken,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    alert('Something went wrong - could not update order status.');
    return;
  }

  if (!response.ok) {
    alert('Something went wrong - could not update order status.');
    return;
  }

  const responseData = await response.json();

  form.parentElement.parentElement.querySelector('.badge').textContent =
    responseData.newStatus.toUpperCase();
}

for (const updateOrderFormElement of updateOrderFormElements) {
  updateOrderFormElement.addEventListener('submit', updateOrder);
}