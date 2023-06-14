
function passwordValidation( password ) {
    if ( password.search( /^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/gm ) ) return false
    return true
}

function firstnameValidation( name ) {
    if ( name.search( /^[A-za-z]/gm ) ) return false
    return true
}

function lastnameValidation( name ) {
    if ( name.search( /^[A-Z](?!\s)[a-z]*((\W)?[A-Z][a-z]+)*$/gm ) ) return false
    return true
}

function inputValidation( name ) {
    if ( name.search( /^(\w|\s|[-.]){1,10}/gm ) ) return false
    return true
}

// function emailValidation( a ) {
//     return true
// }
// const validation = { passwordValidation, firstnameValidation, lastnameValidation }
export { passwordValidation, firstnameValidation, lastnameValidation, inputValidation }