$(document).ready(function () {
  loadCards();
});

//search
$('#searchForm').on('submit', function (e) {
  e.preventDefault();
  const searchData = $("#searchCard").val()
  console.log(searchData)
  if (searchData === 'monster' || searchData === 'magic' || searchData === 'trap') {
    $.get('/cards/type/' + searchData, (data) => {
      $('#cardContainer').empty();
      console.log(data)
      loadCards(data)
    })
  } else {
    $.get('/cards/' + searchData, (data) => {
      $('#cardContainer').empty();
      loadCards([data])
    })
  }
})

function loadCards(cards) {
  if (!cards) {
    $.get('/cards', function (data) {
      cards = data;
      renderCards(cards);
    });
  } else {
    renderCards(cards);
  }
}

function renderCards(cards) {
  $('#cardContainer').empty();

  cards.forEach(function (card) {
    const liCards = $('<li>');
    const cardDesign = `
  <div class="cardDesign">
    <p class="title">${card.name}</p>
    <p class="type">${card.type}</p>
    <p class="cardDescription">${card.description}</p>
    <div class="attack-defense">
      <p>${card.attack_points}</p>
      <p>${card.defense_points}</p>
    </div>
  </div>`;
    const cardInfo = $('<div>').addClass('card').html(cardDesign);
    const deleteButton = $('<button>').text('Delete').addClass('btn').on('click', () => deleteCard(card._id));
    const editButton = $('<button>').text('Edit').addClass('btn').on('click', () => editCard(card));
    const btnDiv = $('<div>').addClass('btnDiv').append(deleteButton, editButton)
    liCards.append(cardInfo, btnDiv);
    $('#cardContainer').append(liCards);
  });
}


function editCard(card) {
  const editForm = $('<form>').attr('id', 'editForm');

  for (const property in card) {
    if (property !== '__v' && property !== '_id') {
      if (property === 'description') {
        const textarea = $('<textarea>').val(card[property]).attr({ name: property }).appendTo(editForm);

      } else if (property === 'type') {
        const select = $('<select>').attr({ name: property })
        const types = ['monster', 'magic', 'trap'];
        types.forEach((type) => {
          const options = $('<option>').attr({ value: type }).html(type)
          select.append(options)
        })
        select.appendTo(editForm);

      } else {
        $('<input>').attr({
          name: property,
          type: 'text',
          value: card[property]
        }).appendTo(editForm);
      }
    }
  }

  editForm.on('submit', function (e) {
    e.preventDefault();
    const data = $(this).serializeArray();
    const formDataObject = data.reduce((acc, current) => {
      acc[current.name] = current.value;
      return acc;
    }, {});
    updateCard(formDataObject, card._id);
  });
  const updateButton = $('<button>').attr('type', 'submit').text('Update').addClass('btn');
  editForm.append(updateButton);
  $('#editContainer').empty().append(editForm);
}

//post data
$('#cardForm').on('submit', function (e) {
  e.preventDefault()
  const data = $("#cardForm").serializeArray();

  const formDataObject = data.reduce((acc, current) => {
    acc[current.name] = current.value;
    return acc;
  }, {});

  $.post('/cards', formDataObject, () => {
    $('#cardForm')[0].reset()
    loadCards()
  })
})

//update
function updateCard(card, card_id) {
  $.ajax({
    url: '/cards/' + card_id,
    type: 'PUT',
    data: card,
    success: function () {
      loadCards();
    }
  });
}

// delete 
function deleteCard(id) {
  $.ajax({
    url: '/cards/' + id,
    type: 'DELETE',
    success: function () {
      loadCards();
    }
  });
}
