/*eslint-env jquery*/
'use strict';

const STORE = {
  itemList: [
    {name: 'apples', checked: false},
    {name: 'oranges', checked: false},
    {name: 'milk', checked: true},
    {name: 'bread', checked: false}
  ],
  hideCheckedItems: false,
};

function renderShoppingList() {
  console.log('`renderShoppingList`');
  const shoppingListItemsString = generateShoppingItemsString(STORE.itemList);
  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
  if (STORE.hideCheckedItems) {
    $('.js-shopping-list').html(generateShoppingItemsString([ ...STORE.itemList ].filter(i => !i.checked)));
  } //bug here where if hide checked items box is checked and then you click on
  //an item's check button it will disappear, but then if you click on the next
  //item's check button the previous item will reappear



}

function toggleHideCheckedItems() {
  console.log('toggleHideCheckedItems(); ran');
  STORE.hideCheckedItems = !STORE.hideCheckedItems;
  console.log(STORE.hideCheckedItems);
}

function handleToggleHideCheckedItems() {
  console.log('handleToggleHideCheckedItems() ran');
  $('.checkbox').on('click', '.js-toggle-hide-checked-items', function() {
    console.log('handleToggleHideCheckedItems(); was clicked');
    toggleHideCheckedItems();
    renderShoppingList();
  });
}

function generateItemElement(item, itemIndex, template){
  return `
  <li class="js-item-index-element"
  data-item-index="${itemIndex}">
    <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
    <div class="shopping-item-controls">
      <button class="shopping-item-toggle js-item-toggle">
          <span class="button-label">check</span>
      </button>
      <button class="shopping-item-delete js-item-delete">
          <span class="button-label">delete</span>
      </button>
    </div>
  </li>`;
}


function generateShoppingItemsString(shoppingList) {
  console.log('Generating shopping list element');
  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  return items.join('');
}





function handleNewItemSubmit() {
  function addItemToShoppingList (itemName){
    console.log(`Adding "${itemName}" to shopping list`);
    STORE.itemList.push({name: itemName, checked: false});
  }
  // this function will be responsible for when users add a new shopping list item
  $('#js-shopping-list-form').submit(function(event){
    event.preventDefault();
    const newItemName = $('.js-shopping-list-entry').val();
    console.log(newItemName);
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });

}

function toggleCheckedForListItem(itemIndex) {
  console.log('Toggling checked property for item at index ' + itemIndex);
  STORE.itemList[itemIndex].checked = !STORE.itemList[itemIndex].checked;
}

function getItemIndexFromElement(item) {
  const itemIndexString = $(item).closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString);

}

function handleItemCheckClicked() {
  // this function will be responsible for when users click the "check" button on
  // a shopping list item.
  $('.js-shopping-list').on('click', '.js-item-toggle', function(event){
    //console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    console.log(itemIndex);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });

}

function deleteListItemFromStore (itemIndex){
  console.log('Deleting item at index ' + itemIndex);
  STORE.itemList.splice(itemIndex, 1);
}

function handleDeleteItemClicked() {
  // this function will be responsible for when users want to delete a shopping list
  // item
  $('.js-shopping-list').on('click', '.js-item-delete', function(event){
    //console.log('`handleDeleteItemClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    console.log(itemIndex);
    deleteListItemFromStore(itemIndex);
    renderShoppingList();
  });
}

//doc ready function
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();

  handleToggleHideCheckedItems();
}

$(handleShoppingList());
