//const fs = require('fs');

//console.log(fs.readdirSync("D:/github/solar-concept-web-site/realisation_source/dashboard").includes("js"))

//var fs = require('fs');
//const {Buffer} = require('buffer');
//// string generated by canvas.toDataURL()
//var img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0"
//    + "NAAAAKElEQVQ4jWNgYGD4Twzu6FhFFGYYNXDUwGFpIAk2E4dHDRw1cDgaCAASFOffhEIO"
//    + "3gAAAABJRU5ErkJggg==";
//
//// strip off the data: url prefix to get just the base64-encoded bytes
//var data = img.replace(/^data:image\/\w+;base64,/, "");
//var buf = Buffer.from(data, 'base64');
//fs.writeFile('image.png', buf, (err)=>{
//    console.error(err)
//});

var tt = []
var t = [2,4,5,6,7,8,9,10,11,12];
t.forEach((value,_index,_array)=>{
    tt.push(value);
})

console.log(tt)