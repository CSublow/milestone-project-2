function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
};

$(document).ready(function() {
    $('.number-display').each(function(){
    var numberToFormat = $(this).html();
    numberToFormat = numberWithCommas(numberToFormat);

    $(this).html(numberToFormat);
    })
})


// function numberWithCommas(x) {
//     return x.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
// }


//     $('.points').each(function(){
//     var v_pound = $(this).html();
//     v_pound = numberWithCommas(v_pound);

//     $(this).html(v_pound)
        
//         })