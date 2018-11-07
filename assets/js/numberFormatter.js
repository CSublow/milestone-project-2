function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
}

    $('.number-display').each(function(){
    var numberToFormat = $(this).html();
    numberToFormat = numberWithCommas(numberToFormat);

    $(this).html(numberToFormat)
        
        })

