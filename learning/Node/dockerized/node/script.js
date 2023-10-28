// Get item list and item detail elements
const itemList = document.getElementById('item-list');
const itemImage = document.getElementById('item-image');
const itemDetail = document.getElementById('item-detail');

// Attach click event listeners to each item link
const itemLinks = itemList.querySelectorAll('a');
itemLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const itemName = this.getAttribute('href').split('=')[1];
        loadItemDetail(itemName);
    });
});

// Function to load item detail
function loadItemDetail(itemName) {
    // Update item image and detail
    const imageUrl = `https://via.placeholder.com/200x200?text=${itemName}`;
    itemImage.src = imageUrl;
    itemDetail.textContent = `This is the detail content for ${itemName}.`;
}
