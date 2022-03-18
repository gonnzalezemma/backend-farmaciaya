

function createPassword(){
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_$&#@";
  var string_length = 6;
  var randomstring = '';
  for (var i=0; i<string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum,rnum+1);
  }
  return randomstring;
}


module.exports={
    createPassword
}