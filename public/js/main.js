var fetch = function (searchKeyword) {
     var searchKeyword= searchKeyword+"20%";
    var url = "http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.12.0&SECURITY-APPNAME=DvirEdri-Newwebsi-PRD-87a9d82e9-42cefc72&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords="+searchKeyword+"phoenix&paginationInput.entriesPerPage=2";
    
    $.ajax({
        method: "GET",
        url: url,
        success: function (data) {
            console.log(data)
         $("#loader").addClass("hide");
        },

        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
            $("#loader").addClass("hide");

        }

    });

};


$('.compare-btn').on("click", function () {
    var searchKeyword = $('.compare-input').val();
    fetch(searchKeyword);

});