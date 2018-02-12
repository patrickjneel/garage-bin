const showItems = async () => {
  const itemData = await fetch('/api/v1/all_items')
  const itemJson = await itemData.json()
  const items = itemJson.items

  const shownItems = items.map(item => {
    console.log(item.itemName)
  $('.item-area').append(
    `<h4>${item.itemName}</h4>
    <span>${item.itemReason}</span>
    <span>${item.itemCleanliness}</span>
    `)
  }) 
  $('.item-list').addClass('clicked')
  return shownItems
}


$('.show-btn').on('click', showItems)
