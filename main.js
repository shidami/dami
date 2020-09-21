function addHtmlToCart(cartDom,cart){
    cartDom.insertAdjacentHTML('beforeend', `
            <div class="cart_item">
            <img src="${cart.img}" alt="${cart.name}" class="cart_img">
            <h3>${cart.name}</h3>
            <div class="cart_price">${cart.price}</div>
            <button class="button_minus ${cart.quantity>1?'':'btn-danger'} btn-primary">&minus;</button>
            <div class="cart_number">${cart.quantity}</div>
            <button class="button_plus btn-primary">&plus;</button>
            <button class="button_delete btn-danger">&times;</button>
            </div>
        `);
};

function showTwoButtons(){
    document.querySelector('.shopping_cart').insertAdjacentHTML('beforeend',`
    <div class="two_bottom_button">
        <button class="left_cancel btn btn-danger">清除所有单品</button>
        <button class="right_pay btn btn-primary">支付</button>
    </div>
`);
};

function clearItemsAndSave(){
    document.querySelector('.left_cancel').addEventListener('click', () =>{
        document.querySelectorAll('.cart_item').forEach(item => {
            item.remove();
        });
        document.querySelector('.two_bottom_button').remove();
        addcartbtns.forEach(addcartbtn => {
            addcartbtn.disabled = false;
            addcartbtn.innerHTML = '加入购物车';
            carts.length = 0;
            //存储
            save();
        });
    });
};

function save(){
    localStorage.setItem('cart',JSON.stringify(carts));
    if(carts.length>0 && document.querySelector('.right_pay') != null){
        const totalPrice = carts.reduce((totalPrice, cart) => {
            let eachPrice = cart.quantity*cart.price;
            return totalPrice + eachPrice;
        },0);
        document.querySelector('.right_pay').innerHTML = `支付￥${totalPrice}`;
    };
};

function plusButton(product){
    const plusbtns= document.querySelectorAll('.button_plus');
    plusbtns.forEach(plusbtn => {
        if(plusbtn.parentNode.querySelector('h3').innerText == product.name){
            plusbtn.addEventListener('click', () =>{
                carts.forEach(cart => {
                    if(cart.name == product.name){
                        plusbtn.parentNode.querySelector('.cart_number').innerText= ++cart.quantity;
                        //存储
                        save();
                    };
                });
                //减号变蓝色
                if(plusbtn.parentNode.querySelector('.cart_number').innerText > 1){
                    plusbtn.parentNode.querySelector('.button_minus').classList.remove('btn-danger');
                };
            });
        };  
    });
};

function minusButton(product){
    const minusbtns= document.querySelectorAll('.button_minus');
        minusbtns.forEach(minusbtn => {
            if(minusbtn.parentNode.querySelector('h3').innerText == product.name){
                minusbtn.addEventListener('click', () =>{
                    carts.forEach(cart => {
                        if(cart.name == product.name){
                            minusbtn.parentNode.querySelector('.cart_number').innerText= --cart.quantity;
                            //存储
                            save();                        };
                    });
                    //减号变红
                    if(minusbtn.parentNode.querySelector('.cart_number').innerText == 1){
                        minusbtn.classList.add('btn-danger');
                    };
                    //减号移除
                    if(minusbtn.parentNode.querySelector('.cart_number').innerText ==0 ){
                        minusbtn.parentNode.remove();
                        carts = carts.filter(cart => cart.name != product.name);
                        //存储
                        save();
                        addcartbtns.forEach(addcartbtn => {
                            if(addcartbtn.parentNode.querySelector('h2').innerHTML == product.name){
                                addcartbtn.disabled = false;
                                addcartbtn.innerHTML = '加入购物车';
                            };
                        });
                        // console.log(cartDom.children.length);
                        if(carts.length == 0){
                            document.querySelector('.two_bottom_button').remove();
                        };
                    };
                });
            };  
        });
};

function removeButton(product){
    const delbtns= document.querySelectorAll('.button_delete');
    delbtns.forEach(delbtn => {
        if(delbtn.parentNode.querySelector('h3').innerText == product.name){
            delbtn.addEventListener('click', () =>{
                delbtn.parentNode.remove();
                carts = carts.filter(cart => cart.name != product.name);
                //存储
                save();
                addcartbtns.forEach(addcartbtn => {
                    if(addcartbtn.parentNode.querySelector('h2').innerHTML == product.name){
                        addcartbtn.disabled = false;
                        addcartbtn.innerHTML = '加入购物车';
                    };
                });
                if(carts.length ==0){
                    document.querySelector('.two_bottom_button').remove();
                };
            });
        };  
    });
};

function allButtons(product){
    //显示删除和支付按钮
    if(document.querySelector('.two_bottom_button') == null){
        showTwoButtons();
        //存储
        save();
        //清除所有单品
        clearItemsAndSave();
        //支付
        document.querySelector('.right_pay').addEventListener('click', () =>{
            checkout();
});
    };

    // 加号键
    plusButton(product);

    // 减号键
    minusButton(product);

    //删除键
    removeButton(product);
};

function checkout(){
        // paypal
    let paypalForHTML = `
    <form
        action="https://www.paypal.com/cgi-bin/webscr"
        id="paypal-form"
        method="post"
    >
        <input type="hidden" name="cmd" value="_cart" />
        <input type="hidden" name="upload" value="1" />
        <input type="hidden" name="business" value="27732357@qq.com" />
    `;

    carts.forEach((cartItem, index) => {
        ++index;
        paypalForHTML += `
        <input type="hidden" name="item_name_${index}" value="${cartItem.name}" />
        <input type="hidden" name="amount_${index}" value="${cartItem.price}" />
        <input type="hidden" name="quantity_${index}" value="${cartItem.quantity}" />
        `;
    });

    paypalForHTML += `
        <input type="submit" value="PayPal" />
    </form>
    `;

    document.querySelector('body').insertAdjacentHTML('beforeend', paypalForHTML);
    document.getElementById('paypal-form').submit();
};


//加入购物车
 let carts = JSON.parse(localStorage.getItem('cart')) || [];
if(carts.length>0){
    const cartDom = document.querySelector('.cart_items');
    carts.forEach(cart => {
        //把存储好的显示出来
        addHtmlToCart(cartDom,cart);

        const addcartbtns = document.querySelectorAll('.add_shopping_cart');
        addcartbtns.forEach(addcartbtn => {
            const productDom = addcartbtn.parentNode;
            if(productDom.querySelector('.product_font').innerText == cart.name){
                addcartbtn.disabled = true;
                addcartbtn.innerHTML = '已加入';
            };
        });

        allButtons(cart);
    });
};

// let carts = [];
const addcartbtns = document.querySelectorAll('.add_shopping_cart');
addcartbtns.forEach(addcartbtn => {
    addcartbtn.addEventListener('click', () =>{
        const productDom = addcartbtn.parentNode;
        // console.log(productDom);
        const product = {
            name: productDom.querySelector('.product_font').innerText,
            price: productDom.querySelector('.product_price').innerText,
            img: productDom.querySelector('img').getAttribute('src'),
            quantity: 1
        };
        // console.log(product)
        
        carts.push(product);
        //存储
        save();

        const cartDom = document.querySelector('.cart_items');
        addHtmlToCart(cartDom,product);
        addcartbtn.disabled = true;
        addcartbtn.innerHTML = '已加入';

        allButtons(product);

    });
});

//页面动画
const fixedIcon = document.getElementsByClassName('shopping_cart_icon')[0];
fixedIcon.addEventListener('click', () => {
    const container = document.querySelector('.cart_container');
    if(container.classList.contains('hidden')){
        fixedIcon.querySelector('img').style.transform = 'rotate(0deg)';
        setTimeout(() => {
            container.classList.toggle('hidden', false);
        }, 500);
    }else{
        fixedIcon.querySelector('img').style.transform = 'rotate(180deg)';
        setTimeout(() => {
            container.classList.toggle('hidden', true);
        }, 500);
    }
});

//购物车的高度不能超过屏幕的高度
let cartsHeight = document.body.clientHeight - document.querySelector('.shopping_cart_icon').offsetHeight-document.querySelector('.whole_picture>h2').offsetHeight;
document.querySelector('.shopping_cart').style.height = cartsHeight + 'px';



