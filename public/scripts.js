const showItems = async () => {
  const itemData = await fetch('/api/v1/all_items')
  const itemJson = await itemData.json()
  const items = itemJson.items

  $('.item-list').addClass('clicked').empty()

  if ($('.item-list').addClass('clicked')) {
  const shownItems = items.map(item => {
  $('.item-list').append(
    `<div class="item-cards">
      <h4>${item.itemName}</h4>
      <span>${item.itemReason}</span>
      <span>${item.itemCleanliness}</span>
    </div>
    `)
  }) 
    return shownItems  
  } else {
    $('.item-list').removeClass('clicked')
  }
}


$('.show-btn').on('click', showItems)
