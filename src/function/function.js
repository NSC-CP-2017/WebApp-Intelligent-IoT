//Constraint
const expireSecs = 8 * 60 * 60;
const useCookie = true;
//End COnstraint

function setCookie(cname, cvalue, exsecs) {
  var d = new Date();
  d.setTime(d.getTime() + (exsecs * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}

export function saveData(key, value) {
  if(typeof value === "object") {
    value = JSON.stringify(value);
  }
  if(typeof Storage !== "undefined" && !useCookie) {
    //Use sessionStorage
    sessionStorage.setItem(key, value);
    return true;
  } else {
    if(document) {
      //Use Cookie
      setCookie(key, value, expireSecs);
      return true;
    }
    //Storing failed, rollback to internal state
    return false;
  }
}

export function getData(key) {
  if(typeof Storage !== "undefined" && !useCookie) {
    return sessionStorage.getItem(key);
  } else {
    if(document) {
      return getCookie(key);
    }
    return false;
  }
}
