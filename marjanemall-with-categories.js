var categories = [{"level1":"  Téléphone & Objets connectés","level2":"  Smartphone & Téléphone","level3":"  Smartphone","count":"301","id":"2287","url":"https://www.marjanemall.ma/all-products?cat=2287&m_shipping_location=LOCAL&product_list_limit=80","x":"301"},{"level1":"  Téléphone & Objets connectés","level2":"  Smartphone & Téléphone","level3":"  Téléphone portable","count":"1","id":"2293","url":"https://www.marjanemall.ma/all-products?cat=2293&m_shipping_location=LOCAL&product_list_limit=80","x":"1"},{"level1":"  Téléphone & Objets connectés","level2":"  Smartphone & Téléphone","level3":"  Téléphone fixe","count":"57","id":"2290","url":"https://www.marjanemall.ma/all-products?cat=2290&m_shipping_location=LOCAL&product_list_limit=80","x":"57"},{"level1":"  Téléphone & Objets connectés","level2":"  Objets connectés","level3":"  Montres connectées","count":"123","id":"4226","url":"https://www.marjanemall.ma/all-products?cat=4226&m_shipping_location=LOCAL&product_list_limit=80","x":"123"},{"level1":"  Téléphone & Objets connectés","level2":"  Objets connectés","level3":"  Accessoires","count":"50","id":"2281","url":"https://www.marjanemall.ma/all-products?cat=2281&m_shipping_location=LOCAL&product_list_limit=80","x":"50"},{"level1":"  Téléphone & Objets connectés","level2":"  Accessoires","level3":"  Protection & personnalisation","count":"295","id":"2278","url":"https://www.marjanemall.ma/all-products?cat=2278&m_shipping_location=LOCAL&product_list_limit=80","x":"295"},{"level1":"  Téléphone & Objets connectés","level2":"  Accessoires","level3":"  Ecouteurs","count":"239","id":"2272","url":"https://www.marjanemall.ma/all-products?cat=2272&m_shipping_location=LOCAL&product_list_limit=80","x":"239"}]
var items = []
localStorage.setItem("items", JSON.stringify(items))

categories.forEach((el, index) => {
    console.log(index, el.level3)

    var nbp = Math.floor(el.count/80) + 1

    for(i=1; i<=nbp; i++){
        jQuery.ajax({
            url: `https://www.marjanemall.ma/all-products?cat=${el.id}&m_shipping_location=LOCAL&product_list_limit=80&p=${i}`,
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
                onclick = onclick.slice(0, -1)
                console.log(onclick)
                // onclick = JSON.parse(onclick)
                // console.log('ecommerce', onclick.ecommerce)
                // json = JSON.parse(onclick)

                var item = {
                    page: p,
                    position: k,
                    title: jQuery(this).find('.product-item-link').text().trim(),
                    soldby: jQuery(this).find('.sell-by strong').text().trim(),
                    price: jQuery(this).find('.price').text().trim(),
                    rating: jQuery(this).find('.rating-summary .rating-result').attr("title"),
                    reviews: jQuery(this).find('.reviews-actions a').text(),
                    item_id: onclick.ecommerce.items[0].item_id,
                    item_brand: onclick.ecommerce.items[0].item_brand.trim(),
                    affiliation: onclick.ecommerce.items[0].affiliation.trim(),
                    category: el.level1.trim(),
                    category2: el.level2.trim(),
                    category3: el.level3.trim(),
                    url: jQuery(this).find('.product-item-link').attr('href').trim(),
                }

                items.push(item);
                console.log(item)
            })

            localStorage.setItem("items", JSON.stringify(items))
        });
    }
})