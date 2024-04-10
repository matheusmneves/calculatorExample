let products = [];

function addProduct() {
  const product = document.getElementById('product').value;
  const price = parseFloat(document.getElementById('price').value);
  const existingProductIndex = products.findIndex(p => p.name === product);
  if(existingProductIndex !== -1) {
    alert('Product already exists, it will update the price per unit');
    products[existingProductIndex].price = price;
  } else { 
    products.push({ name: product, price: price });
  }
  updateProductDropdown();
}

function updateProductDropdown() {
  const dropdown = document.getElementById('product-dropdown');
  dropdown.innerHTML = '';
  products.forEach(product => {
    const option = document.createElement('option');
    option.text = product.name;
    dropdown.add(option);
  });
}

let cart = [];

function startTransaction() {
  cart = [];
  document.getElementById('receipt-list').innerHTML = '';
  document.getElementById('total-amount').textContent = '';
  document.getElementById('total-price').textContent = '';
  document.getElementById('amount-tax').textContent = '';
  document.getElementById('amount-paid').textContent = '';
  document.getElementBtyId('quantity').textContent = '';
}

function addToCart() {
  const selectedProduct = document.getElementById('product-dropdown').value;
  const quantity = parseInt(document.getElementById('quantity').value);
  const product = products.find(p => p.name === selectedProduct);
  if (product) {
    cart.push({ name: product.name, price: product.price, quantity: quantity });
    updateReceipt();
  }
}

function updateReceipt() {
  const receiptTable = document.getElementById('receipt-table');
  const tbody = receiptTable.getElementsByTagName('tbody')[0];
  tbody.innerHTML = '';
  
  cart.forEach(item => {
    const row = tbody.insertRow();
    const nameCell = row.insertCell(0);
    const priceCell = row.insertCell(1);
    const quantityCell = row.insertCell(2);
    const totalCell = row.insertCell(3);

    nameCell.textContent = item.name;
    priceCell.textContent = `$${item.price.toFixed(2)}`;
    quantityCell.textContent = item.quantity;
    totalCell.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
  });
  calculateTotal();
}

function calculateTotal() {
  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price * item.quantity;
  });

  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  document.getElementById('total-price').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('amount-tax').textContent = `$${tax.toFixed(2)}`;
  document.getElementById('amount-paid').textContent = `$${total.toFixed(2)}`;
}

function addUnit(unit) {
  document.getElementById('quantity').value = unit;
}

function pay() {
  if(cart.length === 0) {
    alert('No items in the cart. Add items to the cart first. Please try again.');
    return;
  }
  alert('Thank you for your purchase!');
  startTransaction();
}

window.onload = function() {
  const dateTime = new Date().toLocaleString();
  document.getElementById('date-time').textContent = `Date and Time: ${dateTime}`;
  updateProductDropdown();
  startTransaction();
}