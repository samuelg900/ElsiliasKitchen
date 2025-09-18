
  const yoloArray = [];

  function titlesFunc(){
let titles = document.querySelectorAll('h1');

titles.forEach(title => {
    switch(title.textContent){
      case 'Rice':
        title.textContent = 'Arroz';
        break;
      case 'Arroz':
        title.textContent = 'Rice';
        break;
      case 'Meat':
        title.textContent = 'Carne';
        break;
      case 'Carne':
        title.textContent = 'Meat';
        break;
      case 'Pasta':
        title.textContent = 'Pasta';
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


function updateLayout(){

  renderCart();

  const menu_item = document.getElementsByClassName('menu-item');

 let index = 0;
  if(document.getElementById('ball_id').classList.contains('changeToSpanish')){

     document.getElementsByClassName('caveat')[0].textContent = 'Comida deliciosa y Dominicana de mi casa a la suya';
    document.getElementById('nothing_in_cart').textContent = 'El carrito está vacío';
    document.getElementById('disclaimerTextId').innerHTML = 'Cada bandeja entera es suficiente para aproximadamente 35-38 personas';


titlesFunc();

    
    for (let item of menu_item) {
      
      item.querySelector('h3').innerHTML = yoloArray[index+1];
      item.querySelector('p').textContent = yoloArray[index+3];
      let buttons = item.querySelectorAll('button');
      buttons[0].innerHTML = 'ENTERA - $' +`${yoloArray[index+4]}`;
      buttons[1].innerHTML = 'MEDIA - $' +`${yoloArray[index+5]}`;
      buttons[2].innerHTML = 'AÑADIR AL CARRITO';

      index+=6;
    }
  }
  else{ //english
     document.getElementsByClassName('caveat')[0].textContent = 'Delicious Dominican food, from our home to yours';
    document.getElementById('nothing_in_cart').innerHTML = 'Cart is empty';
    document.getElementById('disclaimerTextId').innerHTML = 'Each whole pan is enough for approximately 35-38 people';

    
   titlesFunc();

      for (let item of menu_item) {
        item.querySelector('h3').innerHTML = yoloArray[index];
        item.querySelector('p').textContent = yoloArray[index+2];
        let buttons = item.querySelectorAll('button');
        buttons[0].innerHTML = 'WHOLE - $' +`${yoloArray[index+4]}`;
        buttons[1].innerHTML = 'HALF - $' +`${yoloArray[index+5]}`;
        buttons[2].innerHTML = 'ADD TO CART';

      index+=6;
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
            img.src = item.image_link;
            img.alt = item.name_english;
            img.addEventListener('click', () => openImageViewer(item.image_link));

            const content = document.createElement('div');
            content.className = 'menu-item-content en';
            content.innerHTML = `<h3>${item.name_english} <a>(${item.name_spanish})</a> </h3><p>${item.description_english}</p> `;

            let enName = item.name_english;
            let spName = item.name_spanish;
            let enDesc = item.description_english;
            let spDesc = item.description_spanish;
            let fPan = item.full_pan_cost;
            let hPan = item.half_pan_cost;

            yoloArray.push(enName, spName, enDesc, spDesc, fPan, hPan);

            const pan_button_div = document.createElement('div');
            pan_button_div.className="pan_button_div";

           const full_pan_button = document.createElement('button');
           full_pan_button.className = 'portionButton';
           full_pan_button.classList.add('active');
           full_pan_button.innerHTML = 'WHOLE - $' +`${item.full_pan_cost}`;

           
           const half_pan_button = document.createElement('button');
           half_pan_button.className = 'portionButton';
           half_pan_button.innerHTML = 'HALF - $' +`${item.half_pan_cost}`;
           
           const add_to_cart_button = document.createElement('button');
           add_to_cart_button.className = 'addtocartButton';
           add_to_cart_button.innerHTML = 'ADD TO CART';

            full_pan_button.addEventListener('click', () => {
              if(half_pan_button.classList.contains('active')){
                half_pan_button.classList.remove('active');
                full_pan_button.classList.add('active');
              }

               if(cart.find(i => i.id === item.id) === undefined && add_to_cart_button.classList.contains('disableAddToCart')){
                    add_to_cart_button.classList.remove('disableAddToCart')
               }
               else if(cart.find(i => i.id === item.id) && add_to_cart_button.classList.contains('disableAddToCart') == false){
                    add_to_cart_button.classList.add('disableAddToCart')
               }

            });

             half_pan_button.addEventListener('click', () => {
              if(full_pan_button.classList.contains('active')){
                full_pan_button.classList.remove('active');
                half_pan_button.classList.add('active');
              }


                if(cart.find(i => i.id === (item.id + 10000)) === undefined && add_to_cart_button.classList.contains('disableAddToCart')){  
  
                  add_to_cart_button.classList.remove('disableAddToCart')
               }
               else if(cart.find(i => i.id === (item.id + 10000)) && add_to_cart_button.classList.contains('disableAddToCart') == false){
                    add_to_cart_button.classList.add('disableAddToCart')
               }
                
            });


           pan_button_div.appendChild(full_pan_button);
           pan_button_div.appendChild(half_pan_button);

           content.appendChild(pan_button_div);
           content.appendChild(add_to_cart_button);
             
           // --------------


           add_to_cart_button.addEventListener('click', ()=>{


                if(full_pan_button.classList.contains('active')){


                  if(add_to_cart_button.classList.contains('disableAddToCart') == false){

                    if(addToCart(item.id, item.name_english, item.name_spanish, item.image_link, 1, item.full_pan_cost, add_to_cart_button, full_pan_button, half_pan_button) == true){

                      add_to_cart_button.classList.add('disableAddToCart');
                      if(document.getElementById("cart_contents_id").style.display==='block'){
                        
                          document.getElementById('nothing_in_cart').style.display = 'none'; 
                          document.getElementById('cartItemsId').style.display = 'block';

                      }
                    }
                  }

                  else
                    return;

                }
                else if(half_pan_button.classList.contains('active')){

                

                  if(add_to_cart_button.classList.contains('disableAddToCart') == false){
              

                    if(addToCart(item.id, item.name_english, item.name_spanish, item.image_link, 2, item.half_pan_cost, add_to_cart_button, full_pan_button, half_pan_button) == true){
                
                      add_to_cart_button.classList.add('disableAddToCart');
                       if(document.getElementById("cart_contents_id").style.display==='block'){
                        
                          document.getElementById('nothing_in_cart').style.display = 'none'; 
                          document.getElementById('cartItemsId').style.display = 'block';

                      }
                    }
                  }
                  else
                    return;

                }
                else{
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