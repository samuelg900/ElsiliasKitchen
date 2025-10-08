
const translateArray = [];

function titlesFunc() {
  let titles = document.querySelectorAll('h1');

  titles.forEach(title => {
    switch (title.textContent) {
      case 'Rice':
        title.textContent = 'Arroz';
        break;
      case 'Arroz':
        title.textContent = 'Rice';
        break;
      case 'Meats':
        title.textContent = 'Carnes';
        break;
      case 'Carnes':
        title.textContent = 'Meats';
        break;
      case 'Pastas':
        title.textContent = 'Pastas';
        break;
      case 'Roots':
        title.textContent = 'Viveres';
        break;
      case 'Viveres':
        title.textContent = 'Roots';
        break;
      case 'Finger Food':
        title.textContent = 'Picadera';
        break;
      case 'Picadera':
        title.textContent = 'Finger Food';
        break;
    }
  });
}


function updateLayout() {

  renderCart();

  const menu_item = document.getElementsByClassName('menu-item');

  let index = 0;
  if (document.getElementById('ball_id').classList.contains('changeToSpanish')) {
    document.getElementsByClassName('caveat')[0].textContent = 'Comida deliciosa y Dominicana de mi casa a la suya';
    document.getElementById('nothing_in_cart').textContent = 'El carrito está vacío';
    document.getElementById('disclaimerTextId').innerHTML = 'Cada bandeja entera es suficiente para aproximadamente 35-38 personas';
    document.getElementById('checkoutBtn').innerHTML = 'Finalizar';

    titlesFunc();


    for (let item of menu_item) {
      item.querySelector('h3').innerHTML = translateArray[index + 1];
      item.querySelector('p').textContent = translateArray[index + 3];
      let buttons = item.querySelectorAll('button');
      buttons[1].innerHTML = 'ENTERA - $' + `${translateArray[index + 4]}`;
      buttons[2].innerHTML = 'MEDIA - $' + `${translateArray[index + 5]}`;
      // buttons[2].innerHTML = 'AÑADIR AL CARRITO';

      index += 6;
    }
  }
  else { //english
    document.getElementsByClassName('caveat')[0].textContent = 'Delicious Dominican food, from our home to yours';
    document.getElementById('nothing_in_cart').innerHTML = 'Cart is empty';
    document.getElementById('disclaimerTextId').innerHTML = 'Each whole pan is enough for approximately 35-38 people';
    document.getElementById('checkoutBtn').innerHTML = 'Checkout';


    titlesFunc();

    for (let item of menu_item) {
      item.querySelector('h3').innerHTML = translateArray[index];
      item.querySelector('p').textContent = translateArray[index + 2];
      let buttons = item.querySelectorAll('button');
      buttons[1].innerHTML = 'WHOLE - $' + `${translateArray[index + 4]}`;
      buttons[2].innerHTML = 'HALF - $' + `${translateArray[index + 5]}`;
      // buttons[2].innerHTML = 'ADD TO CART';

      index += 6;
    }
  }

}


// not the most efficient algorithm but it's fine for this small list of items
function makeMenu(menuItems, menuContainerId, type) {
  const menuContainer = document.getElementById(menuContainerId);
  let count = 0;

  const frag = document.createDocumentFragment();

  menuItems.forEach(item => {

    count++;

    if (item.type_of_food == type) { // Filter for specific item type

      const menuItem = document.createElement('div');
      menuItem.className = 'menu-item';

      const img = document.createElement('img');
      img.className = 'item_image';
      img.src = item.image_link;
      img.alt = item.name_english;
      img.addEventListener('click', () => openImageViewer(item.image_link));

      const content = document.createElement('div');
      content.className = 'menu-item-content';
      content.innerHTML = `<h3>${item.name_english} </h3><p>${item.description_english}</p> `;

      const circleButton = document.createElement('button');
      circleButton.className = 'cirButton';
      // circleButton.innerHTML='&#xFF0B';


      const plus = document.createElement('img');
      plus.className = 'plus';
      plus.setAttribute('src','plus.png');
      // plus.setAttribute("width", "40px");
      // plus.setAttribute("height", "40px");
      circleButton.appendChild(plus);
      
      let enName = item.name_english;
      let spName = item.name_spanish;
      let enDesc = item.description_english;
      let spDesc = item.description_spanish;
      let fPan = item.full_pan_cost;
      let hPan = item.half_pan_cost;

      translateArray.push(enName, spName, enDesc, spDesc, fPan, hPan);

      const pan_button_div = document.createElement('div');
      pan_button_div.className = "pan_button_div";

      const full_pan_button = document.createElement('button');
      full_pan_button.className = 'portionButton';
      full_pan_button.classList.add('active');
      full_pan_button.innerHTML = 'WHOLE - $' + `${item.full_pan_cost}`;

      const half_pan_button = document.createElement('button');
      half_pan_button.className = 'portionButton';
      half_pan_button.innerHTML = 'HALF - $' + `${item.half_pan_cost}`;

      full_pan_button.addEventListener('click', () => {
        if (half_pan_button.classList.contains('active')) {
          half_pan_button.classList.remove('active');
          full_pan_button.classList.add('active');
        }

        if (cart.find(i => i.id === item.id) === undefined && circleButton.classList.contains('itemWasAdded')) {
              circleButton.classList.toggle('itemWasAdded');
          
        }
        else if (cart.find(i => i.id === item.id) && circleButton.classList.contains('itemWasAdded') == false) {
              circleButton.classList.toggle('itemWasAdded');
        }

      });

      half_pan_button.addEventListener('click', () => {
        if (full_pan_button.classList.contains('active')) {
          full_pan_button.classList.remove('active');
          half_pan_button.classList.add('active');
        }


        if (cart.find(i => i.id === (item.id + 10000)) === undefined && circleButton.classList.contains('itemWasAdded')) {
              circleButton.classList.toggle('itemWasAdded');
        }
        else if (cart.find(i => i.id === (item.id + 10000)) && circleButton.classList.contains('itemWasAdded') == false) {
              circleButton.classList.toggle('itemWasAdded');
        }

      });

      pan_button_div.appendChild(full_pan_button);
      pan_button_div.appendChild(half_pan_button);

      content.appendChild(circleButton);
      content.appendChild(pan_button_div);


      // --------------
circleButton.addEventListener('click', () => {

        if (full_pan_button.classList.contains('active')) {

          if (circleButton.classList.contains('itemWasAdded') === false) {

            if (addToCart(item.id, item.name_english, item.name_spanish, item.image_link, 1, item.full_pan_cost, circleButton, full_pan_button, half_pan_button) === true) {
              circleButton.classList.toggle('itemWasAdded');

              //Needed?
              document.getElementById('nothing_in_cart').style.display = 'none';
              document.getElementById('cartItemsId').style.display = 'block';
            }
          }
          else{ //remove item from cart
            
             (clearFromCart(item.id)==true);         
          }   

        }
        else if (half_pan_button.classList.contains('active')) {

          if (circleButton.classList.contains('itemWasAdded') === false) {

            if (addToCart(item.id, item.name_english, item.name_spanish, item.image_link, 2, item.half_pan_cost, circleButton, full_pan_button, half_pan_button) === true) {
              circleButton.classList.toggle('itemWasAdded');
              document.getElementById('nothing_in_cart').style.display = 'none';
              document.getElementById('cartItemsId').style.display = 'block';
            }
          }
          else{ //remove item from cart
            // console.log(item.id + 10000);
             (clearFromCart(item.id + 10000)==true);
          }   

        }
        else {
          console.log("Error - no active class for pans for some reason");
          return;
        }

        document.getElementById('cart_num_id').style.display = 'block';
        document.getElementById('cart_num_id').innerHTML = cart.length;
        renderCart(); //maybe do on cart open

});

      menuItem.appendChild(img);
      menuItem.appendChild(content);
      frag.appendChild(menuItem);

    }
  });

  menuContainer.appendChild(frag);
}


function getJsonData() {
  fetch('items.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      makeMenu(data, "menu-arroz", "rice");
      makeMenu(data, "menu-carne", "meat");
      makeMenu(data, "menu-pasta", "pasta");
      makeMenu(data, "menu-viveres", "root_vegetables");
      makeMenu(data, "menu-picadera", "finger_food");
      // updateLayout();
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    })

}
