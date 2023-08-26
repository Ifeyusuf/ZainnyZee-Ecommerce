let listsCart=document.querySelector(" #list-items");
let listAll=document.querySelector(" #listAll");


let basket = JSON.parse( localStorage.getItem("data")) || [];

let calculate = ()=>{
    document.getElementById("cart__total").innerHTML=basket.map( (cart)=>cart.item).reduce( (x, y)=> x+y, 0)
 }
 calculate();

let generateCart= ()=>{
    if (basket.length > 0){
    
        listsCart.innerHTML= basket.map( (x)=>{
                const{id, item}=x
                let search = shopItems.find( (x)=> x.id === id) || [];
                console.log(search);
                const {img, name,price}= search
                
                return`
                <section id=product-${id}>
                <div class="section">
                            <img  src=${img}  alt="" >
                        <div class="text-cart cart__section">
                        <div class="d__flex gap">
                            <p>${name}</p>
                            <p class="mt__p"><span>#${price}
                            </span></p>
                        </div>
                            <div class="cart__btn row gap items__align">
                            <button class="fs cursor" onclick="decreament(${id})">-</button>
                            <p id=${id} class="quantity">${item}</p>
                            <button class="cursor" onclick="increament(${id})">+</button>
                        </div>
                            <p>#${item * price}</p>
                        </div>
                        <div class="remove" onclick=" removeCart(${id})">
                            <h!>X</h!>
                        </div>
                </div>
                </section>
                `
            }).join("")
    }
    else{
        listsCart.innerHTML= `
        <div class="container text__center mt__5">
        
        <h1> No item Found </h1>
        <p><a href="./index.html" class="back">Back Home</a></p>
        </div>
        `
    }
}
generateCart();

let increament = (id) =>{
    let selectedItem=id;
    console.log(selectedItem);
    let search= basket.find( (x) => x.id === selectedItem.id);

    if (search === undefined){
        basket.push({
            id: selectedItem.id,
            item: 1,
        })
    }
    else{
        search.item +=1;
    }
    console.log(basket);
    update(selectedItem.id)
    totalAmount()
    generateCart()
    localStorage.setItem("data", JSON.stringify(basket))
};

let decreament = (id) =>{
    let selectedItem=id;
    let search= basket.find( (x)=> x.id === selectedItem.id);

    if (search === undefined)return
    else if (search.item === 0)
    return
    else{
        search.item -=1;
    }
    console.log(basket);

    update(selectedItem.id);

    basket=basket.filter( (x)=> x.item !== 0);
    basket= basket.filter( (x)=> x.selectedItem !== 0)
    totalAmount()
    generateCart();
    
    localStorage.setItem("data", JSON.stringify(basket));
    
};

let update = (id)=>{
    let search = basket.find( (x)=> x.id === id);
    document.getElementById(id).innerHTML=search.item
    calculate()
};

let removeCart= (id)=>{
let selectedItem=id
basket=basket.filter( (x)=> x.id !== selectedItem.id)
totalAmount()
generateCart();
calculate()
localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart= ()=>{
    basket=[];
    totalAmount()
    generateCart()
    calculate()
}

let totalAmount= ()=>{
    if(basket.length > 0){
            let amount= basket.map( (x)=>{
                const {id, item}=x;
                let search = shopItems.find( (x)=> x.id === id )
               return item * search.price
            }).reduce((x,y)=> x+y, 0)
            // console.log(amount);
            document.getElementById("label").innerHTML=`
            <h2 class=" mt__5">Total Bill : #${amount}</h2>
            <div class="my row">
            <button class=" check"> <a href="./index.html">CheckOut</a></button>
            <button class=" clear" onclick=" clearCart()">Clear Cart</button>
            </div>
            `
    }
    else{
        label.innerHTML= ``
    }
}
totalAmount()