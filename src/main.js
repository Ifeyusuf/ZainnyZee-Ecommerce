
let lists=document.querySelector(".cart__container");
let basket = JSON.parse( localStorage.getItem("data")) || []

function cartLists(){
    return(
        lists.innerHTML= 
        shopItems.map((x)=>{
            const {id,img,price,desc,name}= x
            let search= basket.find((x)=> x.id === id) || []
            return `
            <div id=product-${id} class="cart__items">
                    <img src=${img} alt="">
                    <div class="text-cart p">
                        <p>${name}</p>
                        <p>#${price}</p>
                        <small>${desc}</small>
                    </div>
                    <div class="cart__btn row justify__around items__align">
                        <button class="fs cursor" onclick="decreament(${id})">-</button>
                        <p id=${id} class="quantity">${search.item === undefined? 0 : search.item}</p>
                        <button class="cursor" onclick="increament(${id})">+</button>
                    </div>
                </div>
            `
            })
            .join(""))
};
cartLists();

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
    
    localStorage.setItem("data", JSON.stringify(basket));
    
};

let update = (id)=>{
    let search = basket.find( (x)=> x.id === id);
    document.getElementById(id).innerHTML=search.item
    calculate()
};

let calculate = ()=>{
   document.getElementById("cart__total").innerHTML=basket.map( (cart)=>cart.item).reduce( (x, y)=> x+y, 0)
}
calculate()