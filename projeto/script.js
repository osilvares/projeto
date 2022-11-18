//cabecalho
const navToggler = document.querySelector('.nav-toggler');
const navMenu = document.querySelector('.site-navbar ul');
const navLinks = document.querySelectorAll('.site-navbar a');

allEventListners();

function allEventListners() {

  navToggler.addEventListener('click', togglerClick);

  navLinks.forEach( elem => elem.addEventListener('click', navLinkClick));
}

function togglerClick() {
  navToggler.classList.toggle('toggler-open');
  navMenu.classList.toggle('open');
}

function navLinkClick() {
  if(navMenu.classList.contains('open')) {
    navToggler.click();
  }
}


// menu
document.addEventListener("DOMContentLoaded", function() {

  document.querySelector('.menu').addEventListener("click", function() {
    this.classList.toggle("menu--ativo");
    document.querySelector(".nav-telacheia").classList.toggle("nav-telacheia--open");
  });
  
});


// slider
var AltaSlider = new Swiper('.alta-slider', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2.5,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
});

// comentarios
var swiper = new Swiper(".reviews-slider", {
  loop:true,
  grabCursor: true,
  spaceBetween: 20,
  pagination: {
     el: ".swiper-pagination",
     clickable:true,
  },
  breakpoints: {
     0: {
     slidesPerView: 1,
     },
     700: {
     slidesPerView: 2,
     },
     1024: {
     slidesPerView: 3,
     },
  },
});


/* Set rates + misc */
var taxRate = 0.05;
var shippingRate = 15.00; 
var fadeTime = 300;


/* Assign actions */
$('.product-quantity input').change( function() {
  updateQuantity(this);
});

$('.product-removal button').click( function() {
  removeItem(this);
});


/* Recalculate cart */
function recalculateCart()
{
  var subtotal = 0;
  
  /* Sum up row totals */
  $('.product').each(function () {
    subtotal += parseFloat($(this).children('.product-line-preco').text());
  });
  
  /* Calculate totals */
  var tax = subtotal * taxRate;
  var shipping = (subtotal > 0 ? shippingRate : 0);
  var total = subtotal + tax + shipping;
  
  /* Update totals display */
  $('.totals-value').fadeOut(fadeTime, function() {
    $('#cart-subtotal').html(subtotal.toFixed(2));
    $('#cart-tax').html(tax.toFixed(2));
    $('#cart-shipping').html(shipping.toFixed(2));
    $('#cart-total').html(total.toFixed(2));
    if(total == 0){
      $('.checkout').fadeOut(fadeTime);
    }else{
      $('.checkout').fadeIn(fadeTime);
    }
    $('.totals-value').fadeIn(fadeTime);
  });
}


/* Update quantity */
function updateQuantity(quantityInput)
{
  /* Calculate line preco */
  var productRow = $(quantityInput).parent().parent();
  var preco = parseFloat(productRow.children('.product-preco').text());
  var quantity = $(quantityInput).val();
  var linepreco = preco * quantity;
  
  /* Update line preco display and recalc cart totals */
  productRow.children('.product-line-preco').each(function () {
    $(this).fadeOut(fadeTime, function() {
      $(this).text(linepreco.toFixed(2));
      recalculateCart();
      $(this).fadeIn(fadeTime);
    });
  });  
}


/* Remove item from cart */
function removeItem(removeButton)
{
  /* Remove row from DOM and recalc cart total */
  var productRow = $(removeButton).parent().parent();
  productRow.slideUp(fadeTime, function() {
    productRow.remove();
    recalculateCart();
  });
}

/* Set values + misc */
var promoCode;
var promopreco;
var fadeTime = 300;

/* Assign actions */
$(".quantity input").change(function () {
  updateQuantity(this);
});

$(".remove button").click(function () {
  removeItem(this);
});

$(document).ready(function () {
  updateSumItems();
});

$(".promo-code-cta").click(function () {
  promoCode = $("#promo-code").val();

  if (promoCode == "10off" || promoCode == "10OFF") {
    //If promopreco has no value, set it as 10 for the 10OFF promocode
    if (!promopreco) {
      promopreco = 10;
    } else if (promoCode) {
      promopreco = promopreco * 1;
    }
  } else if (promoCode != "") {
    alert("Invalid Promo Code");
    promopreco = 0;
  }
  //If there is a promopreco that has been set (it means there is a valid promoCode input) show promo
  if (promopreco) {
    $(".summary-promo").removeClass("hide");
    $(".promo-value").text(promopreco.toFixed(2));
    recalculateCart(true);
  }
});

/* Recalculate cart */
function recalculateCart(onlyTotal) {
  var subtotal = 0;

  /* Sum up row totals */
  $(".basket-product").each(function () {
    subtotal += parseFloat($(this).children(".subtotal").text());
  });

  /* Calculate totals */
  var total = subtotal;

  //If there is a valid promoCode, and subtotal < 10 subtract from total
  var promopreco = parseFloat($(".promo-value").text());
  if (promopreco) {
    if (subtotal >= 10) {
      total -= promopreco;
    } else {
      alert("Order must be more than £10 for Promo code to apply.");
      $(".summary-promo").addClass("hide");
    }
  }

  /*If switch for update only total, update only total display*/
  if (onlyTotal) {
    /* Update total display */
    $(".total-value").fadeOut(fadeTime, function () {
      $("#basket-total").html(total.toFixed(2));
      $(".total-value").fadeIn(fadeTime);
    });
  } else {
    /* Update summary display. */
    $(".final-value").fadeOut(fadeTime, function () {
      $("#basket-subtotal").html(subtotal.toFixed(2));
      $("#basket-total").html(total.toFixed(2));
      if (total == 0) {
        $(".checkout-cta").fadeOut(fadeTime);
      } else {
        $(".checkout-cta").fadeIn(fadeTime);
      }
      $(".final-value").fadeIn(fadeTime);
    });
  }
}

/* Update quantity */
function updateQuantity(quantityInput) {
  /* Calculate line preco */
  var productRow = $(quantityInput).parent().parent();
  var preco = parseFloat(productRow.children(".preco").text());
  var quantity = $(quantityInput).val();
  var linepreco = preco * quantity;

  /* Update line preco display and recalc cart totals */
  productRow.children(".subtotal").each(function () {
    $(this).fadeOut(fadeTime, function () {
      $(this).text(linepreco.toFixed(2));
      recalculateCart();
      $(this).fadeIn(fadeTime);
    });
  });

  productRow.find(".item-quantity").text(quantity);
  updateSumItems();
}

function updateSumItems() {
  var sumItems = 0;
  $(".quantity input").each(function () {
    sumItems += parseInt($(this).val());
  });
  $(".total-items").text(sumItems);
}

/* Remove item from cart */
function removeItem(removeButton) {
  /* Remove row from DOM and recalc cart total */
  var productRow = $(removeButton).parent().parent();
  productRow.slideUp(fadeTime, function () {
    productRow.remove();
    recalculateCart();
    updateSumItems();
  });
}