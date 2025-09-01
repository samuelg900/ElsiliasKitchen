

// function closeImageViewer() {
//     const imageViewer = document.getElementById('image_viewer_window');
//     imageViewer.style.display = 'none';
// }

// function openImageViewer(imageSrc) {
//     document.querySelector('.image_viewer').src = imageSrc;
//     document.getElementById('image_viewer_window').style.display = 'block';

// }

// window.addEventListener('keydown', function (event) {

//     // Example: Close modal with Escape key
//     if (event.key === 'Escape') {
//         if (document.getElementById('image_viewer_window').style.display === 'block') {
//             document.getElementById('image_viewer_window').style.display = 'none';
//         }
//     }
// });

function makeMenu(menuItems, menuContainerId, type) {
    const menuContainer = document.getElementById(menuContainerId);
    // menuContainer.className = "tempContainer";
    // menuContainer.innerHTML = ''; // Clear existing content
    let count = 0;

    
    
  const frag = document.createDocumentFragment();

    menuItems.forEach(item => {

        count++;

        if (item.type == type) { // Filter for Mains only

            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';

            const img = document.createElement('img');
            img.src = item.img;
            img.alt = item.name;
            img.addEventListener('click', () => openImageViewer(item.img));

            const content = document.createElement('div');
            content.className = 'menu-item-content';
            content.innerHTML = `<h3>${item.name}</h3><p>${item.desc}</p>`;

            const checkboxdiv = document.createElement('div');
            checkboxdiv.className = 'checkboxDiv';
            checkboxdiv.id = `number${count}`;

            //minus button
            const minusSpan = document.createElement('span');
            minusSpan.className = 'checkboxMinus';
            minusSpan.textContent = '-';

            //input
            const input = document.createElement('input');
            input.className = 'checkboxInput';
            input.type = 'text';
            input.value = 0;
            input.readOnly = true;

            //plus button
            const plusSpan = document.createElement('span');
            plusSpan.className = 'checkboxPlus';
            plusSpan.textContent = '+';

            const clear_text = document.createElement('p');
            clear_text.className = 'clearButton';
            clear_text.innerHTML = 'clear';
            clear_text.style.display='none';

            checkboxdiv.appendChild(minusSpan);
            checkboxdiv.appendChild(input);
            checkboxdiv.appendChild(plusSpan);
            checkboxdiv.appendChild(clear_text);

            clear_text.addEventListener('click', () => {
                clear_text.style.display='none';
                numOfOrders -= input.value;
                input.value = 0;
                let cartNum = document.getElementById('cart_num_id');
                 if(cartNum.classList.contains("active") && numOfOrders == 0){
                    cartNum.classList.remove("active");
                  }
                  cartNum.innerHTML = numOfOrders;
            });


            //click event listeners
            plusSpan.addEventListener('click', () => {
                // input.value = (parseInt(input.value) === 3) ? 3 : parseInt(input.value) + 1;
                if(parseInt(input.value) === 3){
                  input.value = 3;
                }else{
                  input.value =parseInt(input.value) + 1;
                  numOfOrders += 1;
                   //add active class
                  let cartNum = document.getElementById('cart_num_id');
                  if(!cartNum.classList.contains("active")){
                    cartNum.classList.add("active");
                  }
                    cartNum.innerHTML= numOfOrders;
                 
                }

                  if(parseInt(input.value) !== 0)
                    clear_text.style.display='block';
                  else
                    clear_text.style.display='none';
            });

            minusSpan.addEventListener('click', () => {
                // input.value = (parseInt(input.value) === 0) ? 0 : parseInt(input.value) - 1;
                 if(parseInt(input.value) === 0){
                  input.value = 0;
                }else{
                  input.value = parseInt(input.value) - 1;
                  numOfOrders -= 1;
                  //remove? active class
                    let cartNum = document.getElementById('cart_num_id');
                  if(numOfOrders == 0 && cartNum.classList.contains("active")){
                    cartNum.classList.remove("active");
                  }
                    cartNum.innerHTML= numOfOrders;
                }

                if(parseInt(input.value) !== 0)
                    clear_text.style.display='block';
                  else
                    clear_text.style.display='none';
            });

            menuItem.appendChild(img);
            content.appendChild(checkboxdiv);
            menuItem.appendChild(content);
            frag.appendChild(menuItem);
        }
    });

    menuContainer.appendChild(frag);
}