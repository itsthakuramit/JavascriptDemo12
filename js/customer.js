function getAllCustomers(){

    const http = new XMLHttpRequest();
    http.open('GET', 'http://localhost:3000/customers');
    http.send()

    http.onreadystatechange = () =>{
    
        if( http.readyState === 4){
            var response = JSON.parse(http.response);
            console.log(response)
        }

        var custlist = '';

        response.forEach(customer => {
            
        custlist += `<tr>
            <td><strong id="id-inp">${customer.id}</strong></td>
            <td><input type="text" value="${customer.customername}" id="name-${customer.id}"/></td>
            <td><input type="text" value="${customer.emailid}" id="email-${customer.id}"/></td>
            <td><input type="button" onclick="removeCustomer('${customer.id}')" value="Delete" /></td>
            <td><input type="button" onclick="updateCustomer('${customer.id}')" value="Update" /></td>
            </tr>`

            
        });

        document.getElementById("clist").innerHTML = 
        `<table border=\"2\">
            <tr>
                <td>CustomerId</td>
                <td>Customername</td>
                <td>Contact</td>
            </tr>
            ${custlist}
        </table>`;

    }
}
getAllCustomers()


function addCustomer(){
 
     let newCustomer = {
        "id": 0,
        "customername": "",
        "emailid": ""      
     }
 
     newCustomer.id = document.getElementById("id").value;
     newCustomer.customername = document.getElementById("name").value;
     newCustomer.emailid = document.getElementById("contact").value;

     console.log(newCustomer);

     const http = new XMLHttpRequest();
     http.open('POST','http://localhost:3000/customers');
     http.setRequestHeader("Content-Type","application/json");
     http.send(JSON.stringify(newCustomer));

     http.onreadystatechange = () =>{

        if( http.readyState === 4){
            getAllCustomers();
            clearForm();
        }
     }

}

function clearForm(){
    document.getElementById("id").value='';
    document.getElementById("name").value='';
    document.getElementById("contact").value='';
}


function removeCustomer(customerid){

    const http = new XMLHttpRequest();
    http.open('DELETE', `http://localhost:3000/customers/${customerid}`);
    http.send();

    http.onreadystatechange = () =>{

        if( http.readyState === 4){
            getAllCustomers();
        }
    }
}

function updateCustomer(id){
    customerName = document.getElementById(`name-${id}`).value;
    customerEmail = document.getElementById(`email-${id}`).value;

    updateJson=`{"id":${id}, "customername":${customerName}, "emailid":${customerEmail}}`
    console.log(updateJson)
    const http=new XMLHttpRequest();
    http.open('PUT',`http://localhost:3000/customers/${id}`)
    http.setRequestHeader("Content-Type","application/json");
    http.send(updateJson)

    http.onreadystatechange=() =>{
        if( http.readyState === 4){
            getAllCustomers();
        }
    }
}