
// LOADING SCREEN
  let pathE, pathK;
  function createLoadingScreen(){
      const outer_vert_space = (window.innerHeight - window.innerWidth) / 2;

      //path for E
      let P1 = `M0 ${window.innerHeight - outer_vert_space} `;
      let P2 = `C${window.innerWidth} ${window.innerHeight/2}, `;
      let P3 = `${window.innerWidth/2} ${outer_vert_space}, `;
      let P4 = `${window.innerWidth/2} ${window.innerHeight/2}`;
      pathE = P1 + P2 + P3 + P4;

      document.getElementById("loading_E_id").style.offsetPath=`path("${pathE}"`;
      document.getElementById("loading_E_id").style.width=`${window.innerWidth * 0.15}px`;
      document.getElementById("loading_E_id").style.height=`${window.innerWidth * 0.15}px`;

      //path for K
      P1 = `M${window.innerWidth} ${outer_vert_space} `;
      P2 = `C0 ${window.innerHeight/2}, `;
      P3 = `${window.innerWidth/2} ${window.innerHeight - outer_vert_space}, `;
      P4 = `${window.innerWidth/2} ${window.innerHeight/2}`;
      pathK= P1 + P2 + P3 + P4;

      document.getElementById("loading_K_id").style.offsetPath=`path("${pathK}"`;
      document.getElementById("loading_K_id").style.width=`${window.innerWidth * 0.15}px`;
      document.getElementById("loading_K_id").style.height=`${window.innerWidth * 0.15}px`;
  }


const translateArray = [];
function titlesFunc(titles) {

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
      case 'Pastas & Salads':
        title.textContent = 'Pastas y Ensaladas';
        break;
      case 'Pastas y Ensaladas':
        title.textContent = 'Pastas & Salads';
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
      case 'Salads': //for slices
        title.textContent = 'Ensaladas';
        break;
      case 'Ensaladas': //for slices
        title.textContent = 'Salads';
        break;
    }
  });
}


function updateLayout() {

  renderCart();

  const menu_item = document.getElementsByClassName('menu-item');

  let index = 0;
  
  if (isSpanish) {
    document.getElementsByClassName('caveat')[0].innerHTML = `Comida deliciosa y Dominicana,<br> de mi casa a la suya`;
    document.getElementById('nothing_in_cart').textContent = 'El carrito está vacío';
    document.getElementById('size_disclaimerTextId').innerHTML = 'Cada bandeja entera es suficiente para aproximadamente 35-38 personas';
    document.getElementById('ai_disclaimerTextId').innerHTML = `Para mayor transparencia: Este sitio utilizó imágenes con IA para las imágenes que se muestran en la página. Si desea ver algunas de las imágenes originales recortadas que se utilizan como referencia, haga clic <a href="original_images.html">aquí</a>`;
    document.getElementById('checkoutBtn').innerHTML = 'Finalizar';
    document.getElementById('add_message').textContent = 'Agregar mensaje...';
    document.getElementById('cancelMessageButtonId').textContent = 'Cancelar';
    document.getElementById('saveMessageButtonId').textContent = 'Guardar';
    document.getElementById('textareaId').setAttribute("placeholder", "Agregue detalles si necesario...");
    document.getElementById('save-qr-button').textContent = 'Guardar código QR';
    document.getElementById('qrTitleId').textContent = "Orden de Elsilia's Kitchen";
    document.getElementById('qrTextId').innerHTML= `Por favor copia el enlace del pedido abajo o guarda este código QR y envíaselo a <strong>Elsa</strong> para recibir la confirmación del pedido y programar una fecha`;
    document.getElementById('save-order-link-button').textContent = "Copiar Enlace";
    document.getElementById('copyNotificationId').textContent = "Enlace copiado!";
    

    if(savedMessage!= undefined)
      if(savedMessage.length > 20)
          document.getElementById('p_for_saved_message').innerHTML = `Nota:<br>${savedMessage.slice(0, 20)}...`;
      else
          document.getElementById('p_for_saved_message').innerHTML = `Nota:<br>${savedMessage}`;
              
    // document.getElementById('p_for_saved_message').innerHTML= `Nota:<br>${savedMessage}`;
    
    titlesFunc(document.querySelectorAll('h1'));
    titlesFunc(document.getElementById('pie_container').querySelectorAll('.pie_group'));  
    //^ I should create a seperate class for the pie text so it doesn't loop 
    // through the 5* empty slice.textContents but its fine for now.

    for (let item of menu_item) {
      item.querySelector('h3').innerHTML = translateArray[index + 1];
      item.querySelector('p').textContent = translateArray[index + 3];
      let buttons = item.querySelectorAll('button');
      if(buttons[1].innerHTML[0]=='D')
        buttons[1].innerHTML = 'DOCENA - $' + `${translateArray[index + 4]}`;
      else
        buttons[1].innerHTML = 'ENTERA - $' + `${translateArray[index + 4]}`;
      buttons[2].innerHTML = 'MEDIA - $' + `${translateArray[index + 5]}`;
      // buttons[2].innerHTML = 'AÑADIR AL CARRITO';

      index += 6;
    }
  }
  else { //english
    //TODO: I think the spanish portion could be replaced with some ::after property in the future...research later
    document.getElementsByClassName('caveat')[0].innerHTML = `Delicious Dominican food,<br> from our home to yours`;
    document.getElementById('nothing_in_cart').innerHTML = 'Cart is empty';
    document.getElementById('size_disclaimerTextId').innerHTML = 'Each whole pan is enough for approximately 35-38 people';
    document.getElementById('ai_disclaimerTextId').innerHTML = `For transparency: This site used AI imaging for the images seen on the page. If you'd like to see some of the cropped original images used as a reference, please click <a href="original_images.html">here</a>`;
    document.getElementById('checkoutBtn').innerHTML = 'Checkout';
    document.getElementById('add_message').textContent = 'Add message...';
    document.getElementById('cancelMessageButtonId').textContent = 'Cancel';
    document.getElementById('saveMessageButtonId').textContent = 'Save';
    document.getElementById('textareaId').setAttribute("placeholder", "Add food details if needed...");
    document.getElementById('save-qr-button').textContent = 'Save QR Code';
    document.getElementById('qrTitleId').textContent = "Elsilia's Kitchen Order";
    document.getElementById('qrTextId').innerHTML = `Please copy order link below or save this QR code and send it to <strong>Elsa</strong> to get order confirmation and set up an order date`;
    document.getElementById('save-order-link-button').textContent = "Copy Link";
    document.getElementById('copyNotificationId').textContent = "Link copied successfully!";

    if(savedMessage!= undefined)
      if(savedMessage.length > 20)
          document.getElementById('p_for_saved_message').innerHTML = `Note:<br>${savedMessage.slice(0, 20)}...`;
      else
          document.getElementById('p_for_saved_message').innerHTML = `Note:<br>${savedMessage}`;
      
    // document.getElementById('p_for_saved_message').innerHTML= `Note:<br>${savedMessage}`;
    
    titlesFunc(document.querySelectorAll('h1'));
    titlesFunc(document.getElementById('pie_container').querySelectorAll('.pie_group'));  


    for (let item of menu_item) {
      item.querySelector('h3').innerHTML = translateArray[index];
      item.querySelector('p').textContent = translateArray[index + 2];
      let buttons = item.querySelectorAll('button');
      if(buttons[1].innerHTML[0]=='D')
        buttons[1].innerHTML = 'DOZEN - $' + `${translateArray[index + 4]}`;
      else
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

      const plus = document.createElement('img');
      plus.className = 'plus';
      plus.setAttribute('src','plus.png');
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
      if(item.size)
        full_pan_button.innerHTML = 'DOZEN - $' + `${item.full_pan_cost}`;
      else
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
              
              document.getElementById('add_message').style.display = 'block';
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
              
              document.getElementById('add_message').style.display = 'block';
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
      makeMenu(data, "menu-pasta", "pastas_and_salads");
      makeMenu(data, "menu-viveres", "root_vegetables");
      makeMenu(data, "menu-picadera", "finger_food");
      makeMenu(data, "menu-pasteles", "pasteles");
      // updateLayout();
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    })

}


 function generatePdf() {
                const doc = new jspdf.jsPDF();

                const imgWidth = 80;  //desired width in PDF
                const imgHeight = 80; //desired height in PDF

                //page dimensions
                const pageWidth = doc.internal.pageSize.getWidth();
                const pageHeight = doc.internal.pageSize.getHeight();

                //center position
                const x = (pageWidth - imgWidth) / 2;
                const y = (pageHeight - imgHeight) / 2;

                
                //Browser with show (to devs) a 'deprecated feature used' warning for XMLHttpRequest when addImage is called.
                //I believe this happens due to a jspdf library call for loading the image file synchronously. It's fine- it all still works 

                //adds decorative images, sets date, logo, and QR code        
                doc.addImage("par.png", "PNG", pageWidth * 0.04, pageHeight * 0.02, 50, 75);
                doc.addImage("pep.png", "PNG", pageWidth * 0.7, pageHeight * 0.26, 40, 40);
                doc.addImage("onion.png", "PNG", pageWidth * 0.06, pageHeight * 0.46, 50, 50);
                doc.addImage("plan.png", "PNG", pageWidth * 0.503, pageHeight * 0.7, 100, 100);

                doc.setFontSize(16);
                doc.setFont("times", "normal");
                doc.text(document.getElementById('currentDateId').textContent, 5, 8);

                doc.addImage("logo_for_pdf.png", "PNG", pageWidth - 42, 0, 36, 26.7);
                doc.setFontSize(10);
                doc.setTextColor(0, 0, 0);
                doc.text("ELSILIA'S KITCHEN", pageWidth - 23.5, 26, { align: "center" });

                let canvas = document.getElementById('qrcode').querySelector("canvas");

                // Create an <img> element with it
                let qr_img = new Image();
                qr_img.src = canvas.toDataURL("image/png");

                doc.addImage(qr_img, "PNG", x, y-20, imgWidth, imgHeight);

                doc.setFillColor(0,0,0); //black
                doc.setFillColor(255, 255, 255); //white
                // doc.setFillColor(210, 90, 33); //orange
               
                const radius = 12;

                doc.circle(pageWidth / 2 - 0.1, pageHeight /2 - 20.3, radius, 'F'); // 'F' = fill only

                doc.addImage("logo_for_pdf.png", 'PNG', pageWidth / 2 - 11.5, pageHeight / 2 - 27.5, 22.5, 15);
          
                doc.setFont("times", "bold");
                doc.setFontSize(36);

                if (isSpanish) {
                    //SPANISH              
                    doc.text("Orden de Elsilia's Kitchen", pageWidth / 2, y - 40, { align: "center" });

                    if(savedMessage == undefined){
                        doc.setFontSize(24);
                        doc.text("¡Gracias por elegirnos!", pageWidth / 2, y + imgHeight + 10, { align: "center" });
                    }
                    else{
                        doc.setFontSize(12);
                        doc.setFont("times", "italic");
                        const wrappedText = doc.splitTextToSize(savedMessage, pageWidth - 100);
                        doc.text("Nota:", pageWidth / 2, y + imgHeight - 4, { align: "center" });
                        doc.text(wrappedText, pageWidth / 2, y + imgHeight + 4, { align: "center" });
                    }

                    doc.setFontSize(16);
                    doc.setFont("times", "normal");

                    doc.text("Por favor guarde y envíe esta página a Elsa para obtener", pageWidth / 2, y + imgHeight + 34, { align: "center" });
                    doc.text("la confirmación de su pedido y establecer una fecha de pedido.", pageWidth / 2, y + imgHeight + 40, { align: "center" });

                    doc.setFont("times", "bolditalic");
                    doc.text("Esta página por sí sola no con", (pageWidth / 2) - 26, y + imgHeight + 70, { align: "center" });

                    doc.setTextColor(255, 255, 255);
                    doc.text("firma ningún pedido.", (pageWidth / 2) + 34, y + imgHeight + 70, { align: "center" });

                    doc.save("Orden de Elsilia Kitchen - " + document.getElementById('currentDateId').textContent + ".pdf");
                }
                else{
                    //ENGLISH
                    doc.text("Elsilia's Kitchen Order", pageWidth / 2, y - 40, { align: "center" });

                    if(savedMessage == undefined){
                        doc.setFontSize(24);
                        doc.text("Thank you for choosing us!", pageWidth / 2, y + imgHeight + 10, { align: "center" });
                    }
                    else{
                        doc.setFontSize(12);
                        doc.setFont("times", "italic");
                        const wrappedText = doc.splitTextToSize(savedMessage, pageWidth - 100);
                        doc.text("Note:", pageWidth / 2, y + imgHeight - 4, { align: "center" });
                        doc.text(wrappedText, pageWidth / 2, y + imgHeight + 4, { align: "center" });
                    }

                    doc.setFontSize(16);
                    doc.setFont("times", "normal");

                    doc.text("Please save and send this page to Elsa to get", pageWidth / 2, y + imgHeight + 34, { align: "center" });
                    doc.text("confirmation on your order and set up an order date.", pageWidth / 2, y + imgHeight + 40, { align: "center" });

                    doc.setFont("times", "bolditalic");
                    doc.text("This page alone is not a confi", (pageWidth / 2) - 25, y + imgHeight + 70, { align: "center" });

                    doc.setTextColor(255, 255, 255);
                    doc.text("rmation of any order.", (pageWidth / 2) + 34.5, y + imgHeight + 70, { align: "center" });

                    doc.save("Elsilia Kitchen Order - " + document.getElementById('currentDateId').textContent + ".pdf");
                }

            }

