
let db = [{
    name: 'Сандора',
    src:'sandora',
    price: 50,
}, {
    name: 'Садочок',
    src:'sadochok',
    price: 40,
},{
    name:'Наш Сік',
    src:'nashsik',
    price:30,
}];


// витягнув зображення по індексу
function geIndex1(){
    $.each(db, function(index, el) {});
}
geIndex1()

$('#btnOrder').click(function () {
    $('.popapOrder').css('display', 'flex');
});

localStorage.setItem('db', JSON.stringify(db));


function init() {
    for (let el of db) {
        $('#productName').append(`<option value='${el.name}'>${el.name}</option>`);
        
    }
}
init()


function getProduct() {
    let productList = JSON.parse(localStorage.getItem('db'));
    
    for (let el of productList) {
        $('.productContainer').append(`<div class='productName'>
        <div class='orderName'>${el.name}</div>
        <img data-aos="fade-left" class='orderSrc' width='100px' src='./img/${el.src}.png'>
        <div class='orderPrice'>${el.price}</div>
        </div>`);
    }
}

getProduct();

let orders = JSON.parse(localStorage.getItem('order')) || [];

// створив функцію для очистки інпутів 

function clearLocal(){
    localStorage.setItem('order', JSON.stringify(orders));
    $('#productCount').val('');
    $('#productPrice').val('');
}
clearLocal()



$('#accept').click(function () {
    let order = {
        name: $('#productName').val(),
        count: $('#productCount').val(),
        price: $('#productPrice').val(),
        delivery: $('#productDelivery').val(),
        date: new Date().toLocaleString()
    };
    
    orders.push(order);
    clearLocal()
    getOrders();
    $('.popapOrder').css('display', 'none');
});


// Закритя попапу

$('#cancel').click(function(){
    clearLocal()
    $('.popapOrder').css('display', 'none');
})

function getOrders() {
    $('.orderContainer').empty();
    let set = [];
    let sum = 0;

    let ordersList = JSON.parse(localStorage.getItem('order'));
    for (let el of ordersList) {
        // Додав ціну і кількість між собою
        let www = el.price * el.count;
        // Додав цю змінну в пустий масив
        set.push(www);

    
        let orderItem = $(`<div class='orderItem'>
            <div class='orderName'>
            ${el.name}
            </div>
            <div class='orderCount'>
            ${el.count}
            </div>
            <div class='orderPrice'>
            ${el.price}
            </div>
            <div class='orderPost'>
            ${el.delivery}
            </div>
            <div class='orderDate'>
            
            ${el.date}
            </div>
            <i id ='delet'class="fa-solid fa-xmark delete-icon"></i>
        </div>`);

        $('.orderContainer').append(orderItem);
    }


    $('#delet').click(function () {

        let index = $('.orderItem').index();

        orders.splice(index, 1);

        localStorage.setItem('order', JSON.stringify(orders));

        getOrders();
    });

    // Визначив суму в масиві
    for (let i = 0; i < set.length; i++) {
        sum += set[i];
    }
    $('.text').text(sum);
}

getOrders();



