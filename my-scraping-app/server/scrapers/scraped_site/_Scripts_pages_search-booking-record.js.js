(function ($) {
    $("#criteriaSearch").keyup(function (e) {
        if (e.which == 13) {
            $('#btnSearchBRecord').trigger('click');
        }
    });
    $('#recordSearchLink').click(function () {
        $('#search-brecord-dlg').dialog();
        if (typeof app !== "undefined") {
            app.resizeIframe(0, 0);
        }
    });

    $('#btnSearchBRecord').bind('click', function () {
        var searchMessage = "";
        if ($("#criteriaSearch").val() == "") {
            searchMessage += "Vui lòng nhập thông tin tìm kiếm.";
        }
        var requestUrl = null;
        if ($("#IframeRequestUrl").val() != null && $("#IframeRequestUrl").val() != "") {
            requestUrl = $("#IframeRequestUrl").val();
            requestUrl = requestUrl.substring(0, requestUrl.lastIndexOf("/"));
            requestUrl = requestUrl + "/bookingrecord-result";
        }
        //if ($('#BookingRecordCode').val().length > 0) {
        var domain = $('#url-redirect').val();
        if (searchMessage.toString().length <= 0) {
            var criteriaSearch = $('#criteriaSearch').val();
            $.ajax({
                url: domain + '/Home/SearchBookingRecord',
                type: 'POST',
                data: { criteriaSearch: criteriaSearch, requestUrl: requestUrl },
                success: function (response) {
                    if (response.Success) {
                        if (requestUrl != null) {
                            var data = "bRecordCode=" + criteriaSearch + "&email=&handleType=BookSearchResult";
                            window.top.postMessage(data, requestUrl);
                        }
                        else {
                            //window.location = response.Url;
                            location.href = `${getLanguageRouting(URLs.bookingConfirmUrl)}/` + criteriaSearch;
                        }
                    } else {
                        $('.search-msg').text(response.Message);
                    }
                }
            });
        }
        if (searchMessage.length > 0) {
            $('.search-msg').html(searchMessage);
        }
    });
})(jQuery);