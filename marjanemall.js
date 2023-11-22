var items = []
localStorage.setItem("items", JSON.stringify(items))
var json;

for(i=1; i<=10; i++){
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

            var onclick = jQuery(this).find(".product.product-item-photo").attr("onclick");
            onclick = onclick.split(";")[1]
            // console.log(onclick)
            onclick = onclick.replace(" window.dataLayer.push(", "")
            onclick = onclick.replace("/.$/", "")
            // console.log(onclick)
            onclick = JSON.parse(onclick)
            // console.log('ecommerce', onclick.ecommerce)
            // json = JSON.parse(onclick)

            var item = {
                page: p,
                position: k,
                title: jQuery(this).find('.product-item-link').text(),
                soldby: jQuery(this).find('.sell-by strong').text(),
                price: jQuery(this).find('.price').text(),
                rating: jQuery(this).find('.rating-summary .rating-result').attr("title"),
                reviews: jQuery(this).find('.reviews-actions a').text(),
                item_id: onclick.ecommerce.items[0].item_id,
                item_brand: onclick.ecommerce.items[0].item_brand,
                affiliation: onclick.ecommerce.items[0].affiliation,
                item_category: onclick.ecommerce.items[0].item_category,
                item_category2: onclick.ecommerce.items[0].item_category2,
                item_category3: onclick.ecommerce.items[0].item_category3,
                item_category4: onclick.ecommerce.items[0].item_category4,
                item_category5: onclick.ecommerce.items[0].item_category5,
                url: jQuery(this).find('.product-item-link').attr('href'),
            }

            items.push(item);
            console.log(item)

            if(k == 5) {
                // return false; // breaks
            }
            // console.log(items)
        })

        localStorage.setItem("items", JSON.stringify(items))
    });
}