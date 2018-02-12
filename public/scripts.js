const showItems = async () => {
  const itemData = await fetch('/api/v1/all_items')
  const itemJson = await itemData.json()
  const items = itemJson.items
  $('.item-list').empty()
  $('.item-list').toggleClass('clicked')

  if ($('.item-list').hasClass('clicked')) {
  const shownItems = items.map(item => {
  $('.item-list').append(
    `<div class="item-cards">
      <h4>ITEM NAME: ${item.itemName}</h4>
      <span>REASON: ${item.itemReason}</span>
      <span>CLEANLINESS: ${item.itemCleanliness}</span>
    </div>
    `)
  }) 
      
  } else {
   $('.item-list').empty()
  }
}

const postItem = async () => {
  const itemName = $('#item-name').val()
  const itemReason = $('#item-reason').val()
  const itemCleanliness = $('select').closest('option').val()
  console.log(itemCleanliness)

  // const postItem = await fetch('/api/v1/all_items', {
  //   method: 'POST',
  //   body: JSON.stringify({itemName, itemReason, itemCleanliness}),
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // })
  // const itemData = await postItem.json()

  // return itemData
  $('#item-name').val('')
  $('#item-reason').val('')
}


$('.show-btn').on('click', showItems)
$('.add-item-btn').on('click', postItem)
