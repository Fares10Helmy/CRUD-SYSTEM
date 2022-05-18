
    
    var productNameInput= document.getElementById("productNameInput");
    var productPriceInput= document.getElementById("productPriceInput");
    var taxes= document.getElementById("taxes");
    var ads= document.getElementById("ads");
    var discount= document.getElementById("discount");
    var total= document.getElementById("total");
    var count= document.getElementById("count");
    var productCatogaryInput= document.getElementById("productCatogaryInput");
    var productDescInput= document.getElementById("productDescInput");
    var addBtn = document.getElementById("addBtn");

    let mood = "create";
    let updateVar;

    
    var productContainer; // array to store data



    if(localStorage.getItem("Products")==null) //local storage    awl mra yft7
    {
        productContainer=[];
    }
    else
    {
        productContainer= JSON.parse( localStorage.getItem("Products")); // local storage    user 2dem leh data 2dema
        displayProduct();
    }



     //get total
    function getTotal(){
        if(productPriceInput.value !='')
        {
            let result=  ( +productPriceInput.value +  +taxes.value +  +ads.value ) -  +discount.value ;
            total.innerHTML=`${result}`;
            total.style.background=`#040`;
        }
        else
        {
            total.innerHTML="";
            total.style.background=`#a00d02`;
        }
    }

    

     // add product in array
    function addProduct()
    {
        // if(validateProductName()==true)
        // {

        var product= {
                name:productNameInput.value,
                price:productPriceInput.value,
                taxes:taxes.value,
                ads: ads.value,
                discount: discount.value,
                total: total.innerHTML,
                count:count.value,
                catogary:productCatogaryInput.value,
                desc:productDescInput.value
            };
                
            // count data && cheeck mood create or update

            if(mood==="create")
            {

                if(count.value>1)
                {
                        for (let i = 0; i < count.value; i++)
                        {
                        productContainer.push(product);
                        }
                }
                else
                    {
                        productContainer.push(product);
                    }
            }
            else
            {           //update moood
                    productContainer[updateVar]= product;
                    mood="create"
                    addBtn.innerHTML="Add Product";
                    addBtn.style.backgroundColor="#310044"
                    count.style.display='block';
            }





            localStorage.setItem("Products",JSON.stringify(productContainer));
            displayProduct();
            clearForm();
            console.log(product);
        // }
        
    }




   //clear product make input clean
    function clearForm()
    {
        productNameInput.value="";
        productPriceInput.value="";
        taxes.value="";
        ads.value="";
        discount.value="";
        total.innerHTML="";
        count.value="";
        productCatogaryInput.value="";
        productDescInput.value="";
    };

    

   // display products in website
    function displayProduct()
    {
       getTotal()         //update 
    
        var cartoona=``;

        for( i=0;  i<productContainer.length;   i++ )
        {
            cartoona+= `<tr>
                <td>` + (i+1)+`</td>
                <td>` +  productContainer[i].name  +` </td>
                <td>`+productContainer[i].price+` </td>
                <td>`+productContainer[i].taxes+` </td>
                <td>`+productContainer[i].ads+` </td>
                <td>`+productContainer[i].discount+` </td>
                <td>`+productContainer[i].total+` </td>
                <td>`+productContainer[i].catogary+` </td>
                <td>`+productContainer[i].desc+` </td>
                <td><button onclick=" updateProduct(`+i+`) "  class="btn btn-outline-warning">Update</button> </td>
                <td><button onclick=" deleteProduct(`+i+`) " class="btn btn-outline-danger">Delete</button> </td>
                </tr>`
        }

        document.getElementById("tableBody").innerHTML=cartoona;

        //display deleteAll btn
        let deleteAllBtn = document.getElementById("deleteAll")

        if(productContainer.length>0)
        {
            deleteAllBtn.innerHTML=`<button onclick="deleteAll()" btn btn-danger"> Delete All (${productContainer.length})</button>`;
        }
        else
        {
            deleteAllBtn.innerHTML='';
        }

    };


   // delete product form wbsite
    function deleteProduct(productIndex)
    {
        productContainer.splice(productIndex,1)  // productIndex==> start point && 1==> number of elements that i want to delete  
        localStorage.setItem("Products",JSON.stringify(productContainer));
            displayProduct();

    };

    // delete All product form wbsite
    function deleteAll(){
        productContainer.splice(0); // 0 ==> delete all in array
        localStorage.clear();
        displayProduct();
    } 



   //search product
    function searchProduct(searchItem)
    {
        var cartoona=``;

        for( i=0;  i< productContainer.length;   i++ )
        {
            if( productContainer[i].name.toLowerCase().includes(searchItem.toLowerCase())==true )
            {
                cartoona+= `<tr>
                <td>`+ (i+1)+`</td>
                <td>`+productContainer[i].name +` </td>
                <td>`+productContainer[i].price +` </td>
                <td>`+productContainer[i].catogary+` </td>
                <td>`+productContainer[i].desc+` </td>
                <td><button class="btn btn-outline-warning">Update</button> </td>
                <td><button onclick=" deleteProduct(`+i+`) " class="btn btn-outline-danger">Delete</button> </td>
                </tr>`
            }
            else
            {

            }
        }

        document.getElementById("tableBody").innerHTML=cartoona;
    };


  // update product
    function updateProduct (i){
        productNameInput.value = productContainer[i].name;
        productPriceInput.value = productContainer[i].price;
        taxes.value = productContainer[i].taxes;
        ads.value = productContainer[i].ads;
        discount.value = productContainer[i].discount;
        getTotal();
        count.style.display='none';
        productCatogaryInput.value = productContainer[i].catogary;
        productDescInput.value = productContainer[i].desc;

        addBtn.innerHTML="Update";
        addBtn.style.backgroundColor="#7a7a0d"
        mood="update";

        updateVar=i;

        scroll({
            top:0,
            behavior:"smooth"
        })

    }












       //validatetaion

    // function validateProductName()
    //     {
    //         var regx=/^[A-Z][A-Z]{3,9}$/;

    //         if(regx.test(productNameInput.value)==true)
    //         {
    //             productNameInput.classList.add("is-valid");
    //             productNameInput.classList.remove("is-invalid");
    //             return true;
    //         }
    //         else
    //         {
    //             productNameInput.classList.add("is-invalid")
    //             productNameInput.classList.remove("is-valid");
    //             return false;
    //         }
    // }
    //  productNameInput.addEventListener("blur",validateProductName);
                
 