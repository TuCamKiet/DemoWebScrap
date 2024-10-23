Define("book.search", {
    isLoading: false,
    isMobile: false,
    theme: '',
    countLoadReturnTableForSort: 0,
    countLoadDepartureTableForSort: 0,
    prettyUrlBookingInfo: `${getLanguageRouting(URLs.bookingInfoUrl)}`,
    isDomestic: true,
    load: function (theme) {
        var theme = $('#Theme').val();
        book.search.theme = theme;

        book.search.isMobile = app.isMobile();

        book.search.isDomestic = ($('#IsDomesticFlight').val() != undefined && $('#IsDomesticFlight').val().toLowerCase() === 'true');
        book.search.reloadCollapse($(this).closest('tbody'));
        if (book.search.theme == 'VTrip') {
            $('.searchresults-tbl th[data-sort]').each(function (index, value) {
                if ($(value).find('.arrow').length <= 0) {
                    $(value).append('<span class="arrow arrow-default"><img src="/Content/images/sort_both.png" width="" style="margin-left: 3px"></span>');
                }
            });
        }

        var tableDeparture = $("#tblDepartureFlight").stupidtable({

        });

        var tblReturnFlight = $("#tblReturnFlight").stupidtable({

        });




        tableDeparture.on("aftertablesort", function (event, data) {

            book.search.countLoadDepartureTableForSort++;
            var th = $(this).find("th");
            th.find(".arrow").remove();
            if (book.search.theme == 'VTrip') {
                th = $(this).find("th[data-sort]");
                th.append('<span class="arrow arrow-default"><img src="/Content/images/sort_both.png" width="" style="margin-left: 3px"></span>');
                th = $(this).find("th");
                th.eq(data.column).find('.arrow.arrow-default').remove();

            }


            var dir = $.fn.stupidtable.dir;
            var arrow = data.direction === dir.ASC ? "<img src='/Content/images/arrow-down.png') width='12' style='margin-left: 4px'/>" : "<img src='/Content/images/arrow-up.png') width='12' style='margin-left: 4px'/>";
            th.eq(data.column).append('<span class="arrow">' + arrow + '</span>');
            //book.search.registerDepartureRadio(theme);
            //book.search.registerPopupPolicy();
            if (book.search.theme != 'EnVietQT' && book.search.theme != 'EnViet') {
                //book.search.registerSelectFlightOnFullRow();
            }
            book.search.popUpEco();

            if (book.search.theme == 'HongNgocHa' || book.search.theme == 'HongNgocHa_V2' || book.search.theme == 'Ve247_vn' || book.search.theme == "AirGoGo" || book.search.theme == "Sea" || book.search.theme == "PhuThinh" || book.search.theme == "BaseVeMayBay") {
                if ($('#tblDepartureFlight tr.select-flight .viewinfo.choosed').length > 0) {
                    $('#tblDepartureFlight tr.select-flight .viewinfo.choosed').removeClass('choosed').html('Chi tiết');
                }

                if ($('#tblDepartureFlight tr.select-flight .viewflightinfo.choosed').length > 0) {
                    $('#tblDepartureFlight tr.select-flight .viewflightinfo.choosed').removeClass('choosed').html('Chi tiết');
                }
            }
            if (book.search.theme == 'NamThanh') {
                if ($('#tblDepartureFlight tr.select-flight .viewinfo.choosed').length > 0) {
                    $('#tblDepartureFlight tr.select-flight .viewinfo.choosed').removeClass('choosed').html('Chi tiết');
                }
            }
            //Sort best price of each airline
            if ($('#isDisplayBestPriceOnTop').val() != undefined && $('#isDisplayBestPriceOnTop').val().toLowerCase() == 'true') {
                if (book.search.countLoadDepartureTableForSort <= 2) {
                    book.search.sortBestPriceDepartureFlightsOfAirline();
                }

            }

        });

        tblReturnFlight.on("aftertablesort", function (event, data) {
            book.search.countLoadReturnTableForSort++;
            var th = $(this).find("th");
            th.find(".arrow").remove();
            if (book.search.theme == 'VTrip') {
                th = $(this).find("th[data-sort]");
                th.append('<span class="arrow arrow-default"><img src="/Content/images/sort_both.png" width="" style="margin-left: 3px"></span>');
                th = $(this).find("th");
                th.eq(data.column).find('.arrow.arrow-default').remove();

            }
            var dir = $.fn.stupidtable.dir;

            var arrow = data.direction === dir.ASC ? "<img src='/Content/images/arrow-down.png') width='12' style='margin-left: 4px'/>" : "<img src='/Content/images/arrow-up.png') width='12' style='margin-left: 4px'/>";
            th.eq(data.column).append('<span class="arrow">' + arrow + '</span>');

            //book.search.registerReturnRadio(theme);
            //book.search.registerPopupPolicy();
            if (book.search.theme != 'EnVietQT' && book.search.theme != 'EnViet') {
                //book.search.registerSelectFlightOnFullRow();
            }
            book.search.popUpEco();

            if (book.search.theme == 'HongNgocHa' || book.search.theme == 'NamThanh' || book.search.theme == 'HongNgocHa_V2' || book.search.theme == 'AirGoGo' || book.search.theme == 'Sea' || book.search.theme == 'BaseVeMayBay') {
                if ($('#tblReturnFlight tr.select-flight .viewinfo.choosed').length > 0) {
                    $('#tblReturnFlight tr.select-flight .viewinfo.choosed').removeClass('choosed').html('Chi tiết');
                }

                if ($('#tblReturnFlight tr.select-flight .viewflightinfo.choosed').length > 0) {
                    $('#tblReturnFlight tr.select-flight .viewflightinfo.choosed').removeClass('choosed').html('Chi tiết');
                }
            }


            //Sort best price of each airline
            if ($('#isDisplayBestPriceOnTop').val() != undefined && $('#isDisplayBestPriceOnTop').val().toLowerCase() == 'true') {
                if (book.search.countLoadReturnTableForSort <= 2) {
                    book.search.sortBestPriceReturnFlightsOfAirline();
                }

            }

        });

        $('#orderBy').on('change', function () {
            var value = $('#orderBy').val();
            window.location = "/Booking/SubmitOption?orderBy=" + value;
        });

        //$('#vendorFilter').on('change', function () {
        //    var airlineFilterId = $('#vendorFilter').val().toUpperCase();

        //    $('#tblDepartureFlight > tbody  > tr').each(function () {
        //        if (airlineFilterId == 'ALL' || $(this).attr('data-airline') == airlineFilterId) {
        //            $(this).show();
        //        } else {
        //            $(this).hide();
        //        }
        //    });

        //    $('#tblReturnFlight > tbody  > tr').each(function () {
        //        if (airlineFilterId == 'ALL' || $(this).attr('data-airline') == airlineFilterId) {
        //            $(this).show();
        //        } else {
        //            $(this).hide();
        //        }
        //    });

        //    //window.location = "/Booking/SubmitOption?airlinesFilter=" + value;
        //});

        book.search.loadBookingSummary(book.search.theme);

        //when select day
        $('.art-button, .art-button-active').click(function () {
            //start click
            var vapri;
            var vaday;
            //$('#loading').dialog("open");


            vaday = $(this).attr('title');
            vapri = $($(this).parent()).hasClass('godate') ? 0 : 1;
            _url = "/Booking/GetFlightsByDay";
            datasend = { primary: vapri, time: vaday };
            $.ajax({
                type: "POST",
                url: _url,
                data: JSON.stringify(datasend),
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function (data) {

                    window.location.reload();

                }
            });
            //end ajax
            return false;
        });



        //KET THUC xu ly cho click chi tiet
        ////////////////////////////////////////////////////////////////////////////////

        $('#btnContinue').click(function () {

            var internationalFlight = $(this).attr('data-inter');
            if (internationalFlight == undefined)
                book.search.bookFlight(false);
            else
                book.search.bookFlight(true);
        });

        $('#selectFlightForm').delegate('.btn-book-ticket', 'click', function () {
            var index = $(this).attr('data-value');
            var trTab = $(this).closest('tr.select-flight');
            if ($('#RedirectToBookingInfo').val().toLowerCase() == 'true') {
                var isChecked = trTab.find('input[name*="Selected"]').val().toLowerCase() == 'true';
                if (!isChecked) {
                    trTab.addClass("selected");
                    $('.go-search-list input[name*="Selected"]').val(false);
                    trTab.find('input[name*="Selected"]').val(true);
                }
                else if (book.search.theme == 'Globalink' || book.search.theme == 'Booknow') {
                    trTab.removeClass('selected');
                }
                else {
                    trTab.addClass("selected");
                }
                //if ($('#departureFlights_' + index + '__Selected').length) {
                //    $('#departureFlights_' + index + '__Selected').val(true);
                //}

                //if ($('#returnFlights_' + index + '__Selected').length) {
                //    $('#returnFlights_' + index + '__Selected').val(true);
                //}
                $('input[name="radio_departure"]').prop('checked', false);
                $('input[name="radio_departure"][value="' + index + '"]').prop('checked', true);
                //$('input[name="radio_departure"][value="' + index + '"]').change();
                var internationalFlight = $(this).attr('data-inter');
                if (internationalFlight == undefined)
                    book.search.bookFlight(false);
                else
                    book.search.bookFlight(true);
            }
            else {

                $('input[name="radio_departure"]').prop('checked', '');
                $('input[name="radio_departure"][value="' + index + '"]').prop('checked', true);
                //$('input[name="radio_departure"][value="' + index + '"]').change(); // force to call onchange event to re-calculate booking summary
                var radioButtons = $(':input[name="radio_departure"]:checked');

                for (var i = 0; i < radioButtons.length; i++) {

                    //if (radioButtons[i].checked) {
                    book.search.updatePriceBookingSummary(trTab, 1);
                    var internationalFlight = $(this).attr('data-inter');
                    if (internationalFlight != undefined && $('#Route').val() == 2) {
                        book.search.updatePriceBookingSummary(trTab, 0);
                    }
                    break;
                    //}
                }

                $('#tblDepartureFlight tr td div').removeClass("selected");
                $(this).parent().parent().addClass("selected");
            }

        });
        //$('.btn-book-ticket').click(function () {
        //    var index = $(this).attr('data-value');

        //    $('.go-search-list input[name*="Selected"]').val(false);
        //    if ($('#departureFlights_' + index + '_Selected').length) {
        //        $('#departureFlights_' + index + '_Selected').val(true);
        //    }

        //    if ($('#returnFlights_' + index + '_Selected').length) {
        //        $('#returnFlights_' + index + '_Selected').val(true);
        //    }
        //    var internationalFlight = $(this).attr('data-inter');
        //    $('#tblDepartureFlight tr td div').removeClass("selected");
        //    $(this).parent().parent().addClass("selected");
        //    if ($('#RedirectToBookingInfo').val().toLowerCase() == 'true') {
        //        if (internationalFlight == undefined)
        //            book.search.bookFlight(false);
        //        else
        //            book.search.bookFlight(true);
        //    }

        //});

        $('#clicktieptuc').click(function () {
            var tongcongroutno = $(':input[name="radio_departure"]:checked').size()
                + $(':input[name="radio_return"]:checked').size();

            var chophepdi = 0;
            //KHI CLICK NUT CHON di
            var routeNo = 0;
            var departureCity = "";
            var arrivalCity = "";
            var airline = "";
            var departureDate = "";
            var departureTime = "";
            var arrivalTime = "";
            var seatClass = "";
            var flightNo = "";
            var totalFare = "";
            var ticket = "";

            if ($('#flightgo').find(':input[name="radio_departure"]:checked').size() != 0) {
                // alert('success')
                var $departureAnchor = $('#flightgo').find(':input[name="radio_departure"]:checked').parent().find("div.hiddeninfo");
                routeNo++;
                departureCity = $departureAnchor.find('input.DepartureCityCode').val();
                arrivalCity = $departureAnchor.find('input.ArrivalCityCode').val();
                departureDate = $departureAnchor.find('input.DepartureDate').val();
                departureTime = $departureAnchor.find('input.DepartureTime').val();
                arrivalTime = $departureAnchor.find('input.ArrivalTime').val();
                airline = $departureAnchor.find('input.Airline').val();
                flightNo = $departureAnchor.find('input.FlightNo').val();
                seatClass = $departureAnchor.find('input.bestseat').val();
                totalFare = $departureAnchor.find('input.bestprice').val();
                ticket = "9";

                //ajax
                var url = "/Booking/BookFlight";
                var datasend = { DepartureCity: departureCity, ArrivalCity: arrivalCity, Airline: airline, DepartureDate: departureDate, SeatClass: seatClass, FlightNo: flightNo, RouteNo: routeNo, DepartureTime: departureTime, Arrivaltime: arrivalTime, Totalfare: totalFare, Ticket: ticket };
                $.ajax({
                    type: "POST",
                    url: url,
                    data: JSON.stringify(datasend),
                    dataType: "json",
                    contentType: "application/json;charset=utf-8",
                    success: function (data) {
                        chophepdi++;
                        if (tongcongroutno == chophepdi) {
                            window.location.href = book.search.prettyUrlBookingInfo;
                        }
                    }
                });
                //end ajax
            }
            if ($('#flightback').find(':input[name="radio_return"]:checked').size() != 0) {
                // alert('success')
                var $arrivalAnchor = $('#flightback').find(':input[name="radio_return"]:checked').parent().find('div.hiddeninfo');
                routeNo++;
                departureCity = $arrivalAnchor.find('input.DepartureCityCode').val();
                arrivalCity = $arrivalAnchor.find('input.ArrivalCityCode').val();
                departureDate = $arrivalAnchor.find('input.ArrivalDate').val();
                departureTime = $arrivalAnchor.find('input.DepartureTime').val();
                arrivalTime = $arrivalAnchor.find('input.ArrivalTime').val();
                airline = $arrivalAnchor.find('input.Airline').val();
                flightNo = $arrivalAnchor.find('input.FlightNo').val();
                seatClass = $arrivalAnchor.find('input.bestseat').val();
                totalFare = $arrivalAnchor.find('input.bestprice').val();
                ticket = "9";

                //ajax
                url = "/Booking/BookFlight";
                datasend = { DepartureCity: departureCity, ArrivalCity: arrivalCity, Airline: airline, DepartureDate: departureDate, SeatClass: seatClass, FlightNo: flightNo, RouteNo: routeNo, DepartureTime: departureTime, Arrivaltime: arrivalTime, Totalfare: totalFare, Ticket: ticket };
                $.ajax({
                    type: "POST",
                    url: url,
                    data: JSON.stringify(datasend),
                    dataType: "json",
                    contentType: "application/json;charset=utf-8",
                    success: function (data) {
                        chophepdi++;
                        if (tongcongroutno == chophepdi) {

                            window.location.href = book.search.prettyUrlBookingInfo;
                        }
                    }
                });
                //end ajax
            }
        });

        $('#popupAlarm').dialog({
            autoOpen: false,
            width: 300,
            resizable: false,
            modal: true,
            buttons: {
                "Ok": function () {
                    $(this).dialog("close");
                }
            }
        });

        ////////////////////////////////////////////////////////////////////////////////
        book.search.initSeatClassMoreOption();
        book.search.registerDepartureRadio(book.search.theme);
        book.search.registerReturnRadio(book.search.theme);
        book.search.registerPopupPolicy();
        if (book.search.theme != 'EnViet' && book.search.theme != 'EnVietQT') {
            book.search.registerSelectFlightOnFullRow();
        }
        book.search.popUpEco();
        //book.search.popupTicketPriceCondition();

        $('#btnBestPriceBooking').bind('click', function () {
            url = "/Booking/ChooseFlight";
            $.ajax({
                type: "POST",
                url: url,
                data: unescape($('#bestFlightForm').serialize()),
                success: function (response) {
                    if (response.Success == "true") {
                        window.location.href = book.search.prettyUrlBookingInfo;
                    }
                    else {
                        var errorMessage = response.ErrorMessage;
                        if (errorMessage != undefined && errorMessage != '')
                            alert(errorMessage);
                    }
                }
            });
        });

        //add class default select in radio
        var num = $(':input[name="radio_departure"]:checked').length;
        $('.' + num).parent().addClass('selected');
        var numreturn = $(':input[name="radio_return"]:checked').length;
        $('.' + numreturn).parent().addClass('selected');


    },


    reloadCollapse: function (selector) {
        if (book.search.theme === 'Globalink' || book.search.theme === 'HoangTra' || book.search.theme === 'HongNgocHa' || book.search.theme === 'Trippy' || book.search.theme === 'Booknow' || book.search.theme === 'NamThanh' ||
            book.search.theme === 'CanhChimViet' || book.search.theme === 'NuCuoiTravel' || book.search.theme === 'HongNgocHa_V2' || book.search.theme === 'VTrip' || book.search.theme === 'Ve247_vn' || book.search.theme === 'AirGoGo' || book.search.theme === 'Sea' || book.search.theme === 'PhuThinh' || book.search.theme === 'BaseVeMayBay') {
            if (selector.find('tr.select-flight.selected').length > 0) {

                if (book.search.theme == 'HongNgocHa' || book.search.theme == 'CanhChimViet' || book.search.theme === 'NuCuoiTravel' || book.search.theme == 'NamThanh' || book.search.theme == 'HongNgocHa_V2' || book.search.theme == 'Ve247_vn' || book.search.theme == 'PhuThinh' || book.search.theme === 'BaseVeMayBay') {

                    $(selector).find('tr.select-flight').not(".selected").each(function (index, value) {
                        if ($(value).find('.viewinfo').length > 0) {
                            if (book.search.theme == 'NamThanh') {
                                $(value).find('.viewinfo').removeClass('choosed').html($(this).attr('data-f-details'));
                            }
                            else {
                                $(value).find('.viewinfo').removeClass('choosed').html('Chi tiết');
                            }
                        }
                        else if ($(value).find('.viewflightinfo').length > 0) {
                            if (book.search.theme == 'NamThanh') {
                                $(value).find('.viewflightinfo').removeClass('choosed').html($(this).attr('data-f-details'));
                            }
                            else {
                                $(value).find('.viewflightinfo').removeClass('choosed').html('Chi tiết');
                            }
                        }
                        if ($(value).next().hasClass('flight-detail-inline')) {
                            $(value).find('.view-info-policy').html($(this).attr('data-f-details'));
                            $(value).next().remove();
                        }
                    });
                    var buttonChoose = $(selector).find('tr.select-flight.selected .flag-choose-flight').get(0);
                    if (buttonChoose != null) {
                        $(buttonChoose).html('Đổi chuyến bay');
                    }
                }
                if (book.search.theme == 'CanhChimViet' || book.search.theme === 'NuCuoiTravel') {
                    var buttonChoose = $(selector).find('tr.select-flight.selected .flag-choose-flight').get(0);
                    if (buttonChoose != null) {
                        $(buttonChoose).html('Thay đổi');
                    }
                }
                selector.addClass('has-choosed');
                $('#selectFlightForm').get(0).scrollIntoView();
                if (book.search.theme == 'NamThanh' || book.search.theme == 'CanhChimViet' || book.search.theme === 'NuCuoiTravel') {
                    book.search.showHideFlightInfoByChoosingAnotherSeatClass(selector, true);
                }
                app.resizeIframe(0, 1);
            } else {
                $(selector).find('tr.select-flight').not(".selected").each(function (index, value) {
                    var buttonChoose = $(value).find('.flag-choose-flight').get(0);
                    if (buttonChoose != null) {
                        $(buttonChoose).html('Chọn');
                    }
                });
                selector.removeClass('has-choosed');
                if (book.search.theme == 'NamThanh' || book.search.theme == 'CanhChimViet' || book.search.theme === 'NuCuoiTravel') {
                    book.search.showHideFlightInfoByChoosingAnotherSeatClass(selector, false);
                }
            }
        }
    },
    showHideFlightInfoByChoosingAnotherSeatClass: function (selector, isShow) {
        var allFlightBySeatClassOption = $(selector).find('tr.select-flight .flight-by-seat-class-option').toArray();
        allFlightBySeatClassOption.forEach(function (item) {
            $(item).hide();
        });
        var flightSelectedBySeatClassOption = $(selector).find('tr.select-flight.selected .flight-by-seat-class-option').toArray();
        if (isShow) {
            flightSelectedBySeatClassOption.forEach(function (item) {
                $(item).show();
            });
        }
        else {
            flightSelectedBySeatClassOption.forEach(function (item) {
                $(item).hide();
            });
        }
    },

    autoRedirectToBookingInfo: function () {
        var autoRedirectToBookingInfo = $("#autoRediectToBookingInfo").val();
        var isMobileDevice = $("#isMobileDevice").val();
        var internationalFlight = ($('#IsDomesticFlight').val() != undefined && $('#IsDomesticFlight').val().toLowerCase() === 'false');
        if (autoRedirectToBookingInfo != undefined && autoRedirectToBookingInfo == "True" && isMobileDevice != undefined && isMobileDevice == "false") {
            var countChooseFlight = $("#tblDepartureFlight tbody.has-choosed").length + $("#tblReturnFlight tbody.has-choosed").length;
            var noOfRoutes = $('#Route').val();
            if ((internationalFlight && countChooseFlight == 1) || (!internationalFlight && countChooseFlight == noOfRoutes)) {
                $('#btnContinue').click();
            }
        }

    },

    showBookingSummary: function () {
        if ($('#bookingSummary').css('display') == 'none') {
            $('#bookingSummary').show();
            app.resizeIframe(0, 0);
        }
    },

    hideBookingSummary: function () {
        $('#bookingSummary').hide();
        app.resizeIframe(0, 0);
    },

    hideButtonContinue: function () {
        $('#btnContinue').hide();
        $('#sf-nextstep').hide();

        //searchFlightScroll();
    },

    isShowButtonContinue: function () {
        //if ($('#btnContinue').is(':visible')) return true;
        //if ($('#Theme').val() == 'Globalink') return true;
        return book.search.wasShowButtonContinue;
    },

    showButtonContinue: function () {
        if (!book.search.isShowButtonContinue()) {
            book.search.wasShowButtonContinue = true;
            if (book.search.theme == 'SanVeRe') {
                var isDomestic = $('#IsDomesticFlight').val();
                if (isDomestic == 'True') {
                    var dataToSendWP = {
                        totalDeparture: '',
                        totalReturn: '',
                        routeNum: $('#Route').val(),
                        total: '',
                    };
                    // here setup in Scripts/pages/wp.page.crossdomain.js
                    sendSelectedFlightSummaryToWP(JSON.stringify(dataToSendWP));
                }
            }
            else {
                $('#btnContinue').show();
                $('#sf-nextstep').show();

            }

            if (typeof searchFlightScroll === "function") {
                searchFlightScroll(true);
            }
        }
    },



    loadBookingSummary: function (theme) {
        //load bookingsumary after render partial dispalyflight
        $('#bookingSummary').load('/Booking/LoadBookingSummary', function () {

            //if (theme == 'CanhChimViet') {
            //    $('#bookingSummary').hide();
            //}
            if (theme == "LoadNextAndPreviousDay") {
                $('#departureprevprice').ready(function () {
                    $.ajax({
                        url: '/Booking/GetPriceSelectDay',
                        type: 'POST',
                        data: { numberday: -1 },
                        success: function (response) {
                            if (response.HasData) {
                                var content = '';
                                var lstprice = response.Content.split('-');
                                if (lstprice.length > 0) {
                                    content = convertCurrency(lstprice[0]) + ' VNĐ';
                                    $('#departureprevprice').html(content);
                                }
                                if (lstprice.length > 1) {
                                    content = convertCurrency(lstprice[1]) + ' VNĐ';
                                    $('#returnprevprice').html(content);
                                }
                            }
                        }
                    });
                });

                $('#departurenextprice').ready(function () {
                    $.ajax({
                        url: '/Booking/GetPriceSelectDay',
                        type: 'POST',
                        data: { numberday: 1 },
                        success: function (response) {
                            if (response.HasData) {
                                var content = '';
                                var lstprice = response.Content.split('-');
                                if (lstprice.length > 0) {
                                    content = convertCurrency(lstprice[0]) + ' VNĐ';
                                    $('#departurenextprice').html(content);
                                }
                                if (lstprice.length > 1) {
                                    content = convertCurrency(lstprice[1]) + ' VNĐ';
                                    $('#returnnextprice').html(content);
                                }
                            }
                        }
                    });
                });
            }
        });
    },

    popUpEco: function () {
        $('.markFlight').hover(function (e) {

            //getting height and width of the message box
            var height = $('.popupEco').height();
            var width = $('.popupEco').width();
            //calculating offset for displaying popup message
            leftVal = e.pageX - (width) + "px";
            topVal = e.pageY - (height) + "px";
            //show the popup message and hide with fading effect
            $('.popupEco').css({ left: leftVal, top: topVal }).show();
        },
            function () {
                $('.popupEco').hide();
            });
    },

    registerPopupPolicy: function () {
        var infoFlightDialogTitle = $('#infoFlightDialogTitle').val();
        var $dialog = $('#flight-info').dialog({
            title: infoFlightDialogTitle,
            close: function () { $dialog.dialog('close'); },
            modal: true,
            autoOpen: false,
            width: 720
        });

        $('#selectFlightForm').delegate('.viewflightinfo', 'click', function () {
            var idx = $(this).attr('data-f-id');
            var content = $(this).attr('data-f-content');

            var flightDetailInfo = $(this).prev('input').attr('value');

            /*****************************************************
            *
            * Đoạn code này để check View detail Inline hay Dialog
            * .flight-detail-inline: Trong file _FlightDetailByAirline.cshtml
            *
            ******************************************************/

            if (book.search.theme == 'HongNgocHa' || book.search.theme == 'NamThanh' || book.search.theme == 'HongNgocHa_V2' || book.search.theme == 'Ve247_vn' || book.search.theme == 'AirGoGo' || book.search.theme == 'Sea' || book.search.theme == 'PhuThinh' || book.search.theme == 'BaseVeMayBay') {
                if ($(this).hasClass('choosed')) {
                    $('.flight-detail-inline').remove();
                    $(this).removeClass('choosed');
                    $(this).html('Chi tiết');
                    $(this).closest('.select-flight').find('.flight-detail-content-inline').html('');
                }
                else {

                    if ($('.flight-detail-inline').length > 0) {
                        $('.flight-detail-inline').prev().find('.viewflightinfo').removeClass('choosed').html('Chi tiết');
                        $('.flight-detail-inline').remove();
                    }

                    if ($('.flight-detail-content-inline').length > 0) {
                        $('.flight-detail-content-inline').html('');
                        $('.flight-detail-content-inline').closest('.select-flight').find('.viewflightinfo').removeClass('choosed').html('Chi tiết');
                    }
                    if ($(this).closest('.select-flight').find('.flight-detail-content-inline').length > 0) {
                        $(this).closest('.select-flight').find('.flight-detail-content-inline').html(flightDetailInfo);
                    }
                    else {
                        $(this).closest('.select-flight').after(flightDetailInfo);
                    }

                    $(this).addClass('choosed');
                    if (book.search.theme == 'NamThanh') {
                        $(this).html($(this).attr('data-f-collapse'));
                    }
                    else {
                        $(this).html('Thu gọn');
                    }

                }
            }
            else {
                var worker = $('<div />');

                worker
                    .addClass("dialog")
                    .attr("id", "flightPolicy")
                    .appendTo("body").html(flightDetailInfo);
                worker.dialog({
                    close: function () {
                        //$('.inter-f-loading').hide();
                        if (!book.search.isMobile || (book.search.isMobile && book.search.theme != 'Globalink'))
                            $.unblockUI();
                        $(this).remove();
                        app.resizeIframe(0, 0);
                    },

                    title: 'Thông tin chuyến bay',
                    position: { my: "center", at: "center", of: window },
                    modal: true,
                    width: 680,
                    resizable: false,
                    open: function () {
                        var ui_dialog = $(this).closest('.ui-dialog')
                        var top = ui_dialog.position().top - 200;


                        app.scrolltoIframe(top);

                        $('.ui-widget-overlay').bind('click', function () {
                            worker.dialog('close');
                        });
                    }
                });
            }

            if (book.search.theme == 'SanVeRe') {
                $('.flight-info-route-title').each(function () {
                    var $this = $(this),
                        content = $this.next();
                    $this.click(function () {
                        content.slideToggle();
                        $this.toggleClass('inactive');
                    });
                    $(this).css('cursor', 'pointer');
                });
                $('.flight-info-route-inter').hide();
                $('.' + content).show();
            }

        });

        $('#selectFlightForm').delegate('.viewinfo', 'click', function () {
            //var idx = $(this).attr('data-f-id');
            var flightDirection = $(this).attr('data-f-direction');
            //var hasStop = $(this).attr('data-flight-has-stop');

            var flightDetailInfo = $(this).prev('input').attr('value');
            /*****************************************************
            *
            * Đoạn code này để check View detail Inline hay Dialog
            * .flight-detail-inline: Trong file _FlightDetailByAirline.cshtml
            *
            ******************************************************/

            if (book.search.theme == 'HongNgocHa' || book.search.theme == 'HongNgocHa_V2' || book.search.theme == 'Ve247_vn' || book.search.theme == 'AirGoGo' || book.search.theme == 'Sea' || book.search.theme == 'PhuThinh' || book.search.theme == 'BaseVeMayBay') {
                if ($(this).hasClass('choosed')) {
                    $('.flight-detail-inline').remove();
                    $(this).removeClass('choosed');
                    $(this).html('Chi tiết');
                    $(this).closest('.select-flight').find('.flight-detail-content-inline').html('');
                }
                else {
                    if ($('.flight-detail-inline').length > 0) {
                        $('.flight-detail-inline').prev().find('.viewinfo').removeClass('choosed').html('Chi tiết');
                        $('.flight-detail-inline').remove();
                    }

                    if ($('.flight-detail-content-inline').length > 0) {
                        $('.flight-detail-content-inline').html('');
                        $('.flight-detail-content-inline').closest('.select-flight').find('.viewinfo').removeClass('choosed').html('Chi tiết');
                    }

                    if ($(this).closest('.select-flight').find('.flight-detail-content-inline').length > 0) {
                        $(this).closest('.select-flight').find('.flight-detail-content-inline').html(flightDetailInfo);
                    }
                    else {

                        $(this).closest('.select-flight').after(flightDetailInfo);
                    }
                    $(this).addClass('choosed');
                    $(this).html('Thu gọn');
                }
            }
            else if (book.search.theme == 'NamThanh') {
                let flightDetailInlineName = $('.flight-detail-inline');
                if (flightDirection != undefined || flightDirection != null) {
                    flightDetailInlineName = $('.flight-detail-inline-' + flightDirection);
                }
                if ($(this).hasClass('choosed')) {
                    var trTab = $(this).closest('tr.select-flight');
                    var isChecked = trTab.find('input[name*="Selected"]').val().toLowerCase() == 'true';
                    if (!isChecked) {
                        flightDetailInlineName.remove();
                        $(this).removeClass('choosed');
                        $(this).html($(this).attr('data-f-details'));
                        $(this).closest('.select-flight').find('.flight-detail-content-inline').html('');
                    }

                }
                else {
                    if (flightDetailInlineName.length > 0) {
                        flightDetailInlineName.prev().find('.viewinfo').removeClass('choosed').html($(this).attr('data-f-details'));
                        //$('.viewinfo').removeClass('choosed').html('Chi tiết');
                        flightDetailInlineName.remove();
                    }
                    else {
                        if ($('.flight-detail-content-inline').length > 0) {
                            $('.flight-detail-content-inline').html('');
                            $('.flight-detail-content-inline').closest('.select-flight').find('.viewinfo').removeClass('choosed').html($(this).attr('data-f-details'));
                        }

                        if ($(this).closest('.select-flight').find('.flight-detail-content-inline').length > 0) {
                            $(this).closest('.select-flight').find('.flight-detail-content-inline').html(flightDetailInfo);
                        }
                        else {

                            $(this).closest('.select-flight').after(flightDetailInfo);
                        }
                        $(this).addClass('choosed');
                        $(this).html($(this).attr('data-f-collapse'));
                    }

                }
            }
            else {
                var worker = $('<div />');

                worker
                    .addClass("dialog")
                    .attr("id", "flightPolicy")
                    .appendTo("body").html("");

                $('#flightPolicy').html(flightDetailInfo);
                worker.dialog({
                    close: function () {
                        //$('.inter-f-loading').hide();
                        if (!book.search.isMobile || (book.search.isMobile && book.search.theme != 'Globalink'))
                            $.unblockUI();
                        $(this).remove();
                        app.resizeIframe(0, 0);
                        $("body").removeClass("open-dialog");
                    },
                    position: { my: "center", at: "center", of: window },
                    modal: true,
                    width: 680,
                    resizable: false,
                    open: function () {
                        var top = $(this).closest('.ui-dialog').position().top;
                        //$(this).closest('.ui-dialog').css('top', top + 'px');
                        app.scrolltoIframe(top);
                        $("body").addClass("open-dialog");
                        $('.ui-widget-overlay').bind('click', function () {
                            worker.dialog('close');
                            $("body").removeClass("open-dialog");
                        });
                    }
                });
                if (book.search.theme == 'CanhChimViet' || book.search.theme === 'NuCuoiTravel') {
                    worker.dialog({
                        title: "Chi tiết chuyến bay"
                    });
                }
            }
        });

    },

    initSeatClassMoreOption: function () {
        $('#selectFlightForm').delegate('.show-more-seat-class', 'click', function () {
            let flightDirection = $(this).attr("data-flight-direction");
            let tableFlight = flightDirection == "departureFlight" ? "tblDepartureFlight" : "tblReturnFlight";
            let inventoryCount = $(this).attr("data-inventory-count");
            let selector = $(this);
            if ($(this).hasClass("showed-more-seat-class")) {
                $("tr.anorther-seat-class-" + flightDirection + "").remove();
                if (book.search.theme == 'NamThanh') {
                    $(this).text($(this).attr("data-f-have") + " " + inventoryCount + " " + $(this).attr("data-f-otherPrices"));
                }
                else {
                    $(this).text("Còn " + inventoryCount + " mức giá khác");
                }
                $(this).removeClass("showed-more-seat-class");
                $('#' + tableFlight + ' tr.flight-detail-inline').remove();
            }
            else {
                let trShowedSeatClass = $('#' + tableFlight + ' tr').find(".showed-more-seat-class").get(0);
                if (trShowedSeatClass != undefined) {
                    let showedInventoryCount = $(trShowedSeatClass).attr("data-inventory-count");
                    if (book.search.theme == 'NamThanh') {
                        $(trShowedSeatClass).text($(this).attr("data-f-have") + " " + inventoryCount + " " + $(this).attr("data-f-otherPrices"));
                    }
                    else {
                        $(trShowedSeatClass).text("Còn " + showedInventoryCount + " mức giá khác");
                    }
                    $(trShowedSeatClass).removeClass("showed-more-seat-class");
                }

                if (book.search.theme == 'NamThanh') {
                    $(this).text($(this).attr("data-f-hideother"));
                }
                else {
                    $(this).text("Ẩn các lựa chọn");
                }
                $(this).addClass("showed-more-seat-class");
                let flight = JSON.parse($(this).attr('data-flight'));
                $("tr.anorther-seat-class-" + flightDirection + "").remove();
                let data = {
                    flightSearch: flight,
                    flightDirection: flightDirection
                };
                $.ajax({
                    url: '/Booking/GetInventories',
                    type: 'POST',
                    contentType: "application/json",
                    data: JSON.stringify(data),
                    success: function (response) {
                        if (response.Content != null) {
                            var trTab = selector.closest('tr.select-flight');
                            trTab.fadeIn().after(response.Content);
                        }
                    }
                });
            }

        });

    },


    registerDepartureRadio: function (theme) {
        if (book.search.theme != 'Ve24h') {
            $("input[name='departureFlights[0].Selected']").attr('value', true);
            $("input[name='radio_departure'][value='0']").attr('checked', 'checked');
        }
        $('#tblDepartureFlight').delegate('.view-info-policy', 'click', function () {
            $('#tblDepartureFlight .flight-policy-more-detail').toggleClass('view-all');
            if ($('#tblDepartureFlight .flight-policy-more-detail').hasClass('view-all')) {
                if (book.search.theme == 'NamThanh') {
                    $(this).html($(this).attr('data-f-collapse'));
                }
                else {
                    $(this).html('Thu gọn');
                }
            }
            else {
                if (book.search.theme == 'NamThanh') {
                    $(this).html($(this).attr('data-f-details'));
                }
                else {
                    $(this).html('Chi tiết');
                }
            }
        });
        $('.go-search-list').delegate('input[name="radio_departure"]', 'change', function () {
            //var isChecked
            $('#tblDepartureFlight tr.selected').removeClass("selected");
            var trTab = $(this).closest('tr.select-flight');
            var isChecked = trTab.find('input[name*="Selected"]').val().toLowerCase() == 'true';
            if (!isChecked) {
                trTab.addClass("selected");
                $('.view-info-policy').show();
                if (book.search.theme == 'NamThanh') {
                    $('.viewinfo').hide();
                    $("#tblDepartureFlight .show-more-seat-class").hide();
                }
            }
            else if (book.search.theme == 'Globalink' || book.search.theme == 'HoangTra' || book.search.theme === 'HongNgocHa' || book.search.theme == 'Trippy' || book.search.theme === 'NamThanh' ||
                book.search.theme === 'CanhChimViet' || book.search.theme === 'NuCuoiTravel' || book.search.theme === 'HongNgocHa_V2' || book.search.theme === 'VTrip' || book.search.theme === 'Ve247_vn' || book.search.theme === 'AirGoGo' || book.search.theme === 'Sea' || book.search.theme === 'PhuThinh' || book.search.theme === 'BaseVeMayBay') {
                trTab.removeClass('selected');
                $('.view-info-policy').hide();
                if (book.search.theme == 'NamThanh') {
                    $('.viewinfo').show();
                    $("#tblDepartureFlight .show-more-seat-class").show();
                }
            }
            else {
                trTab.addClass("selected");
            }

            if (!isChecked) {
                $('.go-search-list input[name*="Selected"]').val(false);

                trTab.find('input[name*="Selected"]').val(true);
                book.search.showBookingSummary();
            } else if (book.search.theme == 'Globalink' || book.search.theme == 'HoangTra' || book.search.theme === 'HongNgocHa' || book.search.theme == 'Trippy' || book.search.theme === 'NamThanh' ||
                book.search.theme === 'CanhChimViet' || book.search.theme === 'NuCuoiTravel' || book.search.theme === 'HongNgocHa_V2' || book.search.theme === 'VTrip' || book.search.theme === 'Ve247_vn' || book.search.theme === 'AirGoGo' || book.search.theme === 'Sea' || book.search.theme === 'PhuThinh' || book.search.theme === 'BaseVeMayBay') {
                trTab.find('input[name*="Selected"]').val(false);
            }

            $("#tblDepartureFlight tr:even").css("background-color", "#fff");
            $("#tblDepartureFlight tr:odd").css("background-color", "#fff7e9");

            if (book.search.theme == 'Globalink' || book.search.theme == 'HoangTra' || book.search.theme === 'HongNgocHa' || book.search.theme == 'Trippy' || book.search.theme === 'NamThanh' ||
                book.search.theme === 'CanhChimViet' || book.search.theme === 'NuCuoiTravel' || book.search.theme === 'HongNgocHa_V2' || book.search.theme === 'VTrip' || book.search.theme === 'Ve247_vn' || book.search.theme === 'AirGoGo' || book.search.theme === 'Sea' || book.search.theme === 'PhuThinh' || book.search.theme === 'BaseVeMayBay')
                book.search.reloadCollapse($(this).closest('tbody'));

            book.search.updatePriceBookingSummary(trTab, 1);
            var internationalFlight = $(this).attr('data-inter');
            if (internationalFlight != undefined && $('#Route').val() == 2) {
                book.search.updatePriceBookingSummary(trTab, 0);
            }

            book.search.autoRedirectToBookingInfo(internationalFlight);
        });
    },

    registerReturnRadio: function (theme) {
        if (book.search.theme != 'Ve24h') {
            $("input[name='returnFlights[0].Selected']").attr('value', true);
            $("input[name='radio_return'][value='0']").attr('checked', 'checked');
        }
        $('#tblReturnFlight').delegate('.view-info-policy', 'click', function () {
            $('#tblReturnFlight .flight-policy-more-detail').toggleClass('view-all');
            if ($('#tblReturnFlight .flight-policy-more-detail').hasClass('view-all')) {
                if (book.search.theme == 'NamThanh') {
                    $(this).html($(this).attr('data-f-collapse'));
                }
                else {
                    $(this).html('Thu gọn');
                }
            }
            else {
                if (book.search.theme == 'NamThanh') {
                    $(this).html($(this).attr('data-f-details'));
                }
                else {
                    $(this).html('Chi tiết');
                }
            }
        });
        $('.return-search-list').delegate('input[name="radio_return"]', 'change', function () {
            $('#tblReturnFlight tr.selected').removeClass("selected");
            var trTab = $(this).closest('tr.select-flight');
            var isChecked = trTab.find('input[name*="Selected"]').val().toLowerCase() == 'true';
            if (!isChecked) {
                trTab.addClass("selected");
                $('.view-info-policy').show();
                if (book.search.theme == 'NamThanh') {
                    $('.viewinfo').hide();
                    $("#tblReturnFlight .show-more-seat-class").hide();
                }
            }
            else if (book.search.theme == 'Globalink' || book.search.theme == 'HoangTra' || book.search.theme === 'HongNgocHa' || book.search.theme == 'Trippy' || book.search.theme === 'NamThanh' ||
                book.search.theme === 'CanhChimViet' || book.search.theme === 'NuCuoiTravel' || book.search.theme === 'HongNgocHa_V2' || book.search.theme === 'VTrip' || book.search.theme === 'Ve247_vn' || book.search.theme === 'AirGoGo' || book.search.theme === 'Sea' || book.search.theme === 'PhuThinh' || book.search.theme === 'BaseVeMayBay') {
                trTab.removeClass('selected');
                $('.view-info-policy').hide();
                if (book.search.theme == 'NamThanh') {
                    $('.viewinfo').show();
                    $("#tblReturnFlight .show-more-seat-class").show();
                }
            }
            else {
                trTab.addClass("selected");
            }

            if (!isChecked) {
                $('.return-search-list input[name*="Selected"]').val(false);
                trTab.find('input[name*="Selected"]').val(true);
                book.search.showBookingSummary();
            }
            else if (book.search.theme == 'Globalink' || book.search.theme == 'HoangTra' || book.search.theme === 'HongNgocHa' || book.search.theme == 'Trippy' || book.search.theme === 'NamThanh' ||
                book.search.theme === 'CanhChimViet' || book.search.theme === 'NuCuoiTravel' || book.search.theme === 'HongNgocHa_V2' || book.search.theme === 'VTrip' || book.search.theme === 'Ve247_vn' || book.search.theme === 'AirGoGo' || book.search.theme === 'Sea' || book.search.theme === 'PhuThinh' || book.search.theme === 'BaseVeMayBay') {
                trTab.find('input[name*="Selected"]').val(false);
            }

            $("#tblReturnFlight tr:even").css("background-color", "#fff");
            $("#tblReturnFlight tr:odd").css("background-color", "#fff7e9");



            if (book.search.theme == 'Globalink' || book.search.theme == 'HoangTra' || book.search.theme === 'HongNgocHa' || book.search.theme == 'Trippy' || book.search.theme === 'NamThanh' ||
                book.search.theme === 'CanhChimViet' || book.search.theme === 'NuCuoiTravel' || book.search.theme === 'HongNgocHa_V2' || book.search.theme === 'VTrip' || book.search.theme === 'Ve247_vn' || book.search.theme === 'AirGoGo' || book.search.theme === 'Sea' || book.search.theme === 'PhuThinh' || book.search.theme === 'BaseVeMayBay')
                book.search.reloadCollapse($(this).closest('tbody'));

            book.search.updatePriceBookingSummary(trTab, 0);

            var internationalFlight = $(this).attr('data-inter');
            book.search.autoRedirectToBookingInfo(internationalFlight);
        });
    },

    isGlobalinkAndSearchRoundtrip: function () {
        //var theme = $('#Theme').val();
        var isDomesticFlight = $('#IsDomesticFlight').val();
        var route = $('#Route').val();
        if (book.search.theme === 'Globalink' && isDomesticFlight != undefined && isDomesticFlight.toLowerCase() === 'true' && route === 2) return true;
        return false;
    },

    registerSelectFlightOnFullRow: function () {

        $('#selectFlightForm').delegate('.select-flight', 'click', function (event) {
            var elementClick = $(event.target);
            let parentElementClick = elementClick.parent();
            if (elementClick.hasClass('show-more-seat-class') || elementClick.hasClass('viewinfo') || elementClick.hasClass('view-info-policy') || elementClick.hasClass('viewflightinfo') || elementClick.hasClass('ui-tabs-anchor'))
                return;
            else if (parentElementClick.hasClass('viewinfo') || parentElementClick.hasClass('view-info-policy') || parentElementClick.hasClass('viewflightinfo') || parentElementClick.hasClass('ui-tabs-anchor'))
                return;
            var elementRadio = $(this).find('input[type="radio"]');
            elementRadio.prop('checked', true).trigger('change');

            if (book.search.theme === 'NamThanh' || book.search.theme === 'AirGoGo' || book.search.theme === 'Sea' || book.search.theme === 'BaseVeMayBay') {
                var elementViewinfo = $(this).find('.viewinfo');
                //if (elementViewinfo.hasClass("choosed")) {
                //    elementViewinfo.removeClass("choosed");
                //}
                if (book.search.theme === 'NamThanh') {
                    elementViewinfo.trigger('click');
                }
                
                if (($('#Route').val() == 1 && $('.has-choosed .selected').length == 1 && book.search.isDomestic == true)
                    || ($('#Route').val() == 2 && $('.has-choosed .selected').length == 1 && book.search.isDomestic == false)
                    || ($('#Route').val() == 1 && $('.has-choosed .selected').length == 1 && book.search.isDomestic == false)) {
                    $('.select-flight-continue').show();
                }
                else if ($('#Route').val() == 2 && $('.has-choosed .selected').length == 2) {
                    $('.select-flight-continue').show();
                }
                else {
                    $('.select-flight-continue').hide();
                }
            }
            //elementRadio.trigger('change');
            //setTimeout(function () { elementRadio.trigger('change'); }, 1);

            //$(this).find('input[type="radio"]').prop('checked', true);
            //$(this).find('input[type="radio"]').trigger('change');
            //setTimeout(function () { $(this).find('input[type="radio"]').trigger('change'); }, 100);
        });
    },

    //updatePriceBookingSummary: function (i, modearline) {
    updatePriceBookingSummary: function (trTab, modearline) {

        //var theme = $('#Theme').val();
        var adultno = parseInt($('#adultno').val());
        var childno = parseInt($('#childno').val());
        var infantno = parseInt($('#infantno').val());

        var journeyType = 'departure';
        if (modearline != 1)
            journeyType = 'return';

        var totalDiscount = parseFloat($("#totalDiscount").val());


        //var arrivalTime = ($('input[name="' + journeyType + 'Flights[' + i + '].ArrivalTime"]').val());
        //var arrivalDateView = ($('input[name="' + journeyType + 'Flights[' + i + '].ArrivalDateView"]').val());
        //var departureDateView = ($('input[name="' + journeyType + 'Flights[' + i + '].DepartureDateView"]').val());
        //var arrivalDate = ($('input[name="' + journeyType + 'Flights[' + i + '].ArrivalDate"]').val());
        //var departureDate = ($('input[name="' + journeyType + 'Flights[' + i + '].DepartureDate"]').val());
        //var departureTime = ($('input[name="' + journeyType + 'Flights[' + i + '].DepartureTime"]').val());
        //var adultFare = parseFloat($('input[name="' + journeyType + 'Flights[' + i + '].FareInfo.AdultFare"]').val());
        //var childFare = parseFloat($('input[name="' + journeyType + 'Flights[' + i + '].FareInfo.ChildFare"]').val());
        //var infantFare = parseFloat($('input[name="' + journeyType + 'Flights[' + i + '].FareInfo.InfantFare"]').val());
        //var adultCharge = parseFloat($('input[name="' + journeyType + 'Flights[' + i + '].FareInfo.AdultCharge"]').val());
        //var childCharge = parseFloat($('input[name="' + journeyType + 'Flights[' + i + '].FareInfo.ChildCharge"]').val());
        //var infantCharge = parseFloat($('input[name="' + journeyType + 'Flights[' + i + '].FareInfo.InfantCharge"]').val());

        //var sumFare = parseFloat($('input[name="' + journeyType + 'Flights[' + i + '].FareInfo.SumFare"]').val());
        //var sumCharge = parseFloat($('input[name="' + journeyType + 'Flights[' + i + '].FareInfo.SumCharge"]').val());

        //var adultServicefee = parseFloat($('input[name="' + journeyType + 'Flights[' + i + '].FareInfo.AdultServiceFee"]').val());
        //var childServicefee = parseFloat($('input[name="' + journeyType + 'Flights[' + i + '].FareInfo.ChildServiceFee"]').val());
        //var infantServicefee = parseFloat($('input[name="' + journeyType + 'Flights[' + i + '].FareInfo.InfantServiceFee"]').val());
        //var adultDiscount = parseFloat($('input[name="' + journeyType + 'Flights[' + i + '].FareInfo.AdultDiscount"]').val());
        //var childDiscount = parseFloat($('input[name="' + journeyType + 'Flights[' + i + '].FareInfo.ChildDiscount"]').val());
        //var infantDiscount = parseFloat($('input[name="' + journeyType + 'Flights[' + i + '].FareInfo.InfantDiscount"]').val());

        //var sclassId = ($('input[name="' + journeyType + 'Flights[' + i + '].SeatClass"]').val());
        //var flightNo = ($('input[name="' + journeyType + 'Flights[' + i + '].FlightNo"]').val());

        var arrivalTime = (trTab.find('input[name*="' + journeyType + 'Flights[' + 0 + '].ArrivalTime"]').val());
        var arrivalDateView = (trTab.find('input[name*="' + journeyType + 'Flights[' + 0 + '].ArrivalDateView"]').val());
        var departureDateView = (trTab.find('input[name*="' + journeyType + 'Flights[' + 0 + '].DepartureDateView"]').val());
        var arrivalDate = (trTab.find('input[name*="' + journeyType + 'Flights[' + 0 + '].ArrivalDate"]').val());
        var departureDate = (trTab.find('input[name*="' + journeyType + 'Flights[' + 0 + '].DepartureDate"]').val());
        var departureTime = (trTab.find('input[name*="' + journeyType + 'Flights[' + 0 + '].DepartureTime"]').val());
        var adultFare = parseFloat(trTab.find('input[name*="' + journeyType + 'Flights[' + 0 + '].FareInfo.AdultFare"]').val());
        var childFare = parseFloat(trTab.find('input[name*="' + journeyType + 'Flights[' + 0 + '].FareInfo.ChildFare"]').val());
        var infantFare = parseFloat(trTab.find('input[name*="' + journeyType + 'Flights[' + 0 + '].FareInfo.InfantFare"]').val());
        var adultCharge = parseFloat(trTab.find('input[name*="' + journeyType + 'Flights[' + 0 + '].FareInfo.AdultCharge"]').val());
        var childCharge = parseFloat(trTab.find('input[name*="' + journeyType + 'Flights[' + 0 + '].FareInfo.ChildCharge"]').val());
        var infantCharge = parseFloat(trTab.find('input[name*="' + journeyType + 'Flights[' + 0 + '].FareInfo.InfantCharge"]').val());

        var sumFare = parseFloat(trTab.find('input[name*="' + journeyType + 'Flights[' + 0 + '].FareInfo.SumFare"]').val());
        var sumCharge = parseFloat(trTab.find('input[name*="' + journeyType + 'Flights[' + 0 + '].FareInfo.SumCharge"]').val());

        var adultServicefee = parseFloat(trTab.find('input[name*="' + journeyType + 'Flights[' + 0 + '].FareInfo.AdultServiceFee"]').val());
        var childServicefee = parseFloat(trTab.find('input[name*="' + journeyType + 'Flights[' + 0 + '].FareInfo.ChildServiceFee"]').val());
        var infantServicefee = parseFloat(trTab.find('input[name*="' + journeyType + 'Flights[' + 0 + '].FareInfo.InfantServiceFee"]').val());
        var adultDiscount = parseFloat(trTab.find('input[name*="' + journeyType + 'Flights[' + 0 + '].FareInfo.AdultDiscount"]').val());
        var childDiscount = parseFloat(trTab.find('input[name*="' + journeyType + 'Flights[' + 0 + '].FareInfo.ChildDiscount"]').val());
        var infantDiscount = parseFloat(trTab.find('input[name*="' + journeyType + 'Flights[' + 0 + '].FareInfo.InfantDiscount"]').val());

        var sclassId = (trTab.find('input[name*="' + journeyType + 'Flights[' + 0 + '].SeatClass"]').val());
        var flightNo = (trTab.find('input[name*="' + journeyType + 'Flights[' + 0 + '].FlightNo"]').val());

        if (journeyType == 'departure' && $('#bookingDeparture_DepatureTime').length > 0) {
            $('#bookingDeparture_DepatureTime').html(departureTime.substr(0, 2) + ':' + departureTime.substr(2, 3));
        }

        if (journeyType == 'return' && $('#bookingReturn_DepatureTime').length > 0) {
            $('#bookingReturn_DepatureTime').html(departureTime.substr(0, 2) + ':' + departureTime.substr(2, 3));

        }

        ////////////////////////////////////
        ////Update for TicketGlobal
        ////////////////////////////////////

        if (book.search.theme === 'TicketGlobal') {
            var flight_summary = $('.info-flight-summary.' + journeyType);
            var logoPath = trTab.find('input[name="' + journeyType + 'Flights[' + 0 + '].LogoPath"]').val();
            if (flight_summary.hasClass("hidden"))
                flight_summary.removeClass("hidden");
            flight_summary.find('img.flight-logo').attr('src', logoPath);
            flight_summary.find('.flight-no').html(flightNo);
            flight_summary.find('.flight-departure-date').html(departureTime.substr(0, 2) + ':' + departureTime.substr(2, 3) + '  ' + departureDate.split(' ')[0]);
            flight_summary.find('.flight-arrival-date').html(arrivalTime.substr(0, 2) + ':' + arrivalTime.substr(2, 3) + ' ' + arrivalDate.split(' ')[0]);

            if ($('#IsDomesticFlight').val() != undefined && $('#IsDomesticFlight').val().toLowerCase() == 'false' && $('#Route').val() === '2') {
                flight_summary = $('.info-flight-summary.' + 'return');
                flight_summary.find('.flight-no').html($('input[name="' + 'returnFlights[' + 0 + '].FlightNo"]').val());
                flight_summary.find('img.flight-logo').attr('src', logoPath);
                if (flight_summary.hasClass("hidden"))
                    flight_summary.removeClass("hidden");
                var returnDepartureTime = $('input[name="' + 'returnFlights[' + 0 + '].DepartureTime"]').val();
                var returnArrivalTime = $('input[name="' + 'returnFlights[' + 0 + '].ArrivalTime"]').val();
                var returnDepartureDate = $('input[name="' + 'returnFlights[' + 0 + '].DepartureDate"]').val();
                var returnArrivalDate = $('input[name="' + 'returnFlights[' + 0 + '].ArrivalDate"]').val();

                flight_summary.find('.flight-departure-date').html(returnDepartureTime.substr(0, 2) + ':' + returnDepartureTime.substr(2, 3) + '  ' + returnDepartureDate.split(' ')[0]);
                flight_summary.find('.flight-arrival-date').html(returnArrivalTime.substr(0, 2) + ':' + returnArrivalTime.substr(2, 3) + ' ' + returnArrivalDate.split(' ')[0]);
            }
        }

        if (journeyType == 'departure') {
            $("#flightNoDeparture").html(flightNo);
            $("#sumFareDeparture").html(sumFare);
            if (sclassId == 'C' || sclassId == 'D' || sclassId == 'J') {
                $("#classTypeDeparture").html("Business");
            }
            else {
                $("#classTypeDeparture").html("Economy Save");
            }
            if (arrivalTime != undefined && arrivalTime.length >= 4) {
                var hourArrive = arrivalTime.substring(0, 2);
                var minuteArive = arrivalTime.substring(2, arrivalTime.length);
                $("#arrivalTimeView").text(hourArrive + ":" + minuteArive);
                $("#arrivalDateView").text(arrivalDateView);

                $('#departure-flight-arrival-date').html(arrivalDate.split(' ')[0] + ' ' + arrivalTime.substr(0, 2) + ':' + arrivalTime.substr(2, 3));
            }
            if (departureTime != undefined && departureTime.length >= 4) {
                var hour = departureTime.substring(0, 2);
                var minute = departureTime.substring(2, departureTime.length);
                $("#departureTimeView").text(hour + ":" + minute);
                $("#departureDateView").text(departureDateView);

                $('#departure-flight-departure-date').html(departureDate.split(' ')[0] + ' ' + departureTime.substr(0, 2) + ':' + departureTime.substr(2, 3));

            }
            $("#departure-seatclass-type").html(sclassId);
        }
        else {
            $("#flightNoReturn").html(flightNo);
            if (sclassId == 'C' || sclassId == 'D' || sclassId == 'J') {
                $("#classTypeReturn").html("Business");
            }
            else {
                $("#classTypeReturn").html("Economy Save");
            }
            $("#sumFareReturn").html(sumFare);
            if (departureTime != undefined && departureTime.length >= 4) {
                var hour = departureTime.substring(0, 2);
                var minute = departureTime.substring(2, departureTime.length);
                $("#returnTimeView").text(hour + ":" + minute);
                $("#returnDateView").text(departureDateView);

                $('#return-flight-departure-date').html(departureDate.split(' ')[0] + ' ' + departureTime.substr(0, 2) + ':' + departureTime.substr(2, 3));
            }
            if (arrivalTime != undefined && arrivalTime.length >= 4) {
                var hourArrive = arrivalTime.substring(0, 2);
                var minuteArive = arrivalTime.substring(2, arrivalTime.length);
                $("#returnAriveTimeView").text(hourArrive + ":" + minuteArive);
                $("#returnAriveDateView").text(arrivalDateView);

                $('#return-flight-arrival-date').html(arrivalDate.split(' ')[0] + ' ' + arrivalTime.substr(0, 2) + ':' + arrivalTime.substr(2, 3));
            }
            $("#return-seatclass-type").html(sclassId);
        }



        // Unselected all
        //$('.' + $('#' + journeyType + 'Flights_' + 1 + '__Selected').attr('class')).each(function () {
        //    $(this).val(false);
        //});

        //$('#' + journeyType + 'Flights_' + i + '__Selected').val(true);

        var adultFullCharge = adultCharge + adultServicefee;
        var childFullCharge = childCharge + childServicefee;
        var infantFullCharge = infantCharge + infantServicefee;

        var currentWayDiscount = adultno * adultDiscount + childno * childDiscount + infantno * infantDiscount;
        var currentWayAmount = sumFare + sumCharge + adultno * adultServicefee + childno * childServicefee + infantno * infantServicefee - currentWayDiscount;
        var totalFullCharge = sumCharge + adultno * adultServicefee + childno * childServicefee + infantno * infantServicefee;
        //NamThanh show service fee in order row
        if (book.search.theme === 'NamThanh') {
            adultFullCharge = adultCharge;
            childFullCharge = childCharge;
            infantFullCharge = infantCharge;
            totalFullCharge = sumCharge;
        }

        var adultFareValue = convertCurrency(adultFare.toString());
        var childFareValue = convertCurrency(childFare.toString());
        var infantFareValue = convertCurrency(infantFare.toString());

        var adultFullChargeValue = convertCurrency(adultFullCharge.toString());
        var childFullChargeValue = convertCurrency(childFullCharge.toString());
        var infantFullChargeValue = convertCurrency(infantFullCharge.toString());

        // update DOM
        $('input[name="_' + journeyType + 'AdultFare"]').val(adultFare);
        $('input[name="_' + journeyType + 'ChildFare"]').val(childFare);
        $('input[name="_' + journeyType + 'InfantFare"]').val(infantFare);
        $('input[name="_' + journeyType + 'AdutlFullCharge"]').val(adultFullCharge);
        $('input[name="_' + journeyType + 'ChildFullCharge"]').val(childFullCharge);
        $('input[name="_' + journeyType + 'InfantFullCharge"]').val(infantFullCharge);
        $('input[name="_' + journeyType + 'TotalFullCharge"]').val(totalFullCharge);
        $('input[name="_' + journeyType + 'TotalDiscount"]').val(currentWayDiscount);
        $('input[name="_' + journeyType + 'TotalAmount"]').val(currentWayAmount);
        $('input[name="_' + journeyType + 'SumFare"]').val(sumFare);
        $('input[name="_' + journeyType + 'AdultServiceFee"]').val(adultServicefee);
        $('input[name="_' + journeyType + 'ChildServiceFee"]').val(childServicefee);
        $('input[name="_' + journeyType + 'InfantServiceFee"]').val(infantServicefee);
        $('input[name="_' + journeyType + 'AdultCharge"]').val(adultCharge);
        $('input[name="_' + journeyType + 'ChildCharge"]').val(childCharge);
        $('input[name="_' + journeyType + 'InfantCharge"]').val(infantCharge);

        var journeyTypeForSet = 'Departure';
        if (modearline != 1)
            journeyTypeForSet = 'Return';

        $('#booking' + journeyTypeForSet + 'AdultFare').text(adultFareValue);
        $('#booking' + journeyTypeForSet + 'AdultFullCharge').text(adultFullChargeValue);
        if (childno > 0) {
            $('#booking' + journeyTypeForSet + 'ChildFare').text(childFareValue);
            $('#booking' + journeyTypeForSet + 'ChildFullCharge').text(childFullChargeValue);
        }
        if (infantno > 0) {
            $('#booking' + journeyTypeForSet + 'InfantFare').text(infantFareValue);
            $('#booking' + journeyTypeForSet + 'InfantFullCharge').text(infantFullChargeValue);
        }

        $('#booking' + journeyTypeForSet + 'TotalFullCharge').text(convertCurrency(totalFullCharge.toString()));
        $('#booking' + journeyTypeForSet + 'TotalDiscount').text(convertCurrency(currentWayDiscount.toString()));
        $('#booking' + journeyTypeForSet + 'TotalAmount').text(convertCurrency(currentWayAmount.toString()));

        var departureTotalAmount = parseFloat($('input[name="_departureTotalAmount"]').val());
        var returnTotalAmount = parseFloat($('input[name="_returnTotalAmount"]').val());
        var totalAmount = departureTotalAmount + returnTotalAmount;
        var currencyValue = parseFloat($("#currencyValue").val());
        var totalAmountVND = Math.round((totalAmount * currencyValue) / 1000, 0) * 1000;
        $("#totalAmountVND").text(convertCurrency(totalAmountVND.toString()));
        $("#totalAmountVNDPlus").text(convertCurrency(totalAmountVND.toString()));
        $('#bookingTotalAmount').text(convertCurrency(totalAmount.toString()));
        $('#bookingTotalAmountPlus').text(convertCurrency(totalAmount.toString()));
        $("#passengers").html(adultno + childno + infantno);

        var isDomestic = $('#IsDomesticFlight').val();
        if (book.search.theme == 'SanVeRe' && isDomestic == 'True') {
            var dataToSendWP = {
                totalDeparture: convertCurrency(departureTotalAmount.toString()),
                totalReturn: convertCurrency(returnTotalAmount.toString()),
                routeNum: $('#Route').val(),
                total: convertCurrency(totalAmount.toString()),
            };

            // here setup in Scripts/pages/wp.page.crossdomain.js
            sendSelectedFlightSummaryToWP(JSON.stringify(dataToSendWP));
        }

        var departureAdultFare = parseFloat($('input[name="_departureAdultFare"]').val());
        var departureChildFare = parseFloat($('input[name="_departureChildFare"]').val());
        var departureInfantFare = parseFloat($('input[name="_departureInfantFare"]').val());
        var returnAdutFare = parseFloat($('input[name="_returnAdultFare"]').val());
        var returnChildFare = parseFloat($('input[name="_returnChildFare"]').val());
        var returnInfantFare = parseFloat($('input[name="_returnInfantFare"]').val());
        //var fareTotal = departureAdultFare * adultno + departureChildFare * childno + departureInfantFare * infantno+returnAdutFare*adultno+returnChildFare*childno+returnInfantFare*infantno;
        var departureSumFare = parseFloat($('input[name="_departureSumFare"]').val());
        var returnSumFare = parseFloat($('input[name="_returnSumFare"]').val());
        var fareTotal = departureSumFare + returnSumFare;
        $("#fareView").text(convertCurrency(fareTotal.toString()));

        var departureTotalFullCharge = parseFloat($('input[name="_departureTotalFullCharge"]').val());
        var retturnTotalFullCharge = parseFloat($('input[name="_returnTotalFullCharge"]').val());
        var sumFullCharge = departureTotalFullCharge + retturnTotalFullCharge;
        $("#totalFullCharge").text(convertCurrency(sumFullCharge.toString()));

        var departureTotalDiscount = parseFloat($('input[name="_departureTotalDiscount"]').val());
        var returnTotalDiscount = parseFloat($('input[name="_returnTotalDiscount"]').val());
        var totalDiscount = departureTotalDiscount + returnTotalDiscount;
        $("#totalDiscount").text(convertCurrency(totalDiscount.toString()));

        var departureAdultServiceFee = parseFloat($('input[name="_departureAdultServiceFee"]').val());
        $("#bookingDepartureAdultServiceFee").text(convertCurrency(departureAdultServiceFee.toString()));
        var departureChildServiceFee = parseFloat($('input[name="_departureChildServiceFee"]').val());
        $("#bookingDepartureChildServiceFee").text(convertCurrency(departureChildServiceFee.toString()));
        var departureInfantServiceFee = parseFloat($('input[name="_departureInfantServiceFee"]').val())
        $("#bookingDepartureInfantServiceFee").text(convertCurrency(departureInfantServiceFee.toString()));
        var departureTotalServiceFee = adultno * departureAdultServiceFee + childno * departureChildServiceFee + infantno * departureInfantServiceFee;
        $("#bookingDepartureTotalServiceFee").text(convertCurrency(departureTotalServiceFee.toString()));
        //var departureSumFare = adultno * adultFare + childno * childFare + infantno * infantFare;
        var departureTotalPriceOnTicket = departureSumFare + departureTotalFullCharge;
        $("#bookingDepartureTotalPriceOnTicket").text(convertCurrency(departureTotalPriceOnTicket.toString()));

        var returnAdultServiceFee = parseFloat($('input[name="_returnAdultServiceFee"]').val());
        $("#bookingReturnAdultServiceFee").text(convertCurrency(returnAdultServiceFee.toString()));
        var returnChildServiceFee = parseFloat($('input[name="_returnChildServiceFee"]').val());
        $("#bookingReturnChildServiceFee").text(convertCurrency(returnChildServiceFee.toString()));
        var returnInfantServiceFee = parseFloat($('input[name="_returnInfantServiceFee"]').val())
        $("#bookingReturnInfantServiceFee").text(convertCurrency(returnInfantServiceFee.toString()));
        var returnTotalServiceFee = adultno * returnAdultServiceFee + childno * returnChildServiceFee + infantno * returnInfantServiceFee;
        $("#bookingReturnTotalServiceFee").text(convertCurrency(returnTotalServiceFee.toString()));
        var totalService = departureTotalServiceFee + returnTotalServiceFee;
        $("#bookingTotalServiceFee").text(convertCurrency(totalService.toString()));
        //var returnSumFare = adultno * adultFare + childno * childFare + infantno * infantFare;
        var returnTotalPriceOnTicket = returnSumFare + retturnTotalFullCharge;
        $("#bookingReturnTotalPriceOnTicket").text(convertCurrency(returnTotalPriceOnTicket.toString()));

        var departureAdultCharge = parseFloat($('input[name="_departureAdultCharge"]').val());
        $("#bookingDepartureAdultCharge").text(convertCurrency(departureAdultCharge.toString()));
        var departureChildCharge = parseFloat($('input[name="_departureChildCharge"]').val());
        $("#bookingDepartureChildCharge").text(convertCurrency(departureChildCharge.toString()));
        var departureInfantCharge = parseFloat($('input[name="_departureInfantCharge"]').val());
        $("#bookingDepartureInfantCharge").text(convertCurrency(departureInfantCharge.toString()));

        var returnAdultCharge = parseFloat($('input[name="_returnAdultCharge"]').val());
        $("#bookingReturnAdultCharge").text(convertCurrency(returnAdultCharge.toString()));
        var returnChildCharge = parseFloat($('input[name="_returnChildCharge"]').val());
        $("#bookingReturnChildCharge").text(convertCurrency(returnChildCharge.toString()));
        var returnInfantCharge = parseFloat($('input[name="_returnInfantCharge"]').val());
        $("#bookingReturnInfantCharge").text(convertCurrency(returnInfantCharge.toString()));

        if (departureTime != undefined && departureTime.length >= 4) {
            var hour = departureTime.substring(0, 2);
            var minute = departureTime.substring(2, departureTime.length);

            if (modearline != 1 && $('#lbReturnTime').length != 0) {
                $('#lbReturnTime').text(hour + ":" + minute);
                $('#lbReturnDate').text(departureDate.format("dd/mm/yyyy"));
                $("#departureTimeView").text(hour + ":" + minute);
                $("#departureDateView").text(departureDate.format("ddd, dd MMM"));
                app.showMessageDialog("Thông báo", hour);
            }
            else if ($('#lbDepartureTime').length != 0) {
                $('#lbDepartureTime').text(hour + ":" + minute);
                $('#lbDepartureDate').text(departureDate.format("dd/mm/yyyy"));
                $("#departureTimeView").text(hour + ":" + minute);
                $("#departureDateView").text(departureDate.format("ddd, dd MMM"));
                app.showMessageDialog("Thông báo", "else" + hour);
            }
        }

        //Show is data < 0
        if (parseFloat($('#bookingReturnTotalDiscount').html()) > 0) $('#bookingReturnTotalDiscount').closest('.holder').show();
        else $('#bookingReturnTotalDiscount').closest('.holder').hide();
        if (parseFloat($('#bookingReturnBaggageFee').html()) > 0) $('#bookingReturnBaggageFee').closest('.holder').show();
        else $('#bookingReturnBaggageFee').closest('.holder').hide();

        if (parseFloat($('#bookingDepartureTotalDiscount').html()) > 0) $('#bookingDepartureTotalDiscount').closest('.holder').show();
        else $('#bookingDepartureTotalDiscount').closest('.holder').hide();
        if (parseFloat($('#bookingDepartureBaggageFee').html()) > 0) $('#bookingDepartureBaggageFee').closest('.holder').show();
        else $('#bookingDepartureBaggageFee').closest('.holder').hide();

        ////////////////////////////////////
        ////Update for SanVeRe
        ////////////////////////////////////
        if (book.search.theme === 'SanVeRe') {
            var flight_summary = $('#flight-summary-' + journeyType);
            var logoPath = $('input[name="' + journeyType + 'Flights[' + 0 + '].LogoPath"]').val();
            flight_summary.find('img.flight-logo').attr('src', logoPath);
            flight_summary.find('span').html(departureTime.substr(0, 2) + 'h' + departureTime.substr(2, 3) + '-' + arrivalTime.substr(0, 2) + 'h' + arrivalTime.substr(2, 3));

            if (journeyType == 'departure') {
                flight_summary.find('strong').html(convertCurrency(departureTotalAmount.toString()) + ' đ');
            }
            else
                flight_summary.find('strong').html(convertCurrency(returnTotalAmount.toString()) + ' đ');
            if ($('#IsDomesticFlight').val() != undefined && $('#IsDomesticFlight').val().toLowerCase() == 'false' && $('#Route').val() === '2') {
                var returnDepartureTime = $('input[name="' + 'returnFlights[' + 0 + '].DepartureTime"]').val();
                var returnArrivalTime = $('input[name="' + 'returnFlights[' + 0 + '].ArrivalTime"]').val();
                var returnDepartureDate = $('input[name="' + 'returnFlights[' + 0 + '].DepartureDate"]').val();
                var returnArrivalDate = $('input[name="' + 'returnFlights[' + 0 + '].ArrivalDate"]').val();

                flight_summary.find('.return-duration').html(returnDepartureTime.substr(0, 2) + 'h' + returnDepartureTime.substr(2, 3) + '-' + returnArrivalTime.substr(0, 2) + 'h' + returnArrivalTime.substr(2, 3));

                //flight_summary.find('.flight-departure-date').html(returnDepartureTime.substr(0, 2) + ':' + returnDepartureTime.substr(2, 3) + '  ' + returnDepartureDate.split(' ')[0]);
                //flight_summary.find('.flight-arrival-date').html(returnArrivalTime.substr(0, 2) + ':' + returnArrivalTime.substr(2, 3) + ' ' + returnArrivalDate.split(' ')[0]);
            }
        }

        app.resizeIframe(0, 0);
    },

    bookFlight: function (isInternationalFlight) {
        var routes = $(':input[name="radio_departure"]:checked').length + $(':input[name="radio_return"]:checked').length;
        var noOfRoutes = $('#Route').val();

        if (book.search.theme == 'Globalink'
            && $('#IsDomesticFlight').val() != undefined
            && $('#IsDomesticFlight').val().toLowerCase() === 'false'
            && noOfRoutes == '2'
            && $(':input[name="radio_departure"]:checked').length === 1) {
            routes = 2;
        }

        if (isInternationalFlight && routes == 1)
            noOfRoutes = routes;
        if (routes >= noOfRoutes) {
            //var data = unescape($('#selectFlightForm').serialize());
            var data = unescape($('.selected :input').serialize());

            //if ($('#Theme').val() == 'CCV_VNA')
            //    data = unescape($('#selectFlightForm').serialize());
            //url = "/Booking/ChooseFlight";
            //type = 'application/x-www-form-urlencoded';
            //if (book.search.theme == 'HongNgocHa' || book.search.theme == 'NamThanh') {
            url = "/Booking/ChooseFlightV2";
            data = {
                DepartureFlight: JSON.parse($('#tblDepartureFlight .select-flight.selected input.flightJson').val())
            };
            if ($('#Route').val() == 2) {
                //return domestic flight
                if (isInternationalFlight == false) {
                    data.ReturnFlight = JSON.parse($('#tblReturnFlight .select-flight.selected input.flightJson').val())
                }
                //return international flight 
                else {
                    data.ReturnFlight = JSON.parse($('#tblDepartureFlight .select-flight.selected input.returnFlightJson').val())
                }
            }
            data = JSON.stringify(data);
            type = "application/json";
            //}

            $.ajax({
                type: "POST",
                url: url,
                contentType: type,
                data: data,
                success: function (response) {
                    book.search.bookingFlightResponse(response);
                }
            });
        } else {
            window.dialog.display('Vui lòng chọn chuyến bay trước khi tiếp tục.', 'Thông báo lỗi');
        }

    },

    bookingFlightResponse: function (response) {
        if (response.Success == "true") {
            if ($('#ByPass123Pay').length > 0 && $('#ByPass123Pay').val().toLowerCase() == 'true') {
                if (response.ErrorMessage != "" && response.ErrorMessage != undefined) {
                    for (var d = 0; d < response.ErrorMessage.split(";").length; ++d) {
                        if (response.ErrorMessage.split(";")[d].toLowerCase() == "jetstar") {
                            $('#dialog-message-jetstar-promotion').dialog({
                                title: 'Thông báo',
                                close: function () {
                                    window.location.href = book.search.prettyUrlBookingInfo;
                                },
                                buttons: {
                                    Ok: function () {
                                        window.location.href = book.search.prettyUrlBookingInfo;
                                    }
                                }
                            });
                        }
                        else {
                            if (response.ErrorMessage.split(";")[d].toLowerCase() == "vietjet") {
                                $('#dialog-message-vietjet-promotion').dialog({
                                    title: 'Thông báo',
                                    close: function () {
                                        window.location.href = book.search.prettyUrlBookingInfo;
                                    },
                                    buttons: {
                                        Ok: function () {
                                            window.location.href = book.search.prettyUrlBookingInfo;
                                        }
                                    }
                                });
                            }
                        }
                    }

                }
                else {
                    window.location.href = book.search.prettyUrlBookingInfo;
                }
            }
            else {
                window.location.href = book.search.prettyUrlBookingInfo;
            }
        } else {
            if ($('#LimitOnlinePaymentMethod').length > 0 && $('#LimitOnlinePaymentMethod').val().toLowerCase() == "true") {
                $('#dialog-message-booking-time-limit').dialog({
                    title: 'Thông báo',
                    close: function () {
                        window.location.href = book.search.prettyUrlBookingInfo;
                    },
                    buttons: {
                        Ok: function () {
                            window.location.href = book.search.prettyUrlBookingInfo;
                        }
                    }
                });
            }
            else if (response.Success === "Error.No.Flight") {
                window.dialog.display('Vui lòng chọn chuyến bay', 'Thông báo lỗi');
            } else {
                window.dialog.display(response.ErrorMessage, 'Thông báo lỗi');

            }
        }
    },

    /////////////////////////////////////////////
    //UPDATE SEARCH BY STEP
    /////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////
    //List Airline can search
    ////////////////////////////////////////////////////////////////
    listAirlineIds: ['JETSTAR', 'VIETJET', 'VNA', 'BAMBOO', 'VIETTRAVEL'],


    ////////////////////////////////////////////////////////////////
    //Maximum Airlines can search
    ////////////////////////////////////////////////////////////////
    maxAirlineIdSearch: 3,

    ////////////////////////////////////////////////////////////////
    //Count completed search
    ////////////////////////////////////////////////////////////////
    countAirlineIdSearch: 0,

    /////////////////////////////////////////////////////////////////
    wasShowButtonContinue: false,
    ////////////////////////////////////////////////////////////////
    lstBestPriceDepartureFlightsOfEachAirline: [],
    ////////////////////////////////////////////////////////////////
    lstBestPriceReturnFlightsOfEachAirline: [],
    ///////////////////////////////////////////////////////////////
    countDepartureAirlineHasFlight: 0,
    ///////////////////////////////////////////////////////////////
    countReturnAirlineHasFlight: 0,
    ////////////////////////////////////////////////////////////////
    lstExceptAirlineDisplayOnTop: [],
    ////////////////////////////////////////////////////////////////
    // Init list airline to search
    ////////////////////////////////////////////////////////////////
    initListAirlineForSearch: function (isDomestic) {

        var listAirline = "JETSTAR;VIETJET;VNA;BAMBOO;VIETRAVEL";
        if (isDomestic.toLowerCase() == 'false') {
            listAirline = listAirline + ';INTERNATIONAL';
        }

        if ($('#listAirlineForSearch').val() != undefined && $('#listAirlineForSearch').val() != "") {
            listAirline = $('#listAirlineForSearch').val();
        }

        book.search.listAirlineIds = listAirline.split(';');
        if ($("#listExceptAirlineDisplayOnTop").val() != undefined && $("#listExceptAirlineDisplayOnTop").val() != "") {
            book.search.lstExceptAirlineDisplayOnTop = $("#listExceptAirlineDisplayOnTop").val().split(';');
        }

        book.search.maxAirlineIdSearch = book.search.listAirlineIds.length;
        book.search.countAirlineIdSearch = 0;
        book.search.countDepartureAirlineHasFlight = 0;
        book.search.countReturnAirlineHasFlight = 0;
    },

    ////////////////////////////////////////////////////////////////
    //Step by step search by airline
    ////////////////////////////////////////////////////////////////
    loadFlightsByAirlines: function (isDomestic) {
        book.search.wasShowButtonContinue = false;
        book.search.initListAirlineForSearch(isDomestic);
        for (var i = 0; i < book.search.maxAirlineIdSearch; i++) {
            book.search.loadFlightsByAirline(book.search.listAirlineIds[i]);
        }

    },

    ////////////////////////////////////////////////////////////////
    //Search by Airline
    ////////////////////////////////////////////////////////////////
    loadFlightsByAirline: function (airlineId) {

        $.ajax({
            url: '/Booking/SearchFlightsByAirline',
            type: 'POST',
            data: { airlineId: airlineId },
            success: function (response) {
                book.search.completeLoadFilghtsByAirline(response);
            },
            error: function (jqXHR, textStatus) {
                if (textStatus === 'timeout') {
                    //alert('Failed from timeout');
                    //do something. Try again perhaps?
                }
            },
            complete: function () {
                book.search.countAirlineIdSearch++;
                book.search.processLoadFlightCompleted();
            },
            timeout: 60000 // sets timeout to 60 seconds
        });
    },

    ////////////////////////////////////////////////////////////////
    //Check completed and do somthing when search all airline
    ////////////////////////////////////////////////////////////////
    processLoadFlightCompleted: function () {
        //var theme = $('#Theme').val();
        if ($('#tblDepartureFlight tbody tr').length > 0) {
            book.search.showButtonContinue();

            //for(var i=0;i<$('#tblDepartureFlight tbody tr').length;i++)
            //{
            //    $('#tblDepartureFlight tbody tr').each(function () {
            //        $('#departureFlights_0*').update("departureFlights_" + i);
            //    });
            //}
        }
        if (book.search.countAirlineIdSearch == book.search.maxAirlineIdSearch) {
            $('#searchLoadingDeparture').remove();
            $('#searchLoadingReturn').remove();
            if ($('#tblDepartureFlight tbody tr').length <= 0) {
                //if (theme === 'Globalink') $('#searchLoadingDeparture .lmod').html('Không tìm thấy chuyến bay. Quý khách vui lòng liên hệ với chúng tôi để được trợ giúp!');
                //else $('#searchLoadingDeparture .lmod').html('Không tìm thấy chuyến bay!');
                if ($('#isDisplayBestPriceOnTop').val() != undefined && $('#isDisplayBestPriceOnTop').val().toLowerCase() == 'true') {
                    if (book.search.lstBestPriceDepartureFlightsOfEachAirline.length <= 0) {
                        $('#send-request-departure').show();
                    }
                    else {
                        book.search.showButtonContinue();
                    }
                }
                else {
                    $('#send-request-departure').show();
                }

            }
            else {
                book.search.showButtonContinue();
            }

            if ($('#tblReturnFlight') != undefined && $('#tblReturnFlight tbody tr').length <= 0) {
                //if (theme === 'Globalink') $('#searchLoadingReturn .lmod').html('Không tìm thấy chuyến bay. Quý khách vui lòng liên hệ với chúng tôi để được trợ giúp!');
                //else $('#searchLoadingReturn .lmod').html('Không tìm thấy chuyến bay!');
                if ($('#isDisplayBestPriceOnTop').val() != undefined && $('#isDisplayBestPriceOnTop').val().toLowerCase() == 'true') {
                    if (book.search.lstBestPriceReturnFlightsOfEachAirline.length <= 0) {
                        $('#send-request-return').show();
                    }
                }
                else {
                    $('#send-request-return').show();
                }

            }

            book.search.sortFlights();
            book.search.sortFilghtsRadio();
            //book.search.loadBookingSummary();
            $('#flightFilter').load('/Booking/LoadFlightFilter', function () {
                app.resizeIframe(0, 0);
            });
        }
        app.resizeIframe(0, 0);


    },
    groupBy: function (list, fn) {
        var groups = {};
        for (var i = 0; i < list.length; i++) {
            var group = JSON.stringify(fn(list[i]));
            if (group in groups) {
                groups[group].push(list[i]);
            } else {
                groups[group] = [list[i]];
            }
        }
        return Object.keys(groups).map(function (group) {
            return groups[group];
        })
    },

    ////////////////////////////////////////////////////////////////
    //Search by airline. Ocur when search complete
    ////////////////////////////////////////////////////////////////
    completeLoadFilghtsByAirline: function (response) {
        if (response != null && response.rMessage!=null && response.rMessage.Result) {

            if (response.result.DepartureFlightHtmls.length > 0) {

                //check if dispaly best price on top
                if ($('#isDisplayBestPriceOnTop').val() != undefined && $('#isDisplayBestPriceOnTop').val().toLowerCase() == 'true') {
                    if (!book.search.exceptAirlineDisplayOnTop(response.result.DepartureFlightHtmls[0].FlightAirline)) {
                        var depatureFlights = response.result.DepartureFlightHtmls;
                        var flightsGroups = book.search.groupBy(response.result.DepartureFlightHtmls, function (item) {
                            return [item.FlightAirline];
                        });
                        if (flightsGroups.length >= 2) {
                            response.result.DepartureFlightHtmls = response.result.DepartureFlightHtmls.slice(response.result.DepartureFlightHtmls.length, response.result.DepartureFlightHtmls.length);
                            for (var i = 0; i <= flightsGroups.length - 1; i++) {
                                book.search.countDepartureAirlineHasFlight++;
                                book.search.lstBestPriceDepartureFlightsOfEachAirline.push(flightsGroups[i][0]);
                                flightsGroups[i] = flightsGroups[i].slice(1, flightsGroups[i].length);
                                for (var j = 0; j <= flightsGroups[i].length - 1; j++) {
                                    response.result.DepartureFlightHtmls.push(flightsGroups[i][j]);
                                }
                            }

                        }
                        else {
                            book.search.countDepartureAirlineHasFlight++;
                            book.search.lstBestPriceDepartureFlightsOfEachAirline.push(depatureFlights[0]);
                            response.result.DepartureFlightHtmls = response.result.DepartureFlightHtmls.slice(1, response.result.DepartureFlightHtmls.length);
                        }
                    }

                }

                var departureFlightHtml = response.result.DepartureFlightHtmls.map(e => e.Html).join('');
                $('#tblDepartureFlight >tbody').append(departureFlightHtml);

                app.resizeIframe(0, 0);
            }

            if (response.result.ReturnFlightHtmls != null && response.result.ReturnFlightHtmls.length > 0) {
                book.search.countReturnAirlineHasFlight++;
                if ($('#isDisplayBestPriceOnTop').val() != undefined && $('#isDisplayBestPriceOnTop').val().toLowerCase() == 'true') {
                    if (!book.search.exceptAirlineDisplayOnTop(response.result.ReturnFlightHtmls[0].FlightAirline)) {
                        var returnFlights = response.result.ReturnFlightHtmls;
                        book.search.lstBestPriceReturnFlightsOfEachAirline.push(returnFlights[0]);
                        response.result.ReturnFlightHtmls = response.result.ReturnFlightHtmls.slice(1, response.result.ReturnFlightHtmls.length);
                    }
                }

                var returnFlightHtml = response.result.ReturnFlightHtmls.map(e => e.Html).join('');
                $('#tblReturnFlight >tbody').append(returnFlightHtml);
                app.resizeIframe(0, 0);
            }
            //check if theme is support pagging
            if ($('#IsPagination').val() != undefined && $('#IsPagination').val().toLowerCase() == 'true' && $('#IsDomesticFlight').val() != undefined && $('#IsDomesticFlight').val().toLowerCase() == 'false') {
                $('#paginginfo').html('');
                book.search.tablePaging();
            }
            //update best price in calendar
            if ($('#HasTheBestPriceShowOnTheCalendar').val() != undefined && $('#HasTheBestPriceShowOnTheCalendar').val().toLowerCase() == 'true' && $('#IsDomesticFlight').val() != undefined && $('#IsDomesticFlight').val().toLowerCase() == 'true') {
                var bestPriceOfDeparture = $('#tblDepartureFlight').children('tbody').children('tr:first').children('td.col-price').children('span').children('strong').html();
                var bestPriceOfReturn = $('#tblReturnFlight').children('tbody').children('tr:first').children('td.col-price').children('span').children('strong').html();
                $('#dates-departure ul li.active span').html(bestPriceOfDeparture);
                $('#dates-return ul li.active span').html(bestPriceOfReturn);

            }
        }

        app.resizeIframe(0, 0);
    },

    ////////////////////////////////////////////////////////////////
    //Sort
    ////////////////////////////////////////////////////////////////
    insertFlight: function (tblFlightText, data) {
        var ulTab = tblFlightText + ' tbody';
        var flights = $('#' + ulTab + ' tr');
        var index = -1;
        var isEndOfFlight = true;
        for (var i = 0; i < $(flights).length; i++) {
            index++;
            var totalAdultFare_i = parseFloat($(flights[i]).find($('input[name*="AdultFare"]')).val());
            if (totalAdultFare_i > data.AdultFare) {
                isEndOfFlight = false;
                break;
            }
        }
        if (index == -1)// đầu tiên
            $('#' + ulTab).append(data.Html);
        else if (!isEndOfFlight)// có 1 chuyến lơn hơn thì chèn trước
            $(flights[index]).before(data.Html);
        else
            $(flights[index]).after(data.Html);

        app.resizeIframe(0, 0);
    },

    // Sort table filghts
    sortFlights: function () {
        var tableDeparture = $("#tblDepartureFlight").stupidtable();

        var tblReturnFlight = $("#tblReturnFlight").stupidtable();

        var priceSortDeparture = tableDeparture.find("thead tr th.col-sort-default");
        priceSortDeparture.click(); // asc
        var priceSortReturn = tblReturnFlight.find("thead tr th.col-sort-default");
        priceSortReturn.click(); // asc;

    },

    sortFilghtsRadio: function () {
        var tableDeparture = $("#tblDepartureFlight").stupidtable();
        var tblReturnFlight = $("#tblReturnFlight").stupidtable();
        $("#dataSortAirline").click(function () {
            var airlineSort = tableDeparture.find("thead tr .col-airlines-info");
            airlineSort.click();
        });
        $("#dataSortDeparture").click(function () {
            var departureSort = tableDeparture.find("thead tr .departure");
            departureSort.click();
        });
        $("#dataSortPrice").click(function () {
            var priceSort = tableDeparture.find("thead tr .col-sort-default");
            priceSort.click();
        });
        $("#returnDataSortAirline").click(function () {
            var airlineSort = tblReturnFlight.find("thead tr .col-airlines-info");
            airlineSort.click();
        });
        $("#returnDataSortDeparture").click(function () {
            var departureSort = tblReturnFlight.find("thead tr .departure");
            departureSort.click();
        });
        $("#returnDataSortPrice").click(function () {
            var departureSort = tblReturnFlight.find("thead tr .col-sort-default");
            departureSort.click();
        });
    },
    sortBestPriceDepartureFlightsOfAirline: function () {
        if (book.search.lstBestPriceDepartureFlightsOfEachAirline.length > 0) {
            book.search.lstBestPriceDepartureFlightsOfEachAirline.sort(function (a, b) {
                return a.AdultFare - b.AdultFare;
            });
            if (book.search.theme == "HongNgocHa" || book.search.theme == "HongNgocHa_V2" || book.search.theme == "Ve247_vn" || book.search.theme == "AirGoGo" || book.search.theme == "Sea" || book.search.theme == "PhuThinh" || book.search.theme == "BaseVeMayBay") {
                book.search.lstBestPriceDepartureFlightsOfEachAirline.sort(function (a, b) {
                    return a.TotalAmount - b.TotalAmount;
                });
            }
            for (var i = book.search.lstBestPriceDepartureFlightsOfEachAirline.length - 1; i >= 0; i--) {
                var tblDepartureFlight = $('#tblDepartureFlight tbody tr');
                if (tblDepartureFlight.length > 0) {
                    $('#tblDepartureFlight tbody tr').first().before(book.search.lstBestPriceDepartureFlightsOfEachAirline[i].Html);
                }
                else {
                    $('#tblDepartureFlight tbody').append(book.search.lstBestPriceDepartureFlightsOfEachAirline[i].Html);
                }
                $('#tblDepartureFlight tbody tr').first().addClass("best-price-hightlight");
            }

        }
    },
    sortBestPriceReturnFlightsOfAirline: function () {

        if (book.search.lstBestPriceReturnFlightsOfEachAirline.length > 0) {
            book.search.lstBestPriceReturnFlightsOfEachAirline.sort(function (a, b) {
                return a.AdultFare - b.AdultFare;
            });
            if (book.search.theme == "HongNgocHa" || book.search.theme == "HongNgocHa_V2" || book.search.theme == "Ve247_vn" || book.search.theme == "AirGoGo" || book.search.theme == "Sea" || book.search.theme == "PhuThinh" || book.search.theme == "BaseVeMayBay") {
                book.search.lstBestPriceReturnFlightsOfEachAirline.sort(function (a, b) {
                    return a.TotalAmount - b.TotalAmount;
                });
            }
            for (var i = book.search.lstBestPriceReturnFlightsOfEachAirline.length - 1; i >= 0; i--) {
                var tblReturnFlight = $('#tblReturnFlight tbody tr');
                if (tblReturnFlight.length > 0) {
                    $('#tblReturnFlight tbody tr').first().before(book.search.lstBestPriceReturnFlightsOfEachAirline[i].Html);
                }
                else {
                    $('#tblReturnFlight tbody').append(book.search.lstBestPriceReturnFlightsOfEachAirline[i].Html);
                }
                $('#tblReturnFlight tbody tr').first().addClass("best-price-hightlight");
            }

        }
    },
    exceptAirlineDisplayOnTop: function (airline) {
        if (book.search.lstExceptAirlineDisplayOnTop.length > 0) {
            for (var i = 0; i <= book.search.lstExceptAirlineDisplayOnTop.length; i++) {
                if (airline.toUpperCase() == book.search.lstExceptAirlineDisplayOnTop[i])
                    return true;

            }
            return false;
        }
    },

    // Pagging data when load flight by airline complete
    initializePaging: function () {
        var totalCount = $("#paginginfo .pagingTotalCount").text();
        var pageSize = $("#paginginfo .pagingPageSize").text();
        var pageNum = $("#pageNum");
        if (parseInt(totalCount) == 0) {
            $("#paginginfo").hide();
        }
        else {

            pageNum.html("");
            pageNum.append($("<input name='pageNo' class='previousNum' type='button'/>").val("<"));

            var num = Math.ceil(totalCount / pageSize);

            for (var i = 1; i <= num; i++) {
                if (i == 1) {
                    pageNum.append($("<input name='pageNo' class='activeNum' type='button'/>").val(i));
                }
                else {
                    pageNum.append($("<input name='pageNo' type='button'/>").val(i));
                }
            }
            pageNum.append($("<input name='pageNo' class='nextNum' type='button'/>").val(">"));
            $("#paginginfo").show();
        }
    },

    tablePaging: function () {
        var pageSize = $('#PageSize').val();
        $('#tblDepartureFlight').each(function () {
            var currentPage = 0;
            var numPerPage = 10;
            if (pageSize != undefined) {
                numPerPage = parseInt(pageSize);
            }
            var $table = $(this);
            $table.bind('repaginate', function () {
                $table.find('tbody tr').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
            });
            $table.trigger('repaginate');
            var numRows = $table.find('tbody tr').length;
            var numPages = Math.ceil(numRows / numPerPage);
            var $pager = $('<div class="pager"></div>');
            var $previous = $('<span class="previous"><<</spnan>');
            var $next = $('<span class="next">>></spnan>');

            //$('<span class="previous"></span>').appendTo($pager);
            for (var page = 0; page < numPages; page++) {
                $('<span class="page-number"></span>').text(page + 1).bind('click', {
                    newPage: page
                }, function (event) {
                    currentPage = event.data['newPage'];
                    $table.trigger('repaginate');
                    $(this).addClass('active').siblings().removeClass('active');
                }).appendTo($pager).addClass('clickable');
            }
            //$('<span class="next"></span>').appendTo($pager);
            //$pager.insertBefore($table).find('span.page-number:first').addClass('active');
            //$('span.page-number:first').addClass('active');
            $pager.find('span.page-number:first').addClass('active');
            $paginginfo = $('#paginginfo');
            $paginginfo.append($pager);
            //$pager.insertAfter($table).find('span.page-number:first').addClass('active');
            $previous.insertBefore('span.page-number:first');
            $next.insertAfter('span.page-number:last');

            $next.click(function (e) {
                $previous.addClass('clickable');
                $pager.find('.active').next('.page-number.clickable').click();
            });
            $previous.click(function (e) {
                $next.addClass('clickable');
                $pager.find('.active').prev('.page-number.clickable').click();
            });
            $table.on('repaginate', function () {
                $next.addClass('clickable');
                $previous.addClass('clickable');

                setTimeout(function () {
                    var $active = $pager.find('.page-number.active');
                    if ($active.next('.page-number.clickable').length === 0) {
                        $next.removeClass('clickable');
                    } else if ($active.prev('.page-number.clickable').length === 0) {
                        $previous.removeClass('clickable');
                    }
                });
            });
            $table.trigger('repaginate');
        });

    }
})