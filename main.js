function AddtoScreen(event) {
    event.preventDefault();
    let price = event.target.amount.value;
    let productname = event.target.productname.value;
    const obj = {
        price: price,
        productname: productname
    }

    axios.post("https://crudcrud.com/api/026c8a5ea7f24883b14e7f8238f08cac/ProductData", obj)
        .then((response) => {
            showUserOnScreen(response.data)
            console.log(response)
        })
        .catch((err) => {
            console.log(err)
        })
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/026c8a5ea7f24883b14e7f8238f08cac/ProductData")
        .then((response) => {
            console.log(response)

            for (var i = 0; i < response.data.length; i++) {
                showUserOnScreen(response.data[i])

            }

        })
        .catch((err) => {
            console.log(err)
        })

})
function showUserOnScreen(user) {

    document.getElementById('amount').value = user.price;
    document.getElementById('productname').value = user.productname;



    const parentNode = document.getElementById('users');

    const childHTML = `<li class= "li" id=${user._id}>  ${user.productname} - ${user.price} 
                 <button onclick=deleteUser('${user._id}','${user.price}')> Delete Product </button>
                 </li>`
    parentNode.innerHTML = parentNode.innerHTML + childHTML


    total = 0; // reset total to 0 before adding prices of all products
    const productElements = document.querySelectorAll("#users li");
    for (let i = 0; i < productElements.length; i++) {
        const productPrice = parseFloat(productElements[i].innerText.split(" - ")[1]);
        total += productPrice;
    }
    document.getElementById('totalprice').innerHTML = "Total Worth of Products:" + total;


}


function deleteUser(userId, price) {
    total = total - price;
    axios.delete(`https://crudcrud.com/api/026c8a5ea7f24883b14e7f8238f08cac/ProductData/${userId}`)
        .then(() => {

            removeUserFromScreen(userId)

        })
        .catch((err) => {
            console.log(err)
        })
}

function removeUserFromScreen(userId) {
    const parentNode = document.getElementById('users');
    const childNodeToBeDeleted = document.getElementById(userId)
    if (childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
    document.getElementById('totalprice').innerHTML = "Total Worth of Products:" + total;
}
