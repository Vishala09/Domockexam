export function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    //d.setTime(d.getTime() + (exdays*24*60*60*1000));
    //let expires = "expires="+ d.toUTCString();
    let expires = "expires="+ exdays;
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

export function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  export function deleteUserCookies()
  {
                document.cookie = 'domockexamToken' + '=;';
                document.cookie = 'domockexamUsername' + '=;';
                document.cookie = 'domockexamID' + '=;';
                document.cookie = 'domockexamUserID' + '=;';
                document.cookie = 'domockexamUserType' + '=;';

                document.cookie = 'domockexamStudentData' + '=;';
                document.cookie = 'domockexamParentChildrenData' + '=;';



                // document.cookie = 'domockexamFirstName' + '=;';
                // document.cookie = 'domockexamLastName' + '=;';
                // document.cookie = 'domockexamDistrict' + '=;';
                // document.cookie = 'domockexamInstitution' + '=;';
                // document.cookie = 'domockexamLanguageKnown' + '=;';
                
                // document.cookie = 'domockexamChildFirstName' + '=;';
                // document.cookie = 'domockexamChildLastName' + '=;';
                // document.cookie = 'domockexamChildDistrict' + '=;';
                // document.cookie = 'domockexamChildInstitution' + '=;';
                // document.cookie = 'domockexamChildLanguageKnown' + '=;';
                // document.cookie = 'domockexamChildUsername' + '=;';
                // document.cookie = 'domockexamChildID' + '=;';
                // document.cookie = 'domockexamChildUserID' + '=;';
                // document.cookie = 'domockexamChildUserType' + '=;';

                console.log('logout')
                window.location.reload();
  }