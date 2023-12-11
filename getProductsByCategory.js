function getProductsByCategory(category) {
    var products = JSON.parse(localStorage.getItem("items"))

    console.log('category', category.id)

    var nbp = Math.floor(category.count / 80) + 1

    // nbp = nbp > 4 ? 4 : nbp;

    for (i = 1; i <= nbp; i++) {
        jQuery.ajax({
            url: `https://www.marjanemall.ma/all-products?cat=${category.id}&m_shipping_location=LOCAL&product_list_limit=80&p=${i}`,
            type: 'GET',
            success: function (data) {
                console.log('success')
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus)
            }
        }).done(function (page) {
            jQuery(page).find('li.item.product.product-item').each(function (k) {

                // get current page number
                var p = jQuery(page).find('.products.wrapper~.toolbar-products .item.pageNumber.current span:last-child').text()
                // console.log(`Page ${p}:${k} - ` +  jQuery(this).find('.product-item-link').text())

                var onclick = jQuery(this).find(".product.product-item-photo").attr("onclick");
                onclick = onclick.split(";")[1]
                // console.log(onclick)
                onclick = onclick.replace(" window.dataLayer.push(", "")
                onclick = onclick.slice(0, -1)
                onclick = JSON.parse(onclick)
                // console.log(onclick)
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
                    category: category.level1.trim(),
                    category2: category.level2.trim(),
                    category3: category.level3.trim(),
                    url: jQuery(this).find('.product-item-link').attr('href').trim(),
                }

                products.push(item);
                console.log(item)
            })

            localStorage.setItem("items", JSON.stringify(products))
        });
    }
}