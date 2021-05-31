var splcharformat = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
var emailformat = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
var numberformat = /\d+/g;
var spaceformat = /\s+/g;

export function validateFirstName(data)
{
    if(data=="")
    return "Name must be 3 to 25 letters long"
    else if(spaceformat.test(data))
    return "Name must not contain space"
    else if(splcharformat.test(data))
    return "Name must not contain special characters"
    else if(numberformat.test(data))
    return "Name must not contain numbers"
    else if(data.length <3) 
    return "Name too short"
    else if(data.length > 25)
    return "Name too long"
    else
    return ""

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
    if(emailformat.test(data)) 
    return ""
    else
    return "Please enter a valid email address"
}

export function validatePassword(data)
{
    if(data.match(/[a-z]/g) && data.match(
        /[A-Z]/g) && data.match(
        /[0-9]/g) && data.match(
        /[^a-zA-Z\d]/g) && data.length >= 8) 
    return ""
    else
    return "Password must be atleast 8 letters long and must contain atleat 1 lowercase, 1 uppercase and 1 digit"
}

export function validatePhone(data)
{
    if(data!="" && !numberformat.test(data))
    return "Phone number must contain only digits"
    else if(data!="" && data.length!=10) 
    return "Phone number must have 10 digits"
    else
    return ""
}

export function validateSchool(data)
{
    if(data!="" && splcharformat.test(data))
    return "School name must not contain special characters"
    else
    return ""
}


