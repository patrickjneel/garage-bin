$(document).ready(() => {
  itemCount()
});


const showItems = async () => {
  const itemData = await fetch('/api/v1/items')
  const itemJson = await itemData.json()
  const items = itemJson
  $('.item-list').empty()
  $('.item-list').toggleClass('clicked')

  
  if ($('.item-list').hasClass('clicked')) {
  const shownItems = items.map(item => {
    console.log(item.id)
  $('.item-list').append(
    `<div class="item-cards" data-item-id=${item.id}>
      <h4 class="item-name">ITEM NAME: ${item.itemName}</h4>
      <div class="item-info">
        <span>REASON: ${item.itemReason}</span>
        <span>CLEANLINESS: ${item.itemCleanliness}</span>
        <select class="card-select">
          <option class="card-value" value="Change Cleanliness">Change Cleanliness</option>
          <option class="card-value" value="Sparkling">Sparkling</option>
          <option class="card-value" value="Dusty">Dusty</option>
          <option class="card-value" value="Rancid">Rancid</option>
        </select>
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

  const postItem = await fetch('/api/v1/items', {
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
  const itemData = await fetch('/api/v1/items')
  const itemJson = await itemData.json()
  const itemArray = await itemJson
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
        <select class="card-select">
          <option class="card-value" value="Change Cleanliness">Change Cleanliness</option>
          <option class="card-value" value="Sparkling">Sparkling</option>
          <option class="card-value" value="Dusty">Dusty</option>
          <option class="card-value" value="Rancid">Rancid</option>
        </select>
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
  const itemData = await fetch('/api/v1/items')
  const itemJson = await itemData.json()
  const itemArray = await itemJson
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
        <select class="card-select">
          <option class="card-value" value="Change Cleanliness">Change Cleanliness</option>
          <option class="card-value" value="Sparkling">Sparkling</option>
          <option class="card-value" value="Dusty">Dusty</option>
          <option class="card-value" value="Rancid">Rancid</option>
        </select>
      </div>
    </div>
      `)
    })
  } else {
   $('.item-list').empty()
  }
}

const displayItemInfo = (event) => {
  $(event.target).next().toggleClass('item-info')
}

const itemCount = async () => {
  const itemData = await fetch('/api/v1/items')
  const itemJson = await itemData.json()
  const items = itemJson
  const itemLength = items.length
  let sparkle = 0;
  let dusty = 0;
  let rancid = 0;

  items.forEach(item => {
    if(item.itemCleanliness === 'Sparkling') {
      sparkle += 1;
    } else if(item.itemCleanliness === 'Dusty') {
      dusty += 1;
    } else if(item.itemCleanliness === 'Rancid') {
      rancid += 1;
    }
    $('.sparkle-count').text(sparkle)
    $('.dusty-count').text(dusty)
    $('.rancid-count').text(rancid)
  })
  $('.item-count').append(`${itemLength}`)
}

const updateClean = async (event) => {
  const optionValue = $(event.target).val()

  const updateStatus = await fetch(`/api/v1/items/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ optionValue, id }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const updatePatch = await updateStatus.json()
    console.log(updatePatch)
  return updatePatch
}

$('.show-btn').on('click', showItems)
$('.add-item-btn').on('click', postItem)
$('.sort-btn').on('click', sortItems)
$('.sort-ZA-btn').on('click', sortZa)
$(document).on('click', '.item-name', displayItemInfo)
$(document).on('change', '.card-select', updateClean)
