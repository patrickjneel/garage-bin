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
      <h4 class="item-name">ITEM NAME: ${item.itemName}</h4>
      <div class="item-info">
        <span>REASON: ${item.itemReason}</span>
        <span>CLEANLINESS: ${item.itemCleanliness}</span>
      </div>
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
  const itemCleanliness = $('select').children(':selected').val()

  const postItem = await fetch('/api/v1/all_items', {
    method: 'POST',
    body: JSON.stringify({itemName, itemReason, itemCleanliness}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const itemData = await postItem.json()
  return itemData
  $('#item-name').val('')
  $('#item-reason').val('')
  $('option').val('Cleanliness')
}

const sortItems = async () => {
  $('.item-list').empty()
  $('.item-list').toggleClass('clicked')
  const itemData = await fetch('/api/v1/all_items')
  const itemJson = await itemData.json()
  const itemArray = await itemJson.items
  const sortArray = itemArray.sort((a,b) => {
    const nameA = a.itemName.toUpperCase();
    const nameB = b.itemName.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  
  return 0;
  })
  if ($('.item-list').hasClass('clicked')) {
  sortArray.map(sortItems => {
    $('.item-list').append(
    `<div class="item-cards">
      <h4 class="item-name">ITEM NAME: ${sortItems.itemName}</h4>
      <div class="item-info">
        <span>REASON: ${sortItems.itemReason}</span>
        <span>CLEANLINESS: ${sortItems.itemCleanliness}</span>
      </div>
    </div>
    `)
    })
  } else {
   $('.item-list').empty()
  }
}

const sortZa = async () => {
  $('.item-list').empty()
  $('.item-list').toggleClass('clicked')
  const itemData = await fetch('/api/v1/all_items')
  const itemJson = await itemData.json()
  const itemArray = await itemJson.items
  const sortArray = itemArray.sort((a,b) => {
    const nameA = a.itemName.toUpperCase();
    const nameB = b.itemName.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  
  return 0;
  })
  if ($('.item-list').hasClass('clicked')) {
  sortArray.map(sortItems => {
    $('.item-list').prepend(
    `<div class="item-cards">
      <h4 class="item-name">ITEM NAME: ${sortItems.itemName}</h4>
      <div class="item-info">
        <span>REASON: ${sortItems.itemReason}</span>
        <span>CLEANLINESS: ${sortItems.itemCleanliness}</span>
      </div>
    </div>
      `)
    })
  } else {
   $('.item-list').empty()
  }
}

const displayItemInfo = () => {
  $('.item-info').toggleClass('item-info')
}

$('.show-btn').on('click', showItems)
$('.add-item-btn').on('click', postItem)
$('.sort-btn').on('click', sortItems)
$('.sort-ZA-btn').on('click', sortZa)
$(document).on('click', '.item-name', displayItemInfo)

