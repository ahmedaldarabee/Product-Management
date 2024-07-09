
let title            = document.getElementById("title");
let price            = document.getElementById("price");
let taxes            = document.getElementById("taxes");

let advertisements  = document.getElementById("advertisements");
let discount        = document.getElementById("discount");
let total           = document.getElementById("total");

let counter         = document.getElementById("counter");
let category        = document.getElementById("category");
let submit          = document.getElementById("submit");

let currentMood = 'Create Product';
let currentTempIndex;

// get total
function getTotal(){
    if(price.value != '' && taxes.value != '' && advertisements.value != '' && discount.value != ''){
        let totalSummation = ((+price.value) + (+taxes.value) + (+advertisements.value)) - (+discount.value);
        
        total.innerHTML = totalSummation;        
        total.style.backgroundColor = '#047caf';
        total.style.display="block";
        total.style.textAlign="center";
        
    }else{
        total.innerHTML = '';
        total.style.backgroundColor = '#047caf';
    }
}

    // create product
    let arrProductData;

    if(localStorage.productHold != null){
        arrProductData = JSON.parse(localStorage.productHold);
    }else {
        arrProductData = []
    }

// object that have all data

    submit.onclick = function(){
        let product = {
            title:title                   ? title.value.toLowerCase() : '',
            price:price                   ? price.value : '',

            taxes: taxes                  ? taxes.value : '',
            advertisements:advertisements ? advertisements.value :'',
            discount: discount            ? discount.value : '',
            
            total : total                 ? total.innerHTML : '',
            counter:counter               ? counter.value   : '',
            category:category             ? category.value.toLowerCase()  :''
        };

        // Validation Data Section

        if(category.value != '' && title.value != '' && price.value != '' && taxes.value != '' && advertisements.value != '' && discount.value != ''){
            
           if(counter.value <= 100){

                if(currentMood === "Create Product"){
                    if(product.counter > 1){
                        for(let i = 0 ; i < product.counter ; i+=1 )
                            arrProductData.push(product) 
                    }else{
                        arrProductData.push(product)
                    }
                }else{
                    arrProductData[currentTempIndex] = product;
                    currentMood = "Create Product"; 
                    submit.innerHTML = "Create Product";
                    counter.style.display='block';
                }
                
                localStorage.setItem('productHold',JSON.stringify(arrProductData))
                showData();
                clearInput();

            }else{
                alert("Sorry But The Maximum Product Counter IS 100 Not " + Number(counter.value) + "!")
            }
        }else{
            alert("Please Complete Entering Data!")
        }
    }

// clear inputs
function clearInput(){
    title.value          = "";
    price.value          = "";
    taxes.value          = "";

    advertisements.value = "";
    discount.value       = "";
    total.innerHTML      = "";
    
    counter.value        = "";
    category.value       = "";
}

// reading data
function showData(){
    getTotal();
    
    let tbodyContent ='';
    
    for(let i = 0 ; i < arrProductData.length ; i++){
        tbodyContent += `
            <tr>
                <td data-label="id">        ${i+1} </td>
                <td data-label="name">      ${arrProductData[i].title}            </td>
                <td data-label="price">     ${arrProductData[i].price}            </td>
                <td data-label="taxes">     ${arrProductData[i].taxes}            </td>
                <td data-label="adverts">   ${arrProductData[i].advertisements}   </td>
                <td data-label="discount">  ${arrProductData[i].discount}         </td>
                <td data-label="total">     ${arrProductData[i].total}            </td>
                <td data-label="category">  ${arrProductData[i].category}         </td>
                
                <td data-label="updates"> <button  onclick="updateCurrentProduct(${i})" id="btn-update">update</button> </td>
                <td data-label="delete">  <button  onclick="deleteProduct(${i})"    id="btn-delete">delete</button>  </td>
            </tr>        
        `
    }
    document.getElementById('tbody-content').innerHTML = tbodyContent;

    let deleteContainer = document.getElementById('delete-all');

    // to show button when we have a products 
    if(arrProductData.length > 0 ){
        deleteContainer.innerHTML = `
            <button onclick="removeProducts()"> Delete All Of The Products: ${arrProductData.length} </button>
        `
    }else{
        // in case there is not data found!
        deleteContainer.innerHTML = '';
    }
}

showData();

// delete a product
function deleteProduct(index){
    arrProductData.splice(index,1);
    localStorage.productHold = JSON.stringify(arrProductData);
    showData();/* to do updates to the data for each new change  */
}


function removeProducts(){
    localStorage.clear();
    arrProductData.splice(0);
    showData();
}

// updates 

function updateCurrentProduct(index){
    title.value = arrProductData[index].title;
    price.value = arrProductData[index].price;
    taxes.value = arrProductData[index].taxes;

    advertisements.value = arrProductData[index].advertisements;
    discount.value = arrProductData[index].discount;
    
    getTotal();
    category.value = arrProductData[index].category;
    
    submit.innerHTML = 'Update';
    currentMood = 'Update'
    
    counter.style.display='none';
    currentTempIndex = index;
    
    scroll({
        top:0,
        behavior:'smooth'
    })
}

// searching a products

let searchType;

function searchingType(id){
    let searchingInput = document.getElementById('searchProduct');
    
    id == 'searchByTitle' ? searchType = 'title' : searchType = 'category'
    searchingInput.placeholder = 'searching by ' + (searchType);

    searchingInput.focus();
    searchingInput.value = '';
    showData();
}

function searchingProcess(value){

    let tbodyContent;

    for(let i = 0 ; i < arrProductData.length ; i+=1){
        if(searchType == 'title'){
            if(arrProductData[i].title.includes(value.toLowerCase())){
                tbodyContent +=
                 `
                    <tr>
                        <td data-label="id">        ${i+1} </td>
                        <td data-label="name">      ${arrProductData[i].title}            </td>
                        <td data-label="price">     ${arrProductData[i].price}            </td>
                        <td data-label="taxes">     ${arrProductData[i].taxes}            </td>
                        <td data-label="adverts">   ${arrProductData[i].advertisements}   </td>
                        <td data-label="discount">  ${arrProductData[i].discount}         </td>
                        <td data-label="total">     ${arrProductData[i].total}            </td>
                        <td data-label="category">  ${arrProductData[i].category}         </td>
                        
                        <td data-label="updates"> <button  onclick="updateCurrentProduct(${i})" id="btn-update">update</button> </td>
                        <td data-label="delete">  <button  onclick="deleteProduct(${i})"    id="btn-delete">delete</button>  </td>
                    </tr>        
                `
            }
        }else{
            if(arrProductData[i].category.includes(value.toLowerCase())){
                tbodyContent +=
                 `
                    <tr>
                        <td data-label="id">        ${i+1} </td>
                        <td data-label="name">      ${arrProductData[i].title}            </td>
                        <td data-label="price">     ${arrProductData[i].price}            </td>
                        <td data-label="taxes">     ${arrProductData[i].taxes}            </td>
                        <td data-label="adverts">   ${arrProductData[i].advertisements}   </td>
                        <td data-label="discount">  ${arrProductData[i].discount}         </td>
                        <td data-label="total">     ${arrProductData[i].total}            </td>
                        <td data-label="category">  ${arrProductData[i].category}         </td>
                        
                        <td data-label="updates"> <button  onclick="updateCurrentProduct(${i})" id="btn-update">update</button> </td>
                        <td data-label="delete">  <button  onclick="deleteProduct(${i})"    id="btn-delete">delete</button>  </td>
                    </tr>        
                `
            }
        }
    }
    document.getElementById('tbody-content').innerHTML = tbodyContent;
}

// clean data { Exceptions }