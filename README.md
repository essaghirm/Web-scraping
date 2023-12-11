# How To


 1. Open *[marjanemall](https://www.marjanemall.ma/all-products?m_shipping_location=LOCAL&product_list_limit=80)* in a new tab
 2. Open the dev tools > Console and clear it with `CMD+k`
 3. Inside the console create categories variable with *[grouped-categories.json](https://github.com/essaghirm/Web-scraping/blob/3f10c246f4b6ba0f4cb8ca3cdcc7ac49988a2b74/grouped-categories.json)* content
`var categories = filecontent`
 4. Create *[getProductsByCategory](https://github.com/essaghirm/Web-scraping/blob/3f10c246f4b6ba0f4cb8ca3cdcc7ac49988a2b74/getProductsByCategory.js)* function
 5. Ensure that jQuery is installed, if not try to install this extension on chrome *[jQuery Injector](https://chromewebstore.google.com/detail/jquery-injector/ekkjohcjbjcjjifokpingdbdlfekjcgi)*
 6. Create *[downloadJson](https://github.com/essaghirm/Web-scraping/blob/d4789c920e01e5b59043334d4c140064002df2b4/downloadJson.js)* function
 7. Create items variable and store it to *`localStorage`*  and repeat this operation every time before calling *`getProductsByCategory`* function in 8th step
```
var items = []
localStorage.setItem("items", JSON.stringify(items))
```
 8. call *`getProductsByCategory`* function to retrieve products from the given categories 
```
// repeat 7th step
// then call the function
categories[0].forEach((el) => {
    getProductsByCategory(el)
})
```
 9. Call the *downloadJson* to download Json file
 10. Repeat the 8th and 9th step with changing the 0 to 1, then to 2, etc. until 69 
 ```
categories[1].forEach((el) => {
    getProductsByCategory(el)
})
 ```
 ```
categories[2].forEach((el) => {
    getProductsByCategory(el)
})
 ```
 ...
  ```
categories[69].forEach((el) => {
    getProductsByCategory(el)
})
 ```
