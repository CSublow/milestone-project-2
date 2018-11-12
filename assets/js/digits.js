$.fn.digits = function(){ 
    return this.each(function(){ 
        $(this).text( $(this).text().replace(/(\D)(?=(\D\D\D)+(?!\D))/g, "$1,") ); 
    })
}