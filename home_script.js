

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
    // menuContainer.innerHTML = ''; // Clear existing content
    let count = 0;

    menuItems.forEach(item => {

        count++;

        if(item.type == type){ // Filter for Mains only

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

        checkboxdiv.appendChild(minusSpan);
        checkboxdiv.appendChild(input);
        checkboxdiv.appendChild(plusSpan);

        //click event listeners
        plusSpan.addEventListener('click', () => {
            input.value = (parseInt(input.value) === 3) ? 3 : parseInt(input.value) + 1;
        });

        minusSpan.addEventListener('click', () => {
            input.value = (parseInt(input.value) === 0) ? 0 : parseInt(input.value) - 1;
        });


        menuItem.appendChild(img);
        content.appendChild(checkboxdiv);
        menuItem.appendChild(content);
        menuContainer.appendChild(menuItem);
        }
    });

}