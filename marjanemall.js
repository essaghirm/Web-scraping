var items = []
localStorage.setItem("items", JSON.stringify(items))

for(i=1; i<=702; i++){
    jQuery.ajax({
        url: `https://www.marjanemall.ma/all-products?m_shipping_location=LOCAL&p=${i}&product_list_limit=80`,
        type: 'GET',
        success: function (data) {
            console.log('success')
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus)
        }
    }).done(function(page){

        jQuery(page).find('li.item.product.product-item').each(function(k){

            // get current page number
            var p = jQuery(page).find('.products.wrapper~.toolbar-products .item.pageNumber.current span:last-child').text()
            console.log(`Page ${p}:${k} - ` +  jQuery(this).find('.product-item-link').text())

            items.push({
                page: `${p}:${k}`,
                title: jQuery(this).find('.product-item-link').text(),
                soldby: jQuery(this).find('.page-products .sell-by strong').text(),
                price: jQuery(this).find('.price').text(),
            });
            // console.log(items)
        })

        localStorage.setItem("items", JSON.stringify(items))
    });
}

