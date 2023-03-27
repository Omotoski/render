/*Authors: Zach Walton
*          Ireoluwa Omotoso
* Student IDs: 100826058
*              100849367
* Date Completed: 01-30-2023
* */
"use strict";

(function(){

    function AjaxRequest(method, url, callback){
        //STEP 1
        let xhr = new XMLHttpRequest();

        //STEP 2
        xhr.addEventListener("readystatechange", () => {

            if(xhr.readyState === 4 && xhr.status === 200){

                if(typeof callback === "function"){
                    callback(xhr.responseText);
                }else{
                    console.error("Error: Please provide a valid function for callback")
                }
            }
        });

        //STEP 3
        xhr.open(method, url);

        //STEP 4
        xhr.send();

    }

    function LoadHeader(data){
        $("header").html(data);
        $(`li>a:contains(${document.title})`.addClass("active"));
        CheckLogin();
    }

    function DisplayHomePage(){
        console.log("Display Home Page Called!");

        AjaxRequest("GET", "header.html", LoadHeader);

        $("#AboutUsBtn").on("click", () =>{
            location.href = "about.html"
        });


        $("main").append(`<p id="MainParagraph" class = "mt-3">This is the main paragraph</p>`)

        $("body").append()(`<article class="container"><p id "ArticleParagraph" class "mt-3">This is my private article</p></article>`)

        let MainParagraph = document.createElement("p");

        MainParagraph.setAttribute("id", "MainParagraph");
        MainParagraph.setAttribute("class","mt-3");
        MainParagraph.textContent = "This is the main paragraph!";

        MainContent.appendChild(MainParagraph);

        let FirstString = "This is";
        let SecondString = `${FirstString} the main paragraph (using Template String)`
        MainParagraph.textContent=SecondString;

        let Article = document.createElement("article");
        let ArticleParagraph = `<p id="ArticleParagraph" class="mt-3">This is my private article</p>`
        Article.setAttribute("class","container");
        Article.innerHTML = ArticleParagraph;
        document.body.appendChild(Article);
    }

    function DisplayProductsPage(){
        console.log("Display Products Page Called!");

    }

    function DisplayServicesPage(){
        console.log("Display Services Page Called!");

    }


    function DisplayAboutUsPage(){
        console.log("Display About Us Page Called!");

    }

    function DisplayContactPage() {
        console.log("Display Contact Page Called!");

        let sendButton = document.getElementById("sendButton");

     sendButton.addEventListener("click", function (event)
        {
            let contact = new Contact(fullName.value, contactNumber.value, emailAddress.value, notes.value)
            console.log(contact.toString());
            setTimeout(function(){
                DisplayHomePage();
            }, 3000);
        });
    }

    function DisplayContactListPage(){
        console.log("Contact List Page Called!");

    }

    function DisplayEditPage(){
        console.log("Edit Page Called!");

    }

    function DisplayRegisterPage(){
        console.log("Register Page Called!");

        let $registerForm = $('#registerForm');

        $(document).ready(function() {
            $registerForm.submit(function(e){
                e.preventDefault(e);

            });
        });

        let valid = true;



        let ErrorMessage = $("#ErrorMessage");
        ErrorMessage.hide();

        let firstName = $registerForm.find('input[name="firstName"]');
        let lastName = $registerForm.find('input[name="lastName"]');

        let email = $registerForm.find('input[name="emailAddress"]');

        let password = $registerForm.find('input[name="password');
        let confirmPassword = $registerForm.find('input[name="comfirmPassword');


        if(lastName.length < 2 || firstName.length < 2){
            ErrorMessage.display();
            ErrorMessage.text('First name and Last name must have a length of at least 2 characters.');
            valid = false;
        }

        if(email.length < 8 || email.indexOf('@') === -1){
            ErrorMessage.display();
            ErrorMessage.text('Email invalid! All emails must follow standard email format and contain 8 or more characters');
            valid = false;
        }

        if(password.value() !== confirmPassword.value()){
            ErrorMessage.display();
            ErrorMessage.text('Passwords do not match! Please ensure your password and confirm password match!');
            valid = false;
        } else if (password.length() < 6){
            ErrorMessage.display();
            ErrorMessage.text('Password too short! Password must be at least 6 characters long!');
            valid = false;
        }

        $("#submitButton").on("click", function() {
            if (valid) {
                User(lastName, email, firstName, password);
            }
        });

    }

    function DisplayLoginPage(){
        console.log("Login Page Called!");

        let messageArea = $("#messageArea");
        messageArea.hide();

        $("#loginButton").on("click", function(){

            let success = false;
            let newUser = new core.User();

            $.get("./data/user.json", function(data){

                for(const u of data.users){

                    if(username.value === u.Username && password.valueOf === u.password){
                        success = true;
                        newUser.fromJSON(u);
                        break;
                    }

                }

                if(success){
                    sessionStorage.setItem("user", newUser.serialize());
                    messageArea.removeAttribute("class").hide();
                    location.href = "contact-list.html"
                }else{
                    //fail auth
                    $("#username").trigger("focus").trigger("select")
                    messageArea.addClass("alert alert-danger").text("Error, failed to authenticate, " +
                        "please check your credentials")
                }

            });
        });

        $("#cancelButton").on("click", function() {
            document.forms[0].reset();
            location.href = "index.html";
        })
    }


    function CheckLogin(){
        if (sessionStorage.getItem("user")){
            $("#login").html(`<a id="logout" class="nav-link" href = "#">
                <i class="fa-solid fa-sign-out-alt"></i>Logout</a>`)
        }

        $("#logout").on("click", function(){
            sessionStorage.clear();
            location.href="index.html";
        });
    }

    function Start(){
        console.log("Application Started!");

        AjaxRequest("GET", "header.html", LoadHeader)
        switch(document.title)
        {
        case "Homepage":
            DisplayHomePage();
            break;
        case "Our Products":
            DisplayProductsPage();
            break;
        case "About Me":
            DisplayAboutUsPage();
            break;
        case "Services":
            DisplayServicesPage();
            break;
        case "Contact Us":
            DisplayContactPage();
            break;
        case "Contact List":
            DisplayContactListPage();
            break;
        case "Edit Contact":
            DisplayEditPage();
            break;
        case "Register":
            DisplayRegisterPage();
            break;
        case "Login":
            DisplayLoginPage();
            break;

        }
    }
    window.addEventListener("load",Start)
})();
