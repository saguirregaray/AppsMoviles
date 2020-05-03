$(document).ready(function () {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/person/findAll',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            $('#result').text(JSON.stringify(data));
        },
        error: function (response) {
            console.log("Request Failed");
        }
    });

})



//open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security