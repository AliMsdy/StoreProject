
let $, productSection, pageSection, mainNumber, previousBtn, nextBtn, productFragment, listItems, basketProducts, basketBtn, basketContainer, totalPrice,timer,message,amountOfProductsInBasket,purchaseBtn
$ = document
productSection = $.querySelector(".productContainer") // this is for products section not for basket section
pageSection = $.querySelector(".pages")
nextBtn = $.querySelector(".next")
previousBtn = $.querySelector(".previous")
basketBtn = $.querySelector("#toggle-basket")
productFragment = $.createDocumentFragment()
basketContainer = $.querySelector("#productsContainer")
totalPrice = $.querySelector("#total-price")
timer = $.querySelector(".timer")
message = $.querySelector(".message")
amountOfProductsInBasket = $.querySelector(".amount-of-product")
purchaseBtn = $.querySelector(".purchase-btn")

listItems = null
basketProducts = []


function createBasketProduct({ title, price, amount, discountPercentage }, i) { // takes every object from basket Product and create it's template

    let selectedProduct = $.createElement("div")
    selectedProduct.className = "product d-flex mb-4 justify-content-between align-items-center"

    let finalPrice = Math.round(price - (price * discountPercentage / 100))

    selectedProduct.innerHTML = `<span class="mb-0 d-flex align-items-center justify-content-center">${title}</span>
    <span>${finalPrice}$</span>
    <div class="amount d-flex justify-content-around align-items-center">
        <i class="bi bi-plus bg-success text-white p-2"></i>
        <span>${amount}</span>
        <i class="bi bi-dash bg-danger text-white p-2"></i>
    </div>`

    selectedProduct.querySelector("span:first-child").addEventListener("click", (event) => { // this is for delete from basket (click on the title)
        let i
        selectedProduct.remove()
        i = basketProducts.findIndex(product => product.title == event.target.textContent)

        let indexInProducts = Array.from($.querySelectorAll(".title")).findIndex(element => {
            if (element.textContent == basketProducts[i].title) return true
        })
        
        if(indexInProducts !== -1) productSection.children[indexInProducts].querySelector(".text-danger").innerHTML = `Balance: ${basketProducts[i].stock}`
        basketProducts.splice(i, 1)
        updateTotalPrice()
    })

    selectedProduct.querySelector(".bi-plus").addEventListener("click", function () { // this is for + mark in the basket section
        if (basketProducts[i].amount == basketProducts[i].stock) {
            alert("not sufficient amount")
            return
        }
        basketProducts[i].amount++
        updateBasket()
        findIndex(i)
    })
    selectedProduct.querySelector(".bi-dash").addEventListener("click", function () { // this handler for - mark in the basket section
        basketProducts[i].amount--
        findIndex(i)
        if (basketProducts[i].amount < 1) {
            selectedProduct.remove()
            basketProducts.splice(i, 1)
            if (!basketProducts.length) updateTotalPrice()
        }
        updateBasket()
    })

    basketContainer.append(selectedProduct)

    updateTotalPrice()

}

function findIndex(i) {
    let indexInProducts = Array.from($.querySelectorAll(".title")).findIndex(element => {
        if (element.textContent == basketProducts[i].title) return true
    })
    // let mainProductIndex = listItems.findIndex(obj => {
    //     if (obj.title == basketProducts[i].title) return true
    // })
    if(indexInProducts !== -1) productSection.children[indexInProducts].querySelector(".text-danger").innerHTML = `Balance: ${basketProducts[i].stock - basketProducts[i].amount}`
}

function addToBasket(product, index) {
    let isExist = false
    basketProducts.some(p => {
        if (p.title == listItems[index].title) {// this product exists
            isExist = true
            if (p.amount == p.stock) {
                alert("not sufficient amount")
                return
            }
            p.amount++
            updateBasket()
        }
    })
    if (!isExist) { // this if executed if product doesn't exist in the product list
        let basketProduct = Object.assign({}, product, { amount: 1 })
        basketProducts.push(basketProduct)
        updateBasket()
    }
}
function updateBasket() {
    basketContainer.innerHTML = ""

    basketProducts.forEach((product, index) => {
        createBasketProduct(product, index)
    })
}

function updateTotalPrice() {
    let total = 0
    let amount = 0
    let finalPrice
    basketProducts.forEach(p => {
        finalPrice = Math.round(p.price - (p.price * p.discountPercentage / 100))
        total += (finalPrice * p.amount)
        amount += p.amount
    })
    amountOfProductsInBasket.innerHTML = amount
    totalPrice.innerHTML = `<p class="mb-0">Quantity : ${amount}&nbsp;&nbsp;&nbsp;&nbsp; Total Price : ${total} $</p>`
}


function updateBalance(indexInArray, indexInProducts) {
    let index = basketProducts.findIndex(p => {
        if (p.title == listItems[indexInArray].title) {
            return true
        }
    })
    if ((listItems[indexInArray].stock - basketProducts[index].amount) < 0) {
        alert("not sufficient amount")
        return
    }
    productSection.children[indexInProducts].querySelector(".text-danger").innerHTML = `Balance: ${listItems[indexInArray].stock - basketProducts[index].amount}`
}

nextBtn.addEventListener("click", nextPage)
previousBtn.addEventListener("click", previousPage)
basketBtn.addEventListener("click", function () {
    productsContainer.parentElement.style.display == "block" ? productsContainer.parentElement.style.display = "none" : productsContainer.parentElement.style.display = "block"
})
productSection.addEventListener("click", function (e) {
    let icons
    if (e.target.tagName == "I") {
        icons = [...document.querySelectorAll(".bi-cart-plus-fill")] // Array of all icons in product card
        index = icons.indexOf(e.target) + 1 // this line detect which icon clicked and get its index
        indexInListItem = ((currentPage - 1) * 6 + index) - 1 // this line of code founds product in list of all products based on its index
        message.firstElementChild.textContent = `${listItems[indexInListItem].title} added to your basket successfully`
        message.style.display = "block"
        // console.log(listItems[indexInListItem], indexInListItem);
        addToBasket(listItems[indexInListItem], indexInListItem) // when user clicks on the purchase button on each card (almost the process starts from here)
        // console.log(productSection.children[index -1]);
        updateBalance(indexInListItem, index - 1) // index -1 is index of 6 products that exists in the page
    }
})

timer.addEventListener("animationend",() => {
    message.classList.replace("animate__fadeInLeft","animate__bounceOutLeft")
    setTimeout(() => {
        message.style.display = "none"
        message.classList.replace("animate__bounceOutLeft","animate__fadeInLeft")
    },500)
})

message.addEventListener("mouseenter",function(){
    message.style.animationPlayState = "paused"
    timer.style.animationPlayState = "paused"
})
message.addEventListener("mouseleave",function(){
    message.style.animationPlayState = "running"
    timer.style.animationPlayState = "running"
})
purchaseBtn.addEventListener("click",() => {
    if(basketProducts.length){
        Swal.fire({
            icon: "success",
            title: "Thanks for your shopping",
            html: "<h3>Hope to see you again &#128075 &#128521 &#128525</h3>"
        })
        basketProducts = []
        updateBasket()
        updateTotalPrice()
        
    }
})

async function getData() {
    let response = await fetch('https://dummyjson.com/products?limit=100&select=title,price,images,stock,discountPercentage')
    let data = await response.json()
    // console.log(data);
    listItems = data.products
    showProducts(currentPage, rowNumber)
    createPages(rowNumber)
    document.getElementById("preload").classList.add("hidden")
    main.style.display = "block"
}
getData()

/*

some features to add later:
add stars for every product and color them according to its rank(should check the api and manipulate the queries which we use)
add purchase button and using some animation for showing the alerts to the user
add more details to the customProduct.html for its template and show more details of product in this page
refactor the code and divide this code to modules for more efficiency
*/
