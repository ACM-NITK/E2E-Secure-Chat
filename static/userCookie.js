function getCookie(name){
	var re=new RegExp(name+"=([^;]+)");
	var value=re.exec(document.cookie);
	console.log(value)
	//return(value!=null)?unescape(value[1]):null;
	return value;
}
var today=new Date();
var expiry=new Date(today.getTime()+30*24*3600*1000);
var expired=new Date(today.getTime()-24*3600*1000);
function setCookie(name,value){
	document.cookie=name+"="+escape(value)+"; path=/; expires="+expiry.toGMTString();
}
function deleteCookie(name){
	document.cookie=name+"=null; path=/; expires="+expired.toGMTString();
}
function storeValues(form){
	setCookie("username",form.username.value);
	return true;
}
function hello(){
	console.log("hello");
}

