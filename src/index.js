// ITERATION 1
let totalPrice = 0;
const totalPriceElement = document.querySelector('#total-value span');

const productInputs = document.querySelectorAll('tfoot input');
const productNameInput = productInputs[0];
const productPriceInput = productInputs[1];

const createButton = document.getElementById('create');

productNameInput.addEventListener('input', handleInputInput);
productPriceInput.addEventListener('input', handleInputInput);

function handleInputInput() {
  if (productNameInput.value && +productPriceInput.value) {
    createButton.disabled = false;
  } else {
    createButton.disabled = true;
  }
}

function updateSubtotal(product) {
  const priceElement = product.querySelector('.price span');
  const quantityElement = product.querySelector('.quantity input');
  const subtotalElement = product.querySelector('.subtotal span');

  const subtotalPrice =
    Number(priceElement.textContent) * Number(quantityElement.value);

  subtotalElement.textContent = subtotalPrice;

  return subtotalPrice;
}

function calculateAll() {
  resetTotalPrice();

  const products = document.querySelectorAll('.product');

  products.forEach((product) => {
    const subtotalPrice = updateSubtotal(product);
    totalPrice += subtotalPrice;
  });

  totalPriceElement.textContent = totalPrice;
}

function resetTotalPrice() {
  totalPriceElement.textContent = 0;
  totalPrice = 0;
}

// ITERATION 4

function removeProduct(event) {
  const target = event.target;
  console.log('The target in remove is:', target);

  target.closest('tr').remove();

  // const parent = target.parentNode.parentNode;
  // parent.remove();
}

// ITERATION 5

function createProduct() {
  const productTable = document.querySelector('tbody');
  const newProduct = document.createElement('tr');
  const priceFormated = formatPrice(productPriceInput.value);

  newProduct.classList.add('product');
  newProduct.innerHTML = `
    <td class="name">
      <span>${productNameInput.value}</span>
    </td>
    <td class="price">
      $<span>${priceFormated}</span>
    </td>
    <td class="quantity">
      <input type="number" value="0" min="0" placeholder="Quantity" />
    </td>
    <td class="subtotal">
      $<span>0</span>
    </td>
    <td class="action">
      <button class="btn btn-remove">Remove</button>
    </td>
  `;

  newProduct
    .querySelector('.btn-remove')
    .addEventListener('click', removeProduct);

  productTable.append(newProduct);
  resetInputs();
}

function resetInputs() {
  productNameInput.value = '';
  productPriceInput.value = 0;
}

function formatPrice(price) {
  return Number(price).toFixed(2);
}

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');

  const removeButtons = document.getElementsByClassName('btn-remove');

  calculatePricesBtn.addEventListener('click', calculateAll);

  createButton.disabled = true;
  createButton.addEventListener('click', createProduct);

  [...removeButtons].forEach((button) => {
    button.addEventListener('click', removeProduct);
  });
});
