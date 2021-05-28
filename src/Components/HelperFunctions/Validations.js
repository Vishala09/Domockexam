var splcharformat = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
var emailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        
export function validateFirstName(data)
{
    if(data.length <3 || data.length > 25 || splcharformat.test(data)) 
    return true
    else
    return false
}

export function validateSurname(data)
{
    if(data.length <3 || data.length > 25 || splcharformat.test(data)) 
    return true
    else
    return false
}

export function validateGender(data)
{
    if(data == "") 
    return true
    else
    return false
}


export function validateGrade(data)
{
    if(data == "") 
    return true
    else
    return false
}

export function validateUsername(data)
{
    if(data.length<4 || data.length>10) 
    return true
    else
    return false
}

export function validateEmail(data)
{
    if(emailformat.test(data)) 
    return false
    else
    return true
}

export function validatePassword(data)
{
    if(data.match(/[a-z]/g) && data.match(
        /[A-Z]/g) && data.match(
        /[0-9]/g) && data.match(
        /[^a-zA-Z\d]/g) && data.length >= 8) 
    return false
    else
    return true
}

