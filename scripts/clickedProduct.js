let $, locationSearchParams, listItems, productContainer
$ = document
locationSearchParams = new URLSearchParams(location.search).get("id")
productContainer = $.querySelector(".product-container")

function generateTemplate({ title, price, images, discountPercentage }) {

    productContainer.innerHTML = `<div class="col-md-6">
                <div>
                    <h2 class="display-4 lead">${title}</h2>
                    <p class="my-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores soluta pariatur corporis accusantium placeat cum totam commodi debitis repellendus nam, reprehenderit quis magni iure nisi necessitatibus sit nostrum rem quod.</p>
                    <footer class="lead text-muted fs-3 d-flex justify-content-around">Price: ${Math.round(price - (price * discountPercentage / 100))}$ <span class="text-danger">Off ${discountPercentage} %</span></footer>
                    
                </div>
            </div>
            <div class="col-md-6">
                <div class="d-flex justify-content-center">
                    <img src="${images[0]}" style="width:100%;height:auto;" class="img-fluid rounded" alt="">
                </div>
            </div>`

}

async function getData() {
    let response = await fetch('https://dummyjson.com/products?limit=100&select=title,price,images,stock,discountPercentage')
    let data = await response.json()
    listItems = data.products
    console.log(listItems);
    let mainProduct = listItems.find(p => p.id == locationSearchParams)
    generateTemplate(mainProduct)
}
getData()