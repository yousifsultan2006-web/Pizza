document.getElementById("pizza-form").onsubmit = () => {
    
    clearErrors();
    
    let isValid = true;

    //Validate first name
    let firstName = document.getElementById("fname").value.trim();
    if(!firstName){
        document.getElementById("err-fname").style.display = "block";
        isValid = false;
    }
    //validate last name
    let LastName = document.getElementById("lname").value.trim();
    if(!LastName){
        document.getElementById("err-lname").style.display = "block";
        isValid = false; }
    //validate email
        let email = document.getElementById("email").value.trim();
        if(!email){
        document.getElementById("err-email").style.display = "block";
        isValid = false;}
    //validate pizza size
    let size = document.getElementById("size").value.trim();
        if(size == "none"){
        document.getElementById("err-size").style.display = "block";
        isValid = false;}

    //validate pick up or delivery



        let pickup = document.getElementById("pickup");
        let delivery = document.getElementById("delivery");

        if(!pickup.checked && !delivery.checked) {
            document.getElementById("err-method").style.display = "block";
            isValid = false;
        }

    return isValid;

        
    }


function clearErrors(){
    let errors = document.getElementsByClassName("err");
    for(let err of errors){
        err.style.display = "none";
    }
};
