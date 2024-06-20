document.addEventListener('DOMContentLoaded', function () {
    
    const slider = document.getElementById('slider'); 
    const tooltip = document.getElementById('tooltip'); 
    const applyButton = document.getElementById('apply-button');
    const resetButton = document.getElementById('reset-button'); 
    const itemList = document.getElementById('item-list'); 
    const itemNameInput = document.getElementById('item-name');

    
    slider.addEventListener('input', function () {
        const value = slider.value; 
        tooltip.textContent = value;
        const percentage = (value - slider.min) / (slider.max - slider.min) * 100; 
        tooltip.style.left = `calc(${percentage}% - ${tooltip.clientWidth / 2}px)`; 
    });


    applyButton.addEventListener('click', function () {
        const itemValue = slider.value; 
        const itemName = itemNameInput.value.trim(); 

        if (itemName === "") { 
            alert("Lütfen bir ürün adı giriniz.");
            return; 
        }

        const listItem = document.createElement('li'); 
        listItem.textContent = `${itemName} - ₺${itemValue}`; 
        itemList.appendChild(listItem); 
        saveItemToLocalStorage(`${itemName} - ₺${itemValue}`); 
        itemNameInput.value = ''; 
    });

   
    resetButton.addEventListener('click', function () {
        itemList.innerHTML = ''; 
        localStorage.removeItem('items'); 
    });

 
    const event = new Event('input'); 
    slider.dispatchEvent(event); 


    loadItemsFromLocalStorage();


    function saveItemToLocalStorage(item) {
        let items = JSON.parse(localStorage.getItem('items')) || []; 
        items.push(item); 
        localStorage.setItem('items', JSON.stringify(items)); 
    }

 
    function loadItemsFromLocalStorage() {
        let items = JSON.parse(localStorage.getItem('items')) || []; 
        items.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item; 
            itemList.appendChild(listItem); 
        });
    }
});
