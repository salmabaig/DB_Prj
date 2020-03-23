$(document).ready(function(){
    message = ""
    $('#homeComponent').hide();
    $('#homeComponentAgent').hide();
    $('#AddRentalComp').hide();
    $('#AddSaleComp').hide();
    $('#listRental').hide();
    $('#listSaleDiv').hide();
    $('#deleteProp').hide();
    $('#listRentFave').hide();
    $('#listSaleFave').hide();
    $('#listCustDiv').hide();
    $('#searchbox').hide();
    $('#findRent').hide();
    $('#findSale').hide();
    $('#addToFave').hide();
    $('#Login').on('click', function() {
        $.ajax({
            url: '/login',
            data: $('#formLogin').serialize(),
            type: 'POST',
            success: function(response) {
                console.log(response);
                console.log("checking");
                if(response.auth === true){

                    localStorage.setItem('userdata', JSON.stringify(response.user));
                    if($( '#loginComponent' ).is(":visible")){
                        $('#loginComponent').hide();

                        $('#homeComponent').show();
                    }

                    else{
                        $('#homeComponent').show();
                    }

                }else{

                    if(response.auth === "User does not exist")
                    {
                        $('#errorMessageLogin').text('User Does not Exist');
                    }
                    else{
                        alert("false");
                        $('#errorMessageLogin').text('Incorrect email and/or password.');
                    }
                }
            },
            error: function(error) {
                console.log(error);
                if(response.auth === "User does not exist")
                    {
                        $('#errorMessageLogin').text('User Does not Exist');
                    }
                    else{
                        $('#errorMessageLogin').text('Incorrect email and/or password.');
                    }
            }
        });
    });

    $('#LoginAgent').on('click', function() {
        $.ajax({
            url: '/loginAgent',
            data: $('#formLoginAgent').serialize(),
            type: 'POST',
            success: function(response) {
                console.log(response);
                console.log("checking");
                if(response.auth === true){
                    localStorage.setItem('userdataAgent', JSON.stringify(response.userAgent));
                    if($( '#loginComponent' ).is(":visible")){
                        $('#loginComponent').hide();
                        $('#homeComponent').hide();
                        $('#homeComponentAgent').show();
                    }

                    else{
                        $('#homeComponent').hide();
                        $('#homeComponentAgent').show();
                    }

                }else{

                    if(response.auth == "User does not exist")
                    {
                        $('#errorMessageLoginAgent').text('User Does not Exist');
                    }
                    else{
                        alert("false");
                        $('#errorMessageLoginAgent').text('Incorrect email and/or password.');
                    }
                }
            },
            error: function(error) {
                console.log(error);
                if(response.auth === "User does not exist")
                    {
                        $('#errorMessageLoginAgent').text('User Does not Exist');
                    }
                    else{
                        $('#errorMessageLoginAgent').text('Incorrect email and/or password.');
                    }
            }
        });
    });

    $('#Register').on('click', function() {
        $.ajax({
            url: '/register',
            data: $('#formRegister').serialize(),
            type: 'POST',
            success: function(response) {
                console.log(response);
                if(response.registered === "Wrong Password")
                {
                    $('#errorMessageReg').text('Non-Matching Passwords!')
                }
                else{
                if(response.registered === true){
                    $('#myForm').trigger("reset");
                    $('#errorMessageReg').text('Registration successful!')
                }else{
                    $('#errorMessageReg').text('Username Exists, please reenter')
                }}
            },
            error: function(error) {
                console.log(error);
            }
        });
    });

    $('#AddRental').on('click', function() {
        $('#AddRentalComp').show();
        $('#listRental').hide();
        $('#AddSaleComp').hide();
        $('#deleteProp').hide();
        $('#listSaleDiv').hide();
        $('#listCustDiv').hide();
        $('#searchbox').hide();
        $('#findRent').hide();
        $('#findSale').hide();
        $('#addToFave').hide();
    });

    $('#AddSale').on('click', function() {
        $('#AddRentalComp').hide();
        $('#listRental').hide();
        $('#AddSaleComp').show();
        $('#deleteProp').hide();
        $('#listSaleDiv').hide();
        $('#listCustDiv').hide();
        $('#searchbox').hide();
        $('#findRent').hide();
        $('#findSale').hide();
        $('#addToFave').hide();
    });

    $('#logoutC').on('click', function() {
        $('#homeComponent').hide();
        $('#homeComponentAgent').hide();
        $('#AddRentalComp').hide();
        $('#AddSaleComp').hide();
        $('#listRental').hide();
        $('#deleteProp').hide();
        $('#listRentFave').hide();
        $('#listSaleFave').hide();
        $('#listSaleDiv').hide();
        $('#listCustDiv').hide();
        $('#searchbox').hide();
        $('#findRent').hide();
        $('#findSale').hide();
        $('#addToFave').hide();
        $('#loginComponent').show();
        localStorage.clear();
    });

    $('#logoutA').on('click', function() {
        $('#homeComponent').hide();
        $('#homeComponentAgent').hide();
        $('#AddRentalComp').hide();
        $('#AddSaleComp').hide();
        $('#listRental').hide();
        $('#deleteProp').hide();
        $('#listRentFave').hide();
        $('#listSaleDiv').hide();
        $('#listCustDiv').hide();
        $('#searchbox').hide();
        $('#findRent').hide();
        $('#findSale').hide();
        $('#loginComponent').show();
        $('#addToFave').hide();
        localStorage.clear();
    });

    $('#deleteProb').on('click', function() {
        $('#AddRentalComp').hide();
        $('#listRental').hide();
        $('#AddSaleComp').hide();
        $('#listSaleDiv').hide();
        $('#listCustDiv').hide();
        $('#searchbox').hide();
        $('#findRent').hide();
        $('#findSale').hide();
        $('#addToFave').hide();
        $('#deleteProp').show();
    });

    $('#addFave').on('click', function() {
        $('#AddRentalComp').hide();
        $('#listRental').hide();
        $('#AddSaleComp').hide();
        $('#listSaleDiv').hide();
        $('#listCustDiv').hide();
        $('#searchbox').hide();
        $('#findRent').hide();
        $('#findSale').hide();
        $('#addToFave').show();
        $('#listRentFave').hide();
        $('#listSaleFave').hide();
    });

$('#AddFaveButton').on('click', function() {
       let curA = JSON.parse(localStorage.getItem('userdata'));
        console.log("Current customer: ", curA.cust_id)
        let temp = {
            cust_id : curA.cust_id,
            listNo : $('#addfavelistNum').val()
        };
        $.ajax({
            url: '/addFave',
            data: temp,
            type: 'POST',
            success: function(response)
            {
                console.log(response);
                if(response.addedFave === true)
                {
                    $('#errorMessageFave').text('Addition successful!')
                    alert('Successful Addition!');
                    $('#addToFave').hide();
                }
                else
                {
                    $('#errorMessageFave').text('Wrong list #.')
                }
            },
            error: function(error) {
                console.log(error);
            }
        });
    });

    $('#custView').on('click', function() {
        $('#AddRentalComp').hide();
        $('#listRental').hide();
        $('#AddSaleComp').hide();
        $('#listSaleDiv').hide();
        $('#deleteProp').hide();
        $('#searchbox').hide();
        $('#findRent').hide();
        $('#findSale').hide();
        $('#addToFave').hide();
        $('#listCustDiv').show();
        let currentA = JSON.parse(localStorage.getItem('userdataAgent'));
        console.log("Current Agent: ", currentA.username)
        let temp = {
            username : currentA.username,
            agent_id : currentA.agent_id
        };
        if (temp) {
            $.ajax({
                url: '/listCust',
                data: temp,
                type: 'GET',
                success: function(response) {
                    console.log(response);
                    if(response.valid === true)
                    {
                    console.log(response.eventsSale)
                    console.log("First element: ")
                    console.log(response.eventsSale[0][0])
                    $('#eventTableListCustBody').empty();
                    localStorage.setItem('usereventsSale', JSON.stringify(response.eventsSale))
                    response.eventsSale.forEach(function(val){

                        $('#eventTableListCustBody').append("<tr><td>" + val[0] + "</td><td>" + val[1] + "</td><td>" + val[2] + "</td><td>" + val[3] + "</td><td>" + val[4] + "</td><td>" + val[5] + "</td><td>" + val[6] + "</td><td>" + val[7] + "</td></tr>")
                    })
                    }
                    else{
                        message = "Sorry, no customers found assigned to you."
                        $('#eventTableListCustBody').empty();
                        $('#listCustError').text(message)
                    }
                },
                error: function(error) {
                    console.log(error);
                    $('#eventTableListCustBody').empty();
                    $('#eventTableListCustBody').append("<tr><td>" + message + "</td></tr>")
                }
            });
        }
        else {
            $('#eventTableListCustBody').empty();
          $('#listCustError').text(message)
        }
    });

    $('#delPropButton').on('click', function() {
    let curA = JSON.parse(localStorage.getItem('userdataAgent'));
        console.log("Current Agent: ", curA.agent_id)
        let temp = {
            agent_id : curA.agent_id,
            listNo : $('#del-listNum').val()
        };
        $.ajax({
            url: '/delProp',
            data: temp,
            type: 'POST',
            success: function(response)
            {
                console.log(response);
                if(response.deleted === true)
                {
                    $('#errorMessageDel').text('Deletion successful!')
                    alert('Successful Deletion!');
                    $('#deleteProp').hide();
                }
                else
                {
                    $('#errorMessageDel').text('Wrong list #.')
                }
            },
            error: function(error) {
                console.log(error);
            }
        });
    });

    $('#listSale').on('click', function() {
        $('#AddRentalComp').hide();
        $('#AddSaleComp').hide();
        $('#listRental').hide();
        $('#deleteProp').hide();
        $('#listCustDiv').hide();
        $('#searchbox').hide();
        $('#findRent').hide();
        $('#findSale').hide();
        $('#addToFave').hide();
        $('#listSaleDiv').show();
        let currentA = JSON.parse(localStorage.getItem('userdataAgent'));
        console.log("Current Agent: ", currentA.username)
        let temp = {
            username : currentA.username,
            agent_id : currentA.agent_id
        };
        if (temp) {
            $.ajax({
                url: '/listSale',
                data: temp,
                type: 'GET',
                success: function(response) {
                    console.log(response);
                    if(response.valid === true)
                    {
                    console.log(response.eventsSale)
                    console.log("First element: ")
                    console.log(response.eventsSale[0][0])
                    $('#eventTableListSaleBody').empty();
                    localStorage.setItem('usereventsSale', JSON.stringify(response.eventsSale))
                    response.eventsSale.forEach(function(val){

                        $('#eventTableListSaleBody').append("<tr><td>" + val[6] + "</td><td>" + val[0] + "</td><td>" + val[1] + "</td><td>" + val[3] + "</td><td>" + val[2] + "</td><td>" + val[4] + "</td><td>" + val[5] + "</td><td>" + val[7] + "</td><td>" + val[8] + "</td><td>" + val[9] + "</td><td>" + val[11] + "</td><td>" + val[12] + "</td><td>" + val[13] + "</td></tr>")
                    })
                    }
                    else{
                        $('#eventTableListSaleBody').empty();
                        $('#listSaleError').text(message)
                    }
                },
                error: function(error) {
                    console.log(error);
                    $('#eventTableListSaleBody').empty();
                    $('#eventTableListSaleBody').append("<tr><td>" + message + "</td></tr>")
                }
            });
        }
        else {
            $('#eventTableBody').empty();
          $('#listError').text(message)
        }
    });

    $('#faveSale').on('click', function() {
        $('#listSaleFave').show();
        $('#searchbox').hide();
        $('#listRentFave').hide();
        $('#findSale').hide();
        $('#findRent').hide();
        $('#addToFave').hide();
        let currentC = JSON.parse(localStorage.getItem('userdata'));
        console.log("Current customer: ", currentC.username)
        let temp = {
            username : currentC.username,
            cust_id : currentC.cust_id
        };
        if (temp) {
            $.ajax({
                url: '/listSaleFave',
                data: temp,
                type: 'GET',
                success: function(response) {
                    console.log(response);
                    if(response.valid === true)
                    {
                    console.log(response.events)
                    console.log("First element: ")
                    console.log(response.events[0][0])
                    $('#eventTableBodylikesFaveSale').empty();
                    localStorage.setItem('userevents', JSON.stringify(response.events))
                    response.events.forEach(function(val){

                        $('#eventTableBodylikesFaveSale').append("<tr><td>" + val[6] + "</td><td>" + val[0] + "</td><td>" + val[1] + "</td><td>" + val[3] + "</td><td>" + val[2] + "</td><td>" + val[4] + "</td><td>" + val[5] + "</td><td>" + val[7] + "</td><td>" + val[8] + "</td><td>" + val[9] + "</td><td>" + val[11] + "</td><td>" + val[12] + "</td><td>" + val[13] + "</td><td>" + val[14] + "</td></tr>")
                    })
                    }
                    else{
                        $('#eventTableBodylikesFaveSale').empty();
                        $('#listfaveSaleError').text(message)
                    }
                },
                error: function(error) {
                    console.log(error);
                    $('#eventTableBodylikesFaveSale').empty();
                    $('#eventTableBodylikesFaveSale').append("<tr><td>" + message + "</td></tr>")
                }
            });
        }
        else {
            $('#eventTableBodylikesFave').empty();
          $('#listfaveRentError').text(message)
        }
    });

    $('#faveRent').on('click', function() {
        $('#listRentFave').show();
        $('#searchbox').hide();
        $('#findRent').hide();
        $('#listSaleFave').hide();
        $('#findSale').hide();
        $('#addToFave').hide();
        let currentC = JSON.parse(localStorage.getItem('userdata'));
        console.log("Current customer: ", currentC.username)
        let temp = {
            username : currentC.username,
            cust_id : currentC.cust_id
        };
        if (temp) {
            $.ajax({
                url: '/listRentFave',
                data: temp,
                type: 'GET',
                success: function(response) {
                    console.log(response);
                    if(response.valid === true)
                    {
                    console.log(response.events)
                    console.log("First element: ")
                    console.log(response.events[0][0])
                    $('#eventTableBodylikesFave').empty();
                    localStorage.setItem('userevents', JSON.stringify(response.events))
                    response.events.forEach(function(val){

                        $('#eventTableBodylikesFave').append("<tr><td>" + val[6] + "</td><td>" + val[0] + "</td><td>" + val[1] + "</td><td>" + val[3] + "</td><td>" + val[2] + "</td><td>" + val[4] + "</td><td>" + val[5] + "</td><td>" + val[7] + "</td><td>" + val[8] + "</td><td>" + val[9] + "</td><td>" + val[11] + "</td><td>" + val[12] + "</td><td>" + val[13] + "</td></tr>")
                    })
                    }
                    else{
                         $('#eventTableBodylikesFave').empty();
                        $('#listfaveRentError').text(message)
                    }
                },
                error: function(error) {
                    console.log(error);
                    $('#eventTableBodylikesFave').empty();
                }
            });
        }
        else {
            $('#eventTableBodylikesFave').empty();
          $('#listfaveRentError').text(message)
        }
    });

    $('#listRent').on('click', function() {
        $('#AddRentalComp').hide();
        $('#AddSaleComp').hide();
        $('#listRental').show();
        $('#deleteProp').hide();
        $('#searchbox').hide();
        $('#findRent').hide();
        $('#listSaleDiv').hide();
        $('#listCustDiv').hide();
        $('#findSale').hide();
        $('#addToFave').hide();
        let currentA = JSON.parse(localStorage.getItem('userdataAgent'));
        console.log("Current Agent: ", currentA.username)
        let temp = {
            username : currentA.username,
            agent_id : currentA.agent_id
        };
        if (temp) {
            $.ajax({
                url: '/listRental',
                data: temp,
                type: 'GET',
                success: function(response) {
                    console.log(response);
                    if(response.valid === true)
                    {
                    console.log(response.events)
                    console.log("First element: ")
                    console.log(response.events[0][0])
                    $('#eventTableBody').empty();
                    localStorage.setItem('userevents', JSON.stringify(response.events))
                    response.events.forEach(function(val){

                        $('#eventTableBody').append("<tr><td>" + val[6] + "</td><td>" + val[0] + "</td><td>" + val[1] + "</td><td>" + val[3] + "</td><td>" + val[2] + "</td><td>" + val[4] + "</td><td>" + val[5] + "</td><td>" + val[7] + "</td><td>" + val[8] + "</td><td>" + val[9] + "</td><td>" + val[11] + "</td></tr>")
                    })
                    }
                    else{
                        $('#eventTableBody').empty();
                        $('#listError').text(message)
                    }
                },
                error: function(error) {
                    console.log(error);
                    $('#eventTableBody').empty();
                    $('#eventTableBody').append("<tr><td>" + message + "</td></tr>")
                }
            });
        }
        else {
            $('#eventTableBody').empty();
          $('#listError').text(message)
        }
    });


    $('#submitRental').on('click', function(){
    let userAgent = JSON.parse(localStorage.getItem('userdataAgent'));
    console.log("Address : ", $('#add-address').val())
    let tempForm = {
            username: userAgent.username,
            id : userAgent.agent_id,
            password : userAgent.password,
            addAddress : $('#add-address').val(),
            addCity : $('#add-city').val(),
            addState : $('#add-state').val(),
            addZipcode : $('#add-zipcode').val(),
            addBedroom : $('#add-bedroom').val(),
            addBathroom : $('#add-bathroom').val(),
            addYear : $('#add-year').val(),
            addType : $('#add-type').val(),
            addOccNum : $('#add-occNum').val(),
            addPrice : $('#add-price').val(),
            addArea : $('#add-area').val(),
            addPet : $('#add-pet').val(),
            addLeaseType : $('#add-leaseType').val(),
            addDescrip : $('#add-descrip ').val(),
            addVacDate : $('#add-vacDate ').val()
        };

    $.ajax({
            url: '/addRental',
            data: tempForm,
            type: 'POST',
            success: function(response) {
                console.log(response);
                if(response.addedrental === true){
                    $('#myForm').trigger("reset");
                    $('#errorMessageAddRent').text('Property Added.')
                    //alert('Property Added')
                    $('#AddRentalComp').hide();
                }else{
                    $('#errorMessageAddRent').text('Error')
                }
            },
            error: function(error) {
                console.log(error);
                $('#errorMessageAddRent').text('Error')
            }
        });
    })

    $('#submitSale').on('click', function(){
    let suserAgent = JSON.parse(localStorage.getItem('userdataAgent'));
    console.log("Address : ", $('#add-saddress').val())
    let tempForm = {
            susername: suserAgent.username,
            sid : suserAgent.agent_id,
            spassword : suserAgent.password,
            addsAddress : $('#add-saddress').val(),
            addsCity : $('#add-scity').val(),
            addsState : $('#add-sstate').val(),
            addsZipcode : $('#add-szipcode').val(),
            addsBedroom : $('#add-sbedroom').val(),
            addsBathroom : $('#add-sbathroom').val(),
            addsYear : $('#add-syear').val(),
            addsType : $('#add-stype').val(),
            addsYearTax : $('#add-yearTax').val(),
            addsPrice : $('#add-sprice').val(),
            addsArea : $('#add-sarea').val(),
            addsDescrip : $('#add-descrip ').val(),
            addlastSold : $('#add-lastSold ').val()
        };

    $.ajax({
            url: '/addSale',
            data: tempForm,
            type: 'POST',
            success: function(response) {
                console.log(response);
                if(response.addedsale === true){
                    $('#myForm').trigger("reset");
                    $('#errorMessageAddSale').text('Property Added.')
                    //alert('Property Added')
                    $('#AddSaleComp').hide();
                }else{
                    $('#errorMessageAddSale').text('Error')
                }
            },
            error: function(error) {
                console.log(error);
                $('#errorMessageAddSale').text('Error')
            }
        });
    })

    // $('#EventSubmit').on('click', function() {
    //     $.ajax({
    //         url: '/newEvent',
    //         data: $('#newEventForm').serialize(),
    //         type: 'POST',
    //         success: function(response) {
    //             console.log(response);
    //         },
    //         error: function(error) {
    //             console.log(error);
    //         }
    //     });
    // });

// IGNORE BELOW CODE, TO USE AS REFERENCE **********************************

    $('#PopulateTable').on('click', function() {
        getTable();
    });

    $('#EventSubmit').on('click', function() {
        let user = JSON.parse(localStorage.getItem('userdata'));
        let tempForm = {
            email: user.email,
            eventName: $('#eventName').val(),
            eventTime: $('#eventTime').val(),
            eventUrl: $('#eventUrl').val()
        };
        console.log(tempForm)
        $.ajax({
            url: '/newEvent',
            data: tempForm,
            type: 'POST',
            success: function(response) {
                console.log(response);
                if(response.newEventStatus === true){
                    console.log('Event submit successful')
                    $('#eventName').val("");
                    $('#eventTime').val("");
                    $('#eventUrl').val("");
                    $('#errorMessageNewEvent').text('Success!')
                    $('#eventTableBody').append("<tr><td>" + tempForm.eventName + "</td><td>" + tempForm.eventTime + "</td><td>" + tempForm.eventUrl + "</td></tr>")
                }else{
                    $('#errorMessageNewEvent').text('Event submittal failed. Try again.')
                }
            },
            error: function(error) {
                console.log(error);
            }
        });
    });

    function populateUser(){
        let user = JSON.parse(localStorage.getItem('userdata'));
        console.log(user)
        $('#greeting').append(user.firstName)
    }

    function getTable(){
        tempuser = localStorage.getItem('userdata');
        let parseduser;
        if (tempuser) {
            parseduser = JSON.parse(tempuser);
            let email = parseduser.email;
            console.log(email)
            $.ajax({
                url: '/getEvents',
                data: {
                    temp: email
                },
                contentType: 'application/json',
                dataType: 'json',
                type: 'GET',
                success: function(response) {
                    console.log(response);
                    // $('#PopulateTable').hide();
                    $('#eventTableBody').empty();
                    localStorage.setItem('userevents', JSON.stringify(response.events))
                    response.events.forEach(function(val){
                        $('#eventTableBody').append("<tr><td>" + val.eventName + "</td><td>" + val.eventTime + "</td><td>" + val.eventUrl + "</td></tr>")
                    })
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }
    }
});

function selectPop(arrCols, arrTypes) {
    let space = document.getElementById("dropdown1");
    let q = '"';
    let opts = "<div class='form-group'><label for='cols'>Choose Column</label><select id='cols' onclick='getParams()' class='form-control'><option value='empty' onclick='clr()'> </option>";
    for (let i = 0; i < arrCols.length; i++) {
        opts += "<option value='" + arrTypes[i] + "'>" + arrCols[i] + "</option>";
    }
    opts += "</select></div>";
    space.innerHTML = opts;
}

function clr() {
    let space = document.getElementById("dropdown2")
    space.innerHTML = "";
}

function getParams() {
    let cols = document.getElementById("cols");
    let si = cols.options[cols.selectedIndex].value;
    let space = document.getElementById("dropdown2");
    let opts = "";
    if (si == "i") {
        opts += "<div class='form-group'><select class='form-control' id='relation'>"
        let ineqs = ['less than', 'less than or equal to', 'equal to', 'greater than or equal to', 'greater than'];
        let symb = ['<', '<=', '=', '>=', '>'];
        for (let i = 0; i < ineqs.length; i++) {
            opts += "<option value='" + symb[i] + "'>" + ineqs[i] + "</option>";
        }
        opts += "</select></div>";
    } else {
        opts += "<p>equal to</p>";
    }
    opts += "<div class='form-group'><input class='form-control' id='targetVal' placeholder='Value'></div><button class='btn btn-primary' onclick='addCriteria()'>Add Criteria</button>";
    space.innerHTML = opts;
}

function ineqs(txt) {
    switch (txt) {
        case "equal to":
            return "=";
            break;
        case "greater than or equal to":
            return ">=";
            break;
        case "less than or equal to":
            return "<=";
            break;
        case "greater than":
            return ">";
            break;
        case "less than":
            return "<";
            break;
        default:
            return "";
    }
}

let qers = [];

function addCriteria() {
    let col = $("#cols").find(":selected").text();
    let rel = "";
    let st = false;
    rel = $("#relation").find(":selected").text();
    if (rel == "" || rel == undefined) {
        rel = "equal to";
        st = true;
    }
    let trgt = $("#targetVal").val();
    console.log(trgt);
    if (!st) {
        trgt = parseFloat(trgt)
        if (trgt == "" || trgt == undefined || trgt == NaN) {
            $("#params").append('<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Invalid value</strong> used <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
            return;
        }
    }
    $("#params").append('<p>' + col + ' ' + rel + ' ' + trgt + '</p>');
    $("#cols").val('empty');
    qers.push([col, rel, trgt]);
    clr();
}

let bigQuery = "";

function search(rent) {
    let props = ["ADDRESS", "BEDROOM", "BATHROOM", "YEAR_BUILT", "HOUSE_TYPE", "ZIPCODE"];
    let other = "h";
    bigQuery = "";
    if (rent) {
        bigQuery += "SELECT p.listing_no, p.address, p.zipcode, p.bedroom, p.bathroom, p.house_type, p.area, r.price, r.vacancy_date ";
        bigQuery += "FROM rental as r, property as p ";
        bigQuery += "WHERE p.LISTING_NO=r.LISTING_NUM ";
        other = "r";
    } else {
        bigQuery += "SELECT p.listing_no, p.address, p.zipcode, p.bedroom, p.bathroom, p.area, p.house_type, h.price, h.last_sold, h.yearly_tax ";
        bigQuery += "FROM homes_for_sale as h, property as p ";
        bigQuery += "WHERE p.LISTING_NO=h.LISTING_NO ";
    }
    let smallQuery = ""
    for (i = 0; i < qers.length; i++) {
        if(props.includes(qers[i][0])){
            smallQuery = "p."+ qers[i][0];
        }else{
            smallQuery = other+"."+ qers[i][0];
        }
        smallQuery+=ineqs(qers[i][1]);
        smallQuery+=qers[i][2];
        bigQuery += " AND " + smallQuery;
    }
    bigQuery+=";";
    console.log(qers);
    console.log(bigQuery);

    let temp = {
            query : bigQuery
        };

    $.ajax({
            url: '/search',
            data: temp,
            type: 'GET',
            success: function(response) {
                console.log(response);
                if(response.valid){
                    console.log("It Came back");
                    console.log(response.data);
                    $('#searchbox').hide();
                    if(rent){
                        $('#findRent').show();
                        response.data.forEach(function(val){
                        $('#searchRentTable').append("<tr><td>" + val[0] + "</td><td>" + val[1] + "</td><td>" + val[2] + "</td><td>" + val[3] + "</td><td>" + val[4] + "</td><td>" + val[5] + "</td><td>" + val[6] + "</td><td>" + val[7] + "</td><td>" + val[8] + "</td></tr>")
                    })
                    }
                    else{

                    $('#findSale').show();
                        response.data.forEach(function(val){
                        $('#searchSaleTable').append("<tr><td>" + val[0] + "</td><td>" + val[1] + "</td><td>" + val[2] + "</td><td>" + val[3] + "</td><td>" + val[4] + "</td><td>" + val[5] + "</td><td>" + val[6] + "</td><td>" + val[7] + "</td><td>" + val[8] + "</td><td>" + val[9] + "</td></tr>")
                    })

                    }

                }
            },
            error: function(error) {
                console.log(error);
            }
        });
}

function clrParams(qers) {
    document.getElementById("params").innerHTML = "";
    qers = [];
    clr();
}

function searchRent() {
    $("#searchbox").show();
    $('#listRentFave').hide();
    $('#listSaleFave').hide();
    $('#findRent').hide();
    $('#findSale').hide();
    $('#addToFave').hide();
    clrParams();
    document.getElementById("searchButton").setAttribute('onclick', 'search(true)');
    selectPop(["PRICE", "PET_ALLOW", "LEASE_TYPE", "OCCUP_NUM", "ADDRESS", "BEDROOM", "BATHROOM", "YEAR_BUILT", "HOUSE_TYPE", "ZIPCODE"], ["i", "s", "s", "i", "s", "i", "i", "i", "s", "s"]);
}

function searchSale() {
    $("#searchbox").show();
    $('#listRentFave').hide();
    $('#listSaleFave').hide();
    $('#findRent').hide();
    $('#findSale').hide();
    $('#addToFave').hide();
    clrParams();
    document.getElementById("searchButton").setAttribute('onclick', 'search(false)');
    selectPop(["PRICE", "YEARLY_TAX", "ADDRESS", "BEDROOM", "BATHROOM", "YEAR_BUILT", "HOUSE_TYPE", "ZIPCODE"], ["i", "i", "s", "i", "i", "i", "s", "s"]);
}