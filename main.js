// errors
const FIRST_NAME_REQUIRED = 'Please enter your firstName'
const LAST_NAME_REQUIRED =  'Please enter your lastName'
const EMAIL_REQUIRED =  'Please enter your Email'
const PHONE_REQUIRED =  'Please enter your Phone No'
const PASSWORD_REQUIRED =  'Please set your password'
const CONFIRM_PASS_REQUIRED =  'Please confirm password'
const EMAIL_INVALID = 'Please enter valid email'
const PHONE_INVALID = 'Please enter valid phone(IN)'
const PASSWORD_INVALID = "Password: 8+ chars, 1 letter, 1 number"
const CONFIRM_PASS_NOTMATCH = "Password do not match"


  const form = document.forms[0];
  let firstName = form.elements["first_name"];
  let lastName = form.elements["last_name"];
  let email = form.elements["email"];
  let phone = form.elements["phone_number"];
  let password = form.elements["password"];
  let confirmPassword = form.elements["confirm_password"];


  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const isValid =  validateForm(form)
    if(isValid){
        alert('done')
    }
  });

  const validateForm = (elements) => {
     const firstNameValid = hasValue(form.elements["first_name"],FIRST_NAME_REQUIRED)
     const lastNameValid = hasValue(form.elements["last_name"],LAST_NAME_REQUIRED)
     const emailValid = emailValidation(form.elements["email"],EMAIL_REQUIRED,EMAIL_INVALID)
     const phoneValid = phoneValidation(form.elements["phone_number"],PHONE_REQUIRED,PHONE_INVALID)
     const passValid = passwordValidation(form.elements["password"],PASSWORD_REQUIRED,PASSWORD_INVALID)
     const confPassValid = confirmPasswordValidation(form.elements["confirm_password"],password.value,CONFIRM_PASS_REQUIRED,CONFIRM_PASS_NOTMATCH)
      if(firstNameValid && lastNameValid && emailValid 
         && phoneValid && passValid && confPassValid){
            return true
         }else{
            return false
         }
  }

  const emailValidation = (input , requiredMsg , invalidMsg) => {
    if(!hasValue(input,requiredMsg)){
        return false
    }
    const emailRgx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const email = input.value.trim()
    if(!emailRgx.test(email)){
        return showError(input,invalidMsg)
    }
    return true
  }

  const phoneValidation = (input , requiredMsg,invalidMsg) => {
    if(!hasValue(input,requiredMsg)){
        return false
    }
    const phoneRgx =/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
    const phone = input.value.trim()
    if(!phoneRgx.test(phone)){
        return showError(input,invalidMsg)
    }
    return true
  }

  const passwordValidation = (input,requiredMsg,invalidMsg) => {
    if(!hasValue(input,requiredMsg)){
        return false
    }
    const passRgx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    const password = input.value.trim()
    if(!passRgx.test(password)){
        return showError(input,invalidMsg)
    }
    return true
  }

  const confirmPasswordValidation = (input,password,requiredMsg,matchMsg) => {
    if(!hasValue(input,requiredMsg)){
        return false
    }
    const confirmPassword = input.value.trim()
    if(confirmPassword !== password){
        return showError(input,matchMsg)
    }
    return true
  }
  

  const hasValue = (input,message) => {
     if(input.value.trim() === ''){
        return showError(input , message)
     }
     return showSuccess(input)
  }


  const showSuccess = (input) =>{
       return showMessage(input,'',true)
  }

  const showError = (input,message)=>{
      return showMessage(input,message,false)
  }  

  const showMessage = (input,message,type) =>{
    const small = input.parentNode.querySelector('small')
    small.innerText = message
    input.className = type ? 'success' : 'error'
    return type
  }