
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
            content.className = 'menu-item-content';
            content.innerHTML = `<h3>${item.name_english} <a>(${item.name_spanish})</a> </h3><p>${item.description_english}</p> `;

            const pan_button_div = document.createElement('div');
            pan_button_div.className="pan_button_div";

           const full_pan_button = document.createElement('button');
           full_pan_button.className = 'portionButton';
           full_pan_button.classList.add('active');
           full_pan_button.innerHTML = 'FULL PAN - $' +`${item.full_pan_cost}`;

           
           const half_pan_button = document.createElement('button');
           half_pan_button.className = 'portionButton';
           half_pan_button.innerHTML = 'HALF PAN - $' +`${item.half_pan_cost}`;
           
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

          // //  pan_button_div.appendChild(checkboxdiv);
          //  pan_button_div.appendChild(checkboxdiv);
           
           
           content.appendChild(pan_button_div);
           content.appendChild(add_to_cart_button);
             
           // --------------


           add_to_cart_button.addEventListener('click', ()=>{


                if(full_pan_button.classList.contains('active')){

            

                  if(add_to_cart_button.classList.contains('disableAddToCart') == false){

                    if(addToCart(item.id, item.name_english, item.image_link, 1, item.full_pan_cost, add_to_cart_button, full_pan_button, half_pan_button) == true){
                      
                

                      add_to_cart_button.classList.add('disableAddToCart');
                    }
                  }

                  else
                    return;

                }
                else if(half_pan_button.classList.contains('active')){

                

                  if(add_to_cart_button.classList.contains('disableAddToCart') == false){
              

                    if(addToCart(item.id, item.name_english, item.image_link, 2, item.half_pan_cost, add_to_cart_button, full_pan_button, half_pan_button) == true){
                
                      add_to_cart_button.classList.add('disableAddToCart');
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
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        })

}