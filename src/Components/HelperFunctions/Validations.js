import * as EmailValidator from 'email-validator';
var splcharformat = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
var emailformat = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"][a-z]{1,})$/i;
emailformat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,254}$/;
emailformat = /^(([^<>()/\[\]\\.,;:\s@"]+(\.[^<>()/\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,253}))$/
emailformat = /^(([^<>()/\[\]\\.#!%$‘&+*-/=?^_`.{|}~,;:\s@"]+([.#!%$‘&+*-/=?^_`.{|}~][^<>()/\[\]\\.#!%$‘&+*-/=?^_`.{|}~,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,253}))$/
emailformat = /^(([^<>()/\[\]\\.#!%$‘&+*-/=?^_`.{|}~,;:\s@"]+([.#!%$‘&+*-/=?^_`.{|}~][^<>()/\[\]\\.#!%$‘&+*-/=?^_`.{|}~,;:\s@"]+)*)|(".+"))\-?\@[a-zA-Z]+((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,253}))$/

//(.|#|!|%|$|&|[+]|[*]|-|[/]|[=]|[?]|[^]|_|`|{|}|~)
var numberformat = /\d/;
var spaceformat = /\s/;
var dotformat = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;

export function validateFirstName(data)
{
// console.log('entered',data,numberformat.test(data))
    let err=""
    if(data=="")
    err = "Name must be 3 to 25 letters long"
    else if(spaceformat.test(data) && numberformat.test(data) && splcharformat.test(data))
    err += "Name must not contain special characters or numbers or space"
    else if(spaceformat.test(data) && splcharformat.test(data))
    err += "Name must not contain space or special characters"
    else if(splcharformat.test(data) && numberformat.test(data))
    err += "Name must not contain special characters or numbers"
    else if(spaceformat.test(data) && numberformat.test(data))
    err += "Name must not contain numbers or space"
    else if(numberformat.test(data))
    err += "Name must not contain numbers"
    else if(splcharformat.test(data))
    err += "Name must not contain special characters"
    else if(spaceformat.test(data))
    err += "Name must not contain space"
    else if(data?.length <3) 
    err += "Name too short"
    else if(data?.length > 25)
    err += "Name too long"
    
    return err;

}


export function validateGender(data)
{
    if(data == "") 
    return "Must select a gender"
    else
    return ""
}


export function validateGrade(data)
{
    if(data == "") 
    return "Must select a grade"
    else
    return ""
}

export function validateUsername(data)
{
    if(data.length<4 || data.length>10) 
    return "Username must be 4 to 10 letters long"
    else
    return ""
}

export function validateEmail(data)
{
    let d=data?.split("@");
    //console.log(d,d[0].length,d[0].length>=64)
    if(data?.includes("@") && d[0].length>=64)
    return "Please enter a valid email address"
    else if(emailformat.test(data)) 
    return ""
    else
    return "Please enter a valid email address"
}

export function validatePassword(data)
{
    if(data?.match(/[a-z]/g) && data?.match(
        /[A-Z]/g) && data?.match(
        /[0-9]/g) && data?.match(
        /[^a-zA-Z\d]/g) && 
        splcharformat.test(data) && 
        !spaceformat.test(data) && data?.length >= 8) 
    return ""
    else if(spaceformat.test(data))
    return "Password must not contain space"
    else
    return "Password must be minimum 8 characters long and must contain 1 lowercase, 1 uppercase ,1 special character and 1 number"
}

export function validatePhone(data)
{   
    if(data!="" && !numberformat.test(data))
    {
        return "Phone number must contain only digits"
    }
    else if(data!="" && data.length!=10) 
    {
        return "Phone number must have 10 digits"
    }
    else
    return ""
}

export function validateSchool(data)
{
    if(data=="")
    return ""
    else if(spaceformat.test(data))
    return "School Name must not contain space"
    else if(dotformat.test(data))
    return "School Name must not contain special characters"
    else if(numberformat.test(data))
    return "School Name must not contain numbers"
    else
    return ""
}


