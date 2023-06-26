let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];
let innerModal = document.querySelector("#demo")
let sliderIndicators = innerModal.querySelector(".carousel-indicators")
let carouselInner = innerModal.querySelector(".carousel-inner")
let moreDetailLink = document.querySelector(".more-detail")


function slider(productObj){
    let ImgArray = productObj.images
    moreDetailLink.href = `clickedProduct.html?id=${String(productObj.id)}`
    modal.style.display = "flex";
    sliderIndicators.innerHTML = ""
    carouselInner.innerHTML = ""
    if(ImgArray.length > 1){
        
        ImgArray.forEach((imgSrc,index) => {
            
            if(index > 0){
            sliderIndicators.innerHTML += `
                <button type="button" data-bs-target="#demo" data-bs-slide-to="${index}" class="bg-danger"></button>
            `
            carouselInner.innerHTML += `<div class="carousel-item">
                                            <img src="${imgSrc}" alt="#" class="rounded">
                                        </div>`
            }else{
            sliderIndicators.innerHTML += `
                <button type="button" data-bs-target="#demo" data-bs-slide-to="${index}" class="active bg-danger"></button>
            `
            carouselInner.innerHTML += `<div class="carousel-item active">
                                            <img src="${imgSrc}" alt="#" class="rounded">
                                        </div>` 
            }
        })
    }else{
    sliderIndicators.innerHTML += `<button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="bg-danger"></button>`
    
    carouselInner.innerHTML += `<div class="carousel-item active">
                                            <img src="${ImgArray[0]}" alt="#" class="rounded">
                                        </div>`
    }
}
span.onclick = function () {
    modal.style.display = "none";
}