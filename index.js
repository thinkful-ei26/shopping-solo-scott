/*eslint-env jquery*/
'use strict';

const STORE = [
  {name: 'apples', checked: false},
  {name: 'oranges', checked: false},
  {name: 'milk', checked: true},
  {name: 'bread', checked: false}
];

function generateShoppingItemsString(shoppingList) {
  console.log("Generating shopping list element");
  const items = shoppingList.map((item, index) => generateItemElement(item, index));


  return `
    <li>apples</li>
    <li>oranges</li>
    <li>milk</li>
    <li>bread</li>
  `;
}

function renderShoppingList() {
  console.log('`renderShoppingList`');
  const shoppingListItemsString = generateShoppingItemsString(STORE);
  const shoppingListItemsString = '<li>apples</li>';
  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}

function handleNewItemSubmit() {
  // this function will be responsible for when users add a new shopping list item
  console.log('`handleNewItemSubmit` ran');
}

function handleItemCheckClicked() {
  // this function will be responsible for when users click the "check" button on
  // a shopping list item.
  console.log('`handleItemCheckClicked` ran');
}

function handleDeleteItemClicked() {
  // this function will be responsible for when users want to delete a shopping list
  // item
  console.log('`handleDeleteItemClicked` ran')
}

//doc ready function
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
}

$(handleShoppingList);
