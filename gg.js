//加入购物车
let carts = JSON.parse(localStorage.getItem('cart')) || [];
if(carts.length>0){
    const cartDom = document.querySelector('.cart_items');
    carts.forEach(cart => {
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
        const addcartbtns = document.querySelectorAll('.add_shopping_cart');
        addcartbtns.forEach(addcartbtn => {
            const productDom = addcartbtn.parentNode;
            if(productDom.querySelector('.product_font').innerText == cart.name){
                addcartbtn.disabled = true;
                addcartbtn.innerHTML = '已加入';
            };
        });

        //显示删除和支付按钮

        if(document.querySelector('.two_bottom_button') == null){
            document.querySelector('.shopping_cart').insertAdjacentHTML('beforeend',`
                <div class="two_bottom_button">
                    <button class="left_cancel btn btn-danger">清除所有单品</button>
                    <button class="right_pay btn btn-primary">支付</button>
                </div>
            `);

            //清除所有单品
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
                    localStorage.setItem('cart',JSON.stringify(carts));

                });
            });
        };

        // 加号键
        const plusbtns= document.querySelectorAll('.button_plus');
        plusbtns.forEach(plusbtn => {
            if(plusbtn.parentNode.querySelector('h3').innerText == cart.name){
                plusbtn.addEventListener('click', () =>{
                    plusbtn.parentNode.querySelector('.cart_number').innerText= ++cart.quantity;
                    //存储
                    localStorage.setItem('cart',JSON.stringify(carts));
                    //减号变蓝色
                    if(plusbtn.parentNode.querySelector('.cart_number').innerText > 1){
                        plusbtn.parentNode.querySelector('.button_minus').classList.remove('btn-danger');
                    };
                });
            };  
        });
    
        // 减号键
        const minusbtns= document.querySelectorAll('.button_minus');
        minusbtns.forEach(minusbtn => {
            if(minusbtn.parentNode.querySelector('h3').innerText == cart.name){
                minusbtn.addEventListener('click', () =>{
                    minusbtn.parentNode.querySelector('.cart_number').innerText= --cart.quantity;
                    //存储
                    localStorage.setItem('cart',JSON.stringify(carts));
                    //减号变红
                    if(minusbtn.parentNode.querySelector('.cart_number').innerText == 1){
                        minusbtn.classList.add('btn-danger');
                    };
                    
                    //减号移除
                    if(minusbtn.parentNode.querySelector('.cart_number').innerText ==0 ){
                        minusbtn.parentNode.remove();
                        carts = carts.filter(cart => cart.name != minusbtn.parentNode.querySelector('h3').innerText);
                        //存储
                        localStorage.setItem('cart',JSON.stringify(carts));
                        addcartbtns.forEach(addcartbtn => {
                            if(addcartbtn.parentNode.querySelector('h2').innerHTML == cart.name){
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
   
        //删除键
        const delbtns= document.querySelectorAll('.button_delete');
        delbtns.forEach(delbtn => {
            if(delbtn.parentNode.querySelector('h3').innerText == cart.name){
                delbtn.addEventListener('click', () =>{
                    delbtn.parentNode.remove();
                    carts.splice(cart,1);
                    //存储
                    localStorage.setItem('cart',JSON.stringify(carts));
                    addcartbtns.forEach(addcartbtn => {
                        if(addcartbtn.parentNode.querySelector('h2').innerHTML == cart.name){
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
        localStorage.setItem('cart',JSON.stringify(carts));
        addcartbtn.disabled = true;
        addcartbtn.innerHTML = '已加入';
        const cartDom = document.querySelector('.cart_items');

        cartDom.insertAdjacentHTML('beforeend', `
            <div class="cart_item">
            <img src="${product.img}" alt="${product.name}" class="cart_img">
            <h3>${product.name}</h3>
            <div class="cart_price">${product.price}</div>
            <button class="button_minus btn-danger btn-primary">&minus;</button>
            <div class="cart_number">${product.quantity}</div>
            <button class="button_plus btn-primary">&plus;</button>
            <button class="button_delete btn-danger">&times;</button>
            </div>
        `)

        //显示删除和支付按钮

        if(document.querySelector('.two_bottom_button') == null){
            document.querySelector('.shopping_cart').insertAdjacentHTML('beforeend',`
                <div class="two_bottom_button">
                    <button class="left_cancel btn btn-danger">清除所有单品</button>
                    <button class="right_pay btn btn-primary">支付</button>
                </div>
            `);

            //清除所有单品
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
                    localStorage.setItem('cart',JSON.stringify(carts));

                });
            });
        };

        // 加号键

        const plusbtns= document.querySelectorAll('.button_plus');
        plusbtns.forEach(plusbtn => {
            if(plusbtn.parentNode.querySelector('h3').innerText == product.name){
                plusbtn.addEventListener('click', () =>{
                    carts.forEach(cart => {
                        if(cart.name == product.name){
                            plusbtn.parentNode.querySelector('.cart_number').innerText= ++cart.quantity;
                            //存储
                            localStorage.setItem('cart',JSON.stringify(carts));
                        };
                    });
                    //减号变蓝色
                    if(plusbtn.parentNode.querySelector('.cart_number').innerText > 1){
                        plusbtn.parentNode.querySelector('.button_minus').classList.remove('btn-danger');
                    };
                });
            };  
        });

        // 减号键
        const minusbtns= document.querySelectorAll('.button_minus');
        minusbtns.forEach(minusbtn => {
            if(minusbtn.parentNode.querySelector('h3').innerText == product.name){
                minusbtn.addEventListener('click', () =>{
                    carts.forEach(cart => {
                        if(cart.name == product.name){
                            minusbtn.parentNode.querySelector('.cart_number').innerText= --cart.quantity;
                            //存储
                            localStorage.setItem('cart',JSON.stringify(carts));
                        };
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
                        localStorage.setItem('cart',JSON.stringify(carts));
                        addcartbtn.disabled = false;
                        addcartbtn.innerHTML = '加入购物车';
                        // console.log(cartDom.children.length);
                        if(carts.length == 0){
                            document.querySelector('.two_bottom_button').remove();
                        };
                    };
                });
            };  
        });

        //删除键
        const delbtns= document.querySelectorAll('.button_delete');
        delbtns.forEach(delbtn => {
            if(delbtn.parentNode.querySelector('h3').innerText == product.name){
                delbtn.addEventListener('click', () =>{
                    delbtn.parentNode.remove();
                    carts.forEach(cart => {
                        if(cart.name == product.name){
                            carts.splice(cart,1);
                        };
                    });
                    //存储
                    localStorage.setItem('cart',JSON.stringify(carts));
                    addcartbtn.disabled = false;
                    addcartbtn.innerHTML = '加入购物车';
                    if(carts.length ==0){
                        document.querySelector('.two_bottom_button').remove();
                    };
                });
            };  
        });

    });
});



