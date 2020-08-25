$('.dropdown-menu a').click(function () {
    $(this).closest('li').find('.caret').text($(this).text());
});

var ret_json = { name: { 0: "", 1: "", 2: "" }, user: { 0: "", 1: "", 2: "" }, view: { 0: "", 1: "", 2: "" }, date: { 0: "", 1: "", 2: "" }, premium: { 0: 1 } };
var display_components = { name: { 0: "", 1: "", 2: "" }, user: { 0: "", 1: "", 2: "" }, view: { 0: "", 1: "", 2: "" }, date: { 0: "", 1: "", 2: "" }, premium: { 0: "" } };
var components = {}
var name_no = 0;
var user_no = 0;
var view_no = 0;
var date_no = 0;

const serialize = function (obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

function associate_input_query() {
    $('.nameCri').change(function (e) {
        var selection = $(this).children("option:selected").val();
        var index = $(this).attr('data-index');
        update_criteria('name', selection, index);
    });

    $('.inputName').change(function (e) {
        var data = $(this).val();
        var index = $(this).attr('data-index');
        update_criteria_value('name', data, index);
    })

    $('.viewCri').change(function (e) {
        var selection = $(this).children("option:selected").val();
        var index = $(this).attr('data-index');
        update_criteria('view', selection, index);
    });

    $('.inputView').change(function (e) {
        var data = $(this).val();
        var index = $(this).attr('data-index');
        update_criteria_value('view', data, index);
    })


    $('.userCri').change(function (e) {
        var selection = $(this).children("option:selected").val();
        var index = $(this).attr('data-index');
        update_criteria('user', selection, index);
    });

    $('.inputUser').change(function (e) {
        var data = $(this).val();
        var index = $(this).attr('data-index');
        update_criteria_value('user', data, index);
    })

    $('#premiumtoggle').change(function () {
        ret_json.premium[0] = $(this).prop('checked')
    })

    $('.dateCri').change(function (e) {
        var selection = $(this).children("option:selected").val();
        var index = $(this).attr('data-index');
        update_criteria('date', selection, index);
    });
    $('.inputDate').change(function (e) {
        var data = $(this).val();
        var index = $(this).attr('data-index');
        update_criteria_value('date', data, index);
    })


}
function update_criteria(type, value, index) {
    if (type == 'date') {
        if (value == 'Between') {
            $('#secondDate').prop('disabled', false)
        } else
            $('#secondDate').prop('disabled', true)
    }
    var json_ret = {}
    if ($('.input_' + type).val() !== "" && $('.input_' + type).val() !== undefined) {
        update_display(type, index, value, $('.input_' + type).val())
    }

    json_ret[String(value)] = $('.input_' + type).val() || "";
    ret_json[type][index] = json_ret;

}

$('#secondDate').prop("disabled", true);

function update_criteria_value(type, data, index) {

    var json_ret = {};
    var value = Object.keys(ret_json[type][index])[0] || $('#' + type + 'Group > div:nth-child(' + index + 1 + ') > div:nth-child(2) > div  > select').children('option:selected').val() || $('#' + 'name' + 'Group > div:nth-child(' + index + 1 + ') > div:nth-child(2) > div >select >option:eq(0)').val();
    json_ret[String(value)] = data;
    ret_json[type][index] = json_ret;
    update_display(type, index, value, data)
    // alert(type,index,value,data)
}

bootStrop_type = ['success', 'dark', 'warning', 'info', 'secondary']

function update_display(type, index, value, data) {
    display_components[type][index] = { value: data };
    var p = 0;
    var index = 0;
    $('#keyword_holder0').empty()
    $('#keyword_holder1').empty()
    var o = 0;
    var z = 0;
    for (const prop in ret_json) {

        if (prop !== 'premium') {
            // alert(JSON.stringify(ret_json))
            var elem = ret_json[prop];

            for (const temp in elem) {
                // alert(JSON.stringify(elem[]))
                var data1 = elem[temp]


                if (data1 !== "") {

                    $('#keyword_holder' + parseInt(index / 3) % 2).append(` <div class=" col-sm-3  alert alert-` + bootStrop_type[parseInt(Math.random() * (3.9 - 0))] + ` alert-dismissible fade show" style="margin: 2px;">
                    <strong style="font-size: small;">`+ Object.values(data1) + `</strong> <button type="button" class="close pr-2 clossing_btn"  id ="404" data-o=` + o + ` data-z=` + z + ` 
                      >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>`)
                    p = (1 + p) % 4;
                    index += 1;
                }
                z++;
            }

        }

        o++;
    }
    $('.clossing_btn').click(function (e) {
        var z = $(this).attr('data-z')
        for (i in ret_json) {
            p = ret_json[i]
            for (a in p) {
                // console.log(ret_json[, p, a)
                if (z == 0) { ret_json[i][a] = ""; }
                z--;
            }
        }
        $(this).closest('div').remove();
        alert(JSON.stringify(ret_json))
    });
}



function add_tab(type) {

    if (type == 'name') {
        if (name_no < 2) {
            name_no += 1;
            $('#nameGroup').append(`<div class="row m-2"><div class="col-sm-1">Name</div><div class="col-sm-2"><div class="form-group">    <select class="form-control nameCri" data-index=` + name_no + ` autocomplete="off">        <option selected="selected">Have</option>        <option>End with</option>        <option>Start with</option>        <option>dont contain</option>    </select></div></div><div class="col-sm-8"><input class="form-control input_name inputName" data-index=` + name_no + `></div></div>`)
        }
    }
    else if (type == 'user') {
        if (user_no < 2) {
            user_no += 1;
            $('#userGroup').append(` <div class="row m-1"><div class="col-sm-1">User</div><div class="col-sm-2"><div class="form-group">    <select class="form-control  userCri " data-index=` + user_no + ` autocomplete="off">        <option selected="selected">More than</option>        <option>Less than with</option>        <option>Equal to</option>        </select></div></div><div class="col-sm-8"><input class="form-control inputUser input_user" data-index=` + user_no + ` autocomplete="off"></div></div>`)
        }
    }
    else if (type == 'view') {
        if (view_no < 2) {
            view_no += 1;
            $('#viewGroup').append(`<div class="row m-2"><div class="col-sm-1">    Views</div><div class="col-sm-2">    <div class="form-group">        <select class="form-control viewCri" id="view_1" data-index=` + view_no + ` autocomplete="off" >                <option selected="selected">More than</option>                 <option>Less than</option>                <option>Equal to</option>            <!-- <option>4</option> -->        </select>    </div></div><div class="col-sm-8">    <input class="form-control input_view inputView" data-index=` + view_no + `></div></div>`)
        }
    }
    setTimeout(associate_input_query, 10);

}

$('.add_nm').click(() => { add_tab('name') });
$('.add_view').click(() => { add_tab('view') });
$('.add_user').click(() => { add_tab('user') });


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
    }
};

var request_kind = 0;

$('#searchBtn').click(() => {
    if (request_kind == 1) {
        x = ret_json
        stringRep = JSON.stringify(x)
        encoded = window.btoa(stringRep)
        // alert(stringRep)
        xhttp.open('GET', '/dbQuery?query=' + encoded, true);
        xhttp.send(JSON.stringify(ret_json));
    }
    else {
        // alert($('#smallString').val())
        encoded = window.btoa($('#smallString').val())
        xhttp.open('GET', '/smQuery?query=' + encoded, true);
        xhttp.send(JSON.stringify(ret_json));
    }
})

$('#Advance').click(() => {

    // alert($('#wrapper').css('display')==='none')
    if ($('#wrapper').css('display') === 'none') {
        $('#wrapper').css('display', 'block');
        request_kind = 1;
    }
    else {
        request_kind = 0;
        $('#wrapper').css('display', 'none');
    }
})
associate_input_query();
