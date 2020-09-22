$('.dropdown-menu a').click(function () {
    $(this).closest('li').find('.caret').text($(this).text());
});

// var ret_json = { name: { 0: "", 1: "", 2: "" }, user: { 0: "", 1: "", 2: "" }, view: { 0: "", 1: "", 2: "" }, date: { 0: "", 1: "", 2: "" }, premium: { 0: "" } };
var ret_json = { Name: { 0: "", 1: "", 2: "" }, User: { 0: "", 1: "", 2: "" }, Views: { 0: "", 1: "", 2: "" }, Date: { 0: "", 1: "", 2: "" }, Premium: { 0: "" } };
// var display_components = { Name: { 0: "", 1: "", 2: "" }, User: { 0: "", 1: "", 2: "" }, Views: { 0: "", 1: "", 2: "" }, Date: { 0: "", 1: "", 2: "" }, Premium: { 0: "" } };
var components = {}
var name_no = -1;
var user_no = -1;
var view_no = -1;
var date_no = -1;
var premium_no = -1;
var creteria1 = ""
var index_query = ""
var creteria2 = ""
var creteriaValue = ""
var final_input = []
var temp_built = 0;
var selecta = 0;
var selectb = 0;
var current_index = 0;
$('#creteria').on("change", " .columnSelector", (e) => {
    // alert(e)
    if ($('.columnSelector').val() == 'Name') {

        if (name_no < 2) {
            name_no += 1;
            $('#creteria').empty()
            $('#creteria').append(`<select class="btn  btn-dark form-control  columnSelector col-sm-2 " data-index=0 autocomplete="off"style="width:90px">
            <option > Query</option>
            <option selected="selected">Name</option>
            <option >User</option>
            <option>Views</option>
            <option>Date</option>
            <option>Premium</option>
        </select>`);
            $('#creteria').append(`<select class="btn  btn-dark form-control col-sm-2 " id="columnCriteria" data-index=0 autocomplete = "off" style = "width:90px" >                <option selected="selected">Have</option>                <option>End with</option>                <option>Start with</option>                <option>dont contain</option>                </select >`)
            $('#creteria').append(` <input class="form-control rangeKeyword col" data-index=0 autocomplete="off" placeholder="Type keyword..." />`)
            update_display()
        }
        temp_built = 1;
        current_index = name_no;
    }
    else if ($('.columnSelector').val() == 'User') {

        if (user_no < 2) {
            user_no += 1;
            $('#creteria').empty()
            $('#creteria').append(`<select class="btn  btn-dark form-control  columnSelector col-sm-2 " data-index=0 autocomplete="off"style="width:90px">
            <option > Query</option>
            <option >Name</option>
            <option selected="selected">User</option>
            <option>Views</option>
            <option>Date</option>
            <option>Premium</option>
        </select>`);
            $('#creteria').append(`<select class="btn  btn-dark form-control col-sm-2 " id="columnCriteria" data-index=0 autocomplete = "off" style = "width:90px" >
            <option selected="selected">More than</option>
            <option>Less than</option>
            <option>Equal to</option>
            </select >`)
            $('#creteria').append(` <input class="form-control rangeKeyword col" data-index=0 autocomplete="off" placeholder="Enter a whole number...."/>`)
            update_display()
        }
        temp_built = 1;
        current_index = user_no;
    }

    else if ($('.columnSelector').val() == 'Views') {

        if (view_no < 2) {
            view_no += 1;
            $('#creteria').empty()
            $('#creteria').append(`<select class="btn  btn-dark form-control  columnSelector col-sm-2 " data-index=0 autocomplete="off"style="width:90px">
            <option > Query</option>
            <option >Name</option>
            <option >User</option>
            <option selected="selected">Views</option>
            <option>Date</option>
            <option>Premium</option>
        </select>`);
            $('#creteria').append(`<select class="btn  btn-dark form-control col-sm-2 " id="columnCriteria" data-index=0 autocomplete = "off" style = "width:90px" >
            <option selected="selected">More than</option>
            <option>Less than</option>
            <option>Equal to</option>
            </select >`)
            $('#creteria').append(` <input class="form-control rangeKeyword col" data-index=0 autocomplete="off" placeholder="Enter a whole number...."/>`)
            update_display()
        }
        temp_built = 1;
        current_index = view_no;
    }

    else if ($('.columnSelector').val() == 'Premium') {

        if (premium_no < 2) {
            premium_no += 1;
            $('#creteria').empty()
            $('#creteria').append(`<select class="btn  btn-dark form-control  columnSelector col-sm-2" data-index=0 autocomplete="off"style="width:90px">
            <option > Query</option>
            <option >Name</option>
            <option >User</option>
            <option>Views</option>
            <option>Date</option>
            <option  selected="selected" >Premium</option>
            </select>`);

            $('#creteria').append(`<select class="btn  btn-dark form-control col-sm-2 " id="inputCreteria__1" onchange ="premium_update()" data-index=0 autocomplete = "off" style = "width:90px" >
            <option selected='selected'>select</option>
            <option >Present</option>
            <option>Not Present</option>
            </select >`)
            $('#creteria').append(` <input class="form-control rangeKeyword col" data-index=0 autocomplete="off" placeholder="Just select a option" disabled='disabled'/>`)
            update_display()
        }
        temp_built = 1;
        current_index = premium_no;
    }
    else if ($('.columnSelector').val() == 'Date') {

        if (date_no < 2) {
            date_no += 1;
            $('#creteria').empty()
            $('#creteria').append(`<select class="btn  btn-dark form-control  columnSelector col-sm-2 " data-index=0 autocomplete="off"style="width:90px">
            <option > Query</option>
            <option >Name</option>
            <option >User</option>
            <option>Views</option>
            <option selected="selected">Date</option>
            <option>Premium</option>
        </select>`);
            $('#creteria').append(`<select class="btn  btn-dark form-control col-sm-2 " id="columnCriteria" data-index=0 autocomplete = "off" style = "width:90px" >
            <option selected="selected">After</option>
            <option>Before</option>
            <option>On</option>
            </select >`)
            $('#creteria').append(` <input type="date" class="form-control rangeKeyword col" data-index=0 autocomplete="off" placeholder="Enter Valid date..."/>`)
            update_display()
        }
        temp_built = 1;
        current_index = date_no;
    }


})

function premium_update() {
    if ($('#inputCreteria__1').val() == "Present") { ret_json.Premium = { 0: 'Premium' } }
    else if ($('#inputCreteria__1').val() == "Not Present") { ret_json.Premium = { 0: 'Not Premium' } }
    // ret_json.Premium = { 0: $('#inputCreteria__1').val() }
    // alert(JSON.stringify(ret_json))
    $('#creteria').empty()
    $('#creteria').append(` <select class="btn  btn-dark form-control columnSelector col-sm-2" data-index=0
    autocomplete="off">
    <option selected="selected"> Query</option>
    <option>Name</option>
    <option>User</option>
    <option>Views</option>
    <option>Date</option>
    <option>Premium</option>
</select>
<input class="form-control rangeKeyword col" data-index=0 autocomplete="off" placeholder=" Search Through Keyword...." />`);
    temp_built = 0
    update_display();

}

$('#creteria').on("change", " .rangeKeyword", (e) => {
    request_kind = 0;
    var dat = $('.rangeKeyword').val()
    $('#rangeKeyword').val("")
    if (temp_built == 1) {
        // alert(temp_built)
        var datt = $('#columnCriteria').val()
        ret_json[$('.columnSelector').val()][current_index] = {}
        ret_json[$('.columnSelector').val()][current_index][datt] = dat;
        // alert(12)
        $('#creteria').empty()
        $('#creteria').append(` <select class="btn  btn-dark form-control columnSelector col-sm-2" data-index=0
        autocomplete="off">
        <option selected="selected"> Query</option>
        <option>Name</option>
        <option>User</option>
        <option>Views</option>
        <option>Date</option>
        <option>Premium</option>
    </select>
    <input class="form-control rangeKeyword col" data-index=0 autocomplete="off" placeholder=" Search Through Keyword...." />`);
        temp_built = 0
        update_display();
        // alert(JSON.stringify(ret_json))
    }
})


bootStrop_type = ['success', 'dark', 'warning', 'info', 'secondary']

function update_display() {

    var p = 0;
    var index = 0;
    var z = 0;
    for (const prop in ret_json) {

        if (prop !== 'Premium') {
            var elem = ret_json[prop];
            for (const temp in elem) {
                var data1 = elem[temp]
                if (data1 !== "")
                    $('#creteria').prepend(` 
                    <div class=" col-sm-2  alert alert-` + bootStrop_type[parseInt(Math.random() * (3.9 - 0))] + ` alert-dismissible fade show" >
                    <strong style="font-size: small;">` + Object.values(data1) + `</strong>
                     <button type="button" class="close pr-2 clossing_btn" id ="404"  data-z=` + z + ` style="top:-8px;" ><span aria-hidden="true">&times;</span></button></div>`)
                z++;
            }
        }
        else {
            // alert(JSON.stringify(ret_json.Premium['0'] == ""))
            if (ret_json.Premium[0] !== "") { $('#creteria').prepend(` <div class=" col-sm-2  alert alert-` + bootStrop_type[parseInt(Math.random() * (3.9 - 0))] + ` alert-dismissible fade show" ><strong style="font-size: small;">` + ret_json.Premium[0] + `</strong> <button type="button" class="close pr-2 clossing_btn"  id ="404"  data-z=` + z + ` ><span aria-hidden="true">&times;</span></button></div>`) }
            z++;
        }

    }
    $('.clossing_btn').click(function (e) {
        var z = $(this).attr('data-z')
        for (i in ret_json) {
            p = ret_json[i]
            for (a in p) {
                if (z == 0) { ret_json[i][a] = ""; }
                z--;
            }
        }
        $(this).closest('div').remove();
        // alert(JSON.stringify(ret_json))
    });

}


function tableCreater(data) {
    var Table_content = `<table class="table">            
                        <thead>                
                            <tr>
                                <th scope="col">Index</th>
                                <th scope="col">Name</th>
                                <th scope="col">Views</th>                    
                                <th scope="col">User</th>                    
                                <th scope="col">Last Updated</th>                    
                                <th scopt="col">Premium Available</th>                
                            </tr>            
                        </thead><tbody>`;
    var row = 1;
    for (var i = 0; i < data.length; i++, row++)
        Table_content += `<tr><th scope="row">` + row + `</th><td>` + data[row - 1].name + `</td><td>` + data[row - 1].views + `</td><td>` + data[row - 1].user + `</td> <td>` + data[row - 1].lastUpdate + `</td> <td>` + data[row - 1].premiumAvailable + `</td></tr>`;
    Table_content += `</tbody></table>`
    return Table_content
}

const xhttp = new XMLHttpRequest;
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        $('#tableDetails').empty()

        data = JSON.parse(xhttp.response)
        $('#tableDetails').append(tableCreater(data));

        $('#creteria').empty()
        $('#creteria').append(` <select class="btn  btn-dark form-control columnSelector col-sm-2" data-index=0 
        autocomplete="off">
        <option selected="selected"> Query</option>
        <option>Name</option>
        <option>User</option>
        <option>Views</option>
        <option>Date</option>
        <option>Premium</option>
    </select>
    <input class="form-control rangeKeyword col" data-index=0 autocomplete="off" placeholder=" Search Through Keyword...."/>`);
        temp_built = 0
        update_display();


    }
};


$('#searchBtn').click(() => {
    x = ret_json
    stringRep = JSON.stringify(x)
    encoded = window.btoa(stringRep)
    // alert(stringRep)
    xhttp.open('GET', '/dbQuery?query=' + encoded, true);
    xhttp.send(JSON.stringify(ret_json));
    ret_json = { Name: { 0: "", 1: "", 2: "" }, User: { 0: "", 1: "", 2: "" }, Views: { 0: "", 1: "", 2: "" }, Date: { 0: "", 1: "", 2: "" }, Premium: { 0: "" } };
    update_display()
})
