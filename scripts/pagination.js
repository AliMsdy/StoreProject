let currentPage,rowNumber,desiredNumber,modifierNumber,isMiddlePageAppeared,isFirstSectionVisible

currentPage = 1
rowNumber = 6 // this parameter illustrates how many row do you want for each page to show for user 
desiredNumber = 5 // this parameter show how many page do you want from beginning to this and from end to this number
modifierNumber = desiredNumber // this number should be like desired number 
isMiddlePageAppeared = false
isFirstSectionVisible = true


function showProducts(currentPage, rowNumber) {
    let start = (currentPage - 1) * rowNumber
    let end = currentPage * rowNumber
    let selectedArray = listItems.slice(start, end)
    let div
    productSection.innerHTML = ""
    selectedArray.forEach(product => {
        let ImgArray = product.images
        let basketProductItem = basketProducts.find(p => p.title == product.title)
        div = $.createElement("div")
        div.className = "col-lg-4 col-md-6"
        // href="clickedProduct.html?id=${String(product.id)}"
        div.innerHTML = `<div class="border rounded">
        <div class="p-2">
            <div class="text-center img-parent"><a id="slider-btn" ><img src=${product.images[0]} class="img-fluid" alt="${product.title}"></a></div>            
            <p class="mt-3 title">${product.title}</p>
            <p class="text-danger">Balance: ${basketProductItem ? product.stock - basketProductItem.amount : product.stock}</p>
        </div>
        <div class="d-flex justify-content-between border-top p-2">
            <div><del>${product.price} $</del> &nbsp;&nbsp;<ins>${Math.round(product.price - (product.price * product.discountPercentage / 100))}$</ins></div>
            <i class="bi bi-cart-plus-fill fs-3 text-primary"></i>
        </div>`
        div.querySelector("#slider-btn").onclick = () => slider(product)
        productFragment.append(div)
    })
    productSection.append(productFragment)
}
function createPages(rowNumber) {

    mainNumber = Math.ceil(listItems.length / rowNumber)

    for (let i = 0; i < mainNumber; i++) {
        pageGenerator(i)
    }

    for (let i = desiredNumber + 1; i < mainNumber; i++) { // hide pages from 6 to 21(desiredNumber == 5)
        pageSection.children[i].style.display = "none"
    }

    let dotDiv = $.createElement("div")
    dotDiv.className = "dot second-dot"
    dotDiv.innerHTML = "..."
    pageSection.insertBefore(dotDiv, pageSection.children[mainNumber])

    let dotDiv2 = $.createElement("div")
    dotDiv2.innerHTML = "..."
    dotDiv2.style.display = "none"
    dotDiv2.className = "dot first-dot"
    pageSection.insertBefore(dotDiv2, pageSection.children[2])

    currentPage > 1 ? currentPage == mainNumber ? pageSection.children[currentPage + 2].className = "active" : pageSection.children[currentPage + 1].className = "active" : pageSection.children[currentPage].className = "active"
    hideOtherPages()
}

function pageGenerator(index) {

    let page = $.createElement("div")
    page.innerHTML = index + 1
    pageSection.insertBefore(page, nextBtn)

    page.onclick = function () {

        currentPage = index + 1 // because index starts from 0 we plus 1 to that
        loadPage()
        previousBtn.classList.remove("inactive")
        nextBtn.classList.remove("inactive")
        if (currentPage == mainNumber) nextBtn.classList.add("inactive");
        if (currentPage == 1) previousBtn.classList.add("inactive")

        hideOtherPages()
    }
}

function hideOtherPages() {
    nextAndPreviousFunc()
    if (currentPage == 1 || currentPage == (desiredNumber - 1)) {
        show5firstPage() // when clicking on the 1 btn or 4 btn (if desiredNumber == 5)
    } else if (currentPage == mainNumber || currentPage == (mainNumber - desiredNumber) + 2) {
        showLast5Pages() // when click on the 22 or 19 page btn
    } else if (currentPage == desiredNumber || currentPage == ((mainNumber - desiredNumber) + 1)) {
        showMiddlePages() // when clicking on the 5 btn or 18 btn
    }
}

function nextAndPreviousFunc() {
    if (isMiddlePageAppeared) {
        if (isFirstSectionVisible) { // this part is for from beginning to end (from 5 to end)
            if (currentPage == (modifierNumber - 1)) {
                pageSection.children[modifierNumber + 1].style.display = "block"
                pageSection.children[modifierNumber - 2].style.display = "none"
                modifierNumber++ // next page
            } else if (currentPage == (modifierNumber - 3)) {
                pageSection.children[modifierNumber].style.display = "none"
                pageSection.children[modifierNumber - 3].style.display = "block"
                modifierNumber-- // previous page
            }
        } else { // this part is for 18 to beginning pages (from 18 to 1)
            if (currentPage == (modifierNumber + 1)) {
                pageSection.children[modifierNumber + 3].style.display = "block"
                pageSection.children[modifierNumber].style.display = "none"
                modifierNumber++
            } else if (currentPage == (modifierNumber - 1)) {
                pageSection.children[modifierNumber + 2].style.display = "none"
                pageSection.children[modifierNumber - 1].style.display = "block"
                modifierNumber--
            }
        }
    }
}

function showMiddlePages() {
    if (currentPage == desiredNumber) { // when clicking on the 5 btn
        for (let i = 3; i < desiredNumber; i++) { // hide 2,3 btns
            pageSection.children[i].style.display = "none"
        }
        pageSection.children[desiredNumber + 2].style.display = "block" // show 7 page
        modifierNumber = desiredNumber
        modifierNumber += 2
        isFirstSectionVisible = true
    } else { // when clicking on the 18 btn
        let start = (mainNumber - desiredNumber) + 4// page number 20 (but start is 21)
        for (let i = start; i < mainNumber + 1; i++) { // hide 20, 21 page
            pageSection.children[i].style.display = "none"
        }
        pageSection.children[(mainNumber - desiredNumber) + 1].style.display = "block" // show page number 17
        isFirstSectionVisible = false
        modifierNumber = (mainNumber - desiredNumber) + 1 // 18
    }
    isMiddlePageAppeared = true
    $.querySelector(".first-dot").style.display = "block"
    $.querySelector(".second-dot").style.display = "block"
}

function showLast5Pages() {
    for (let i = 1; i < mainNumber + 1; i++) { // this for loop iterates over pageSection children and hide those children which we don't need
        if (i > 2 && i < ((mainNumber - desiredNumber) + 2)) {
            pageSection.children[i].style.display = "none"
        } else {
            pageSection.children[i].style.display = "block"
        }
    }
    $.querySelector(".first-dot").style.display = "block"
    $.querySelector(".second-dot").style.display = "none"
    isMiddlePageAppeared = false
    isFirstSectionVisible = false
}

function show5firstPage() {
    for (let i = 1; i < mainNumber + 1; i++) {
        if (i > desiredNumber + 1) {
            pageSection.children[i].style.display = "none"
        }
        else {
            pageSection.children[i].style.display = "block"
        }
    }
    $.querySelector(".first-dot").style.display = "none"
    $.querySelector(".second-dot").style.display = "block"
    isMiddlePageAppeared = false
    isFirstSectionVisible = true
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--
        loadPage()
        nextBtn.classList.remove("inactive")
        if (currentPage == 1) previousBtn.classList.add("inactive");
        hideOtherPages()
    }
}

function nextPage() {
    if (currentPage < mainNumber) {
        currentPage++
        loadPage()
        previousBtn.classList.remove("inactive")
        if (currentPage == mainNumber) nextBtn.classList.add("inactive");
        hideOtherPages()
    }
}

function loadPage() {
    showProducts(currentPage, rowNumber)
    $.querySelector(".active").className = ""
    if (currentPage > 1 && currentPage != mainNumber) {
        pageSection.children[currentPage + 1].className = "active"
    } else if (currentPage == mainNumber) {
        pageSection.children[currentPage + 2].className = "active"
    } else {
        pageSection.children[currentPage].className = "active"
    }
}


