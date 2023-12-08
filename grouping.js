
var group = 0
var counter = 0
categories.forEach((el) => {
    counter = counter+el.count
    if(counter < 800){
        el.group = group
    }else{
        group++
        counter = el.count
        el.group = group
    }
    el.group = group
    console.log(counter, group, el.level3)
})