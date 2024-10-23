/* Minification failed. Returning unminified contents.
(154,26-27): run-time error JS1003: Expected ':': (
(154,37-38): run-time error JS1100: Expected ',': {
(155,20-21): run-time error JS1014: Invalid character: `
(155,22-23): run-time error JS1004: Expected ';': {
(155,41-42): run-time error JS1004: Expected ';': {
(155,51-52): run-time error JS1014: Invalid character: `
(156,10-11): run-time error JS1195: Expected expression: ,
(158,38-39): run-time error JS1004: Expected ';': {
(188,27-28): run-time error JS1014: Invalid character: `
(188,29-30): run-time error JS1193: Expected ',' or ')': {
(188,51-52): run-time error JS1014: Invalid character: `
(188,52-53): run-time error JS1195: Expected expression: )
(189,27-28): run-time error JS1014: Invalid character: `
(189,29-30): run-time error JS1193: Expected ',' or ')': {
(189,48-49): run-time error JS1014: Invalid character: `
(189,49-50): run-time error JS1195: Expected expression: )
(190,27-28): run-time error JS1014: Invalid character: `
(190,48-49): run-time error JS1014: Invalid character: `
(190,49-50): run-time error JS1195: Expected expression: )
(191,23-27): run-time error JS1034: Unmatched 'else'; no 'if' defined: else
(192,27-28): run-time error JS1014: Invalid character: `
(192,47-48): run-time error JS1002: Syntax error: }
(192,48-49): run-time error JS1014: Invalid character: `
(193,81-82): run-time error JS1004: Expected ';': {
(195,31-32): run-time error JS1014: Invalid character: `
(195,33-34): run-time error JS1193: Expected ',' or ')': {
(195,55-56): run-time error JS1014: Invalid character: `
(195,56-57): run-time error JS1195: Expected expression: )
(196,31-32): run-time error JS1014: Invalid character: `
(196,52-53): run-time error JS1014: Invalid character: `
(196,53-54): run-time error JS1195: Expected expression: )
(196,59-60): run-time error JS1197: Too many errors. The file might not be a JavaScript file: (
 */
/// <reference path="../js/vendor/jquery.js" />

Define("dialog", {
    display: function (msg, title, options) {
        dialog.show(title, msg, options);
    },

    show: function (title, content, options) {
        var initialOptions = {
            title: title,
            buttons:
                [{
                    text: "OK", click: function () { $(this).dialog("close"); }
                }],
            modal: true
        };
        $('#dialog').html(content).dialog($.extend(true, initialOptions, options));
    }
});
function flightSearchDialog() {
    return {
        containerId: '',
        dialogLocationId: '',
        dialogSearchError: '',
        departureDateId: '',
        returnDateId: '',
        isLoading: false,
        enableShowLowestPriceOnSearchBox: false,
        validatesentmail: function () {
            var isValidEmail = true;
            var email = $('#emailCustomer').val();
            if (email == undefined || email == '' || (email != '' && !share.flight_search_dialog.isValidEmailCustom(email))) {
                isValidEmail = false;
            }
            return isValidEmail;
        },

        isValidEmailCustom: function (email) {
            // var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var re = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
            return re.test(email);
        },

        /*
        *
        * This function support switch DepartureCity and ArrivalCity
        *
        */
        switchLocations: function () {
            var departureCity = $(this.wrapWithContainer('#DepartureCity')).val();
            $(this.wrapWithContainer('#DepartureCity')).val($(this.wrapWithContainer('#ArrivalCity')).val());
            $(this.wrapWithContainer('#ArrivalCity')).val(departureCity);

            var departureCityCountry = $(this.wrapWithContainer('#DepartureCityCountry')).val();
            $(this.wrapWithContainer('#DepartureCityCountry')).val($(this.wrapWithContainer('#ArrivalCityCountry')).val());
            $(this.wrapWithContainer('#ArrivalCityCountry')).val(departureCityCountry);
            $(this.wrapWithContainer('#departure-country')).val($(this.wrapWithContainer('#ArrivalCityCountry')).val());
            $(this.wrapWithContainer('#arrival-counry')).val(departureCityCountry);

            departureCityName = $(this.wrapWithContainer('#DepartureCity-Holder')).val();
            $(this.wrapWithContainer('#DepartureCity-Holder')).val($(this.wrapWithContainer('#ArrivalCity-Holder')).val());
            $(this.wrapWithContainer('#ArrivalCity-Holder')).val(departureCityName);
        },

        /*
        *
        * This function support updatePaxInfo
        *
        */
        updatePaxInfo: function () {
            var adultNo = $(this.wrapWithContainer('[name="AdultNo"]')).val();
            var childNo = $(this.wrapWithContainer('[name="ChildNo"]')).val();
            var infantNo = $(this.wrapWithContainer('[name="InfantNo"]')).val();


            if ($(this.wrapWithContainer('#viewPassengerInfoContent #adultLabel')).length <= 0) {
                var html = adultNo + ' người lớn, ' + childNo + ' trẻ em, ' + infantNo + ' sơ sinh';
                $(this.wrapWithContainer('#viewPassengerInfoContent')).html(html);
            }
            else {
                $(this.wrapWithContainer('#viewPassengerInfoContent #adultLabel')).text(adultNo);
                $(this.wrapWithContainer('#viewPassengerInfoContent #childLabel')).text(childNo);
                $(this.wrapWithContainer('#viewPassengerInfoContent #infantLabel')).text(infantNo);
            }
        },

        initStepperChoosePassenger: function () {
            var self = this;
            if ($(self.wrapWithContainer('.btn-plus')).length > 0) {
                $(self.wrapWithContainer('#viewPassengerInfoContent_dropdownContent li[data-passenger="adult"]')).find('.step-number').text($(self.wrapWithContainer('[name="AdultNo"]')).val());
                $(self.wrapWithContainer('#viewPassengerInfoContent_dropdownContent li[data-passenger="child"]')).find('.step-number').text($(self.wrapWithContainer('[name="ChildNo"]')).val());
                $(self.wrapWithContainer('#viewPassengerInfoContent_dropdownContent li[data-passenger="infant"]')).find('.step-number').text($(self.wrapWithContainer('[name="InfantNo"]')).val());

                $(self.wrapWithContainer('.btn-plus')).click(function () {
                    var step = $(this).closest('li[data-passenger]').find('.step-number').text();
                    var stepnum = parseInt(step);
                    var max = parseInt($(this).closest('li[data-passenger]').data('max'));
                    if (stepnum + 1 <= max) {
                        stepnum++;

                        var paxType = $(this).closest('li[data-passenger]').data('passenger');

                        if (paxType == 'infant' && stepnum > $(self.wrapWithContainer('[name="AdultNo"]')).val()) {
                            return;
                        }

                        $(this).closest('li[data-passenger]').find('.step-number').text(stepnum);

                        if (paxType == 'adult') {
                            $(self.wrapWithContainer('[name="AdultNo"]')).val(stepnum);
                        }
                        else if (paxType == 'child') {
                            $(self.wrapWithContainer('[name="ChildNo"]')).val(stepnum);
                        }
                        else if (paxType == 'infant') {
                            $(self.wrapWithContainer('[name="InfantNo"]')).val(stepnum);
                        }

                        self.updatePaxInfo();
                    }
                });

                $(self.wrapWithContainer('.btn-minus')).click(function () {

                    var step = $(this).closest('li[data-passenger]').find('.step-number').text();
                    var stepnum = parseInt(step);
                    var min = parseInt($(this).closest('li[data-passenger]').data('min'));
                    if (stepnum - 1 >= min) {
                        stepnum--;

                        var paxType = $(this).closest('li[data-passenger]').data('passenger');

                        if (paxType == 'adult' && stepnum < $(self.wrapWithContainer('[name="InfantNo"]')).val()) {
                            return;
                        }
                        $(this).closest('li[data-passenger]').find('.step-number').text(stepnum);

                        if (paxType == 'adult') {
                            $(self.wrapWithContainer('[name="AdultNo"]')).val(stepnum);
                        }
                        else if (paxType == 'child') {
                            $(self.wrapWithContainer('[name="ChildNo"]')).val(stepnum);
                        }
                        else {
                            $(self.wrapWithContainer('[name="InfantNo"]')).val(stepnum);
                        }

                        self.updatePaxInfo();
                    }
                });
            }
        },

        wrapWithContainer(selector) {
            return `${this.containerId}${selector}`;
        },

        load: function (containerId) {
            if (containerId) {
                this.containerId = containerId + ' ';
                let uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2);
                this.dialogLocationId = '#departure-location-dlg-' + uniqueId;
                this.departureDateId = '#depatureDate-' + uniqueId;
                this.returnDateId = '#returnDate-' + uniqueId;
                this.dialogSearchError = '#search-error-dlg-' + uniqueId;
                $(this.wrapWithContainer('#depatureDate')).attr("id", this.departureDateId.replace('#', ''));
                $(this.wrapWithContainer('#returnDate')).attr("id", this.returnDateId.replace('#', ''));
                $(this.wrapWithContainer('#search-error-dlg')).attr("id", this.dialogSearchError.replace('#', '')).addClass('search-error-dlg');
            }
            else {
                this.dialogLocationId = '#departure-location-dlg';
                this.departureDateId = '#depatureDate';
                this.returnDateId = '#returnDate';
                this.dialogSearchError = '#search-error-dlg';
            }

            if ($(this.wrapWithContainer('#EnableShowLowestPriceOnSearchBox')).val() != undefined) {
                if ($(this.wrapWithContainer('#EnableShowLowestPriceOnSearchBox')).val() != null && $(this.wrapWithContainer('#EnableShowLowestPriceOnSearchBox')).val() == 'true')
                    share.flight_search_dialog.enableShowLowestPriceOnSearchBox = true;
            }
            var theme = $('#Theme').val();

            var self = this;
            $(this.wrapWithContainer("input[name=JourneyType]:radio")).on("change", function () {

                if (theme != 'Globalink' && theme != 'HongNgocHa' && theme != 'HongNgocHa_V2') {
                    if ($(this).is(':checked') && $(this).attr('id') === 'radioOneWay') {
                        $(`${self.departureDateId}`).datepickerlunar("option", 'maxDate', null);
                        $(`${self.returnDateId}`).attr('disabled', 'disabled');
                        $(`${self.returnDateId}`).val('');
                    } else
                        $(`${self.returnDateId}`).removeAttr('disabled');
                    if (self.containerId === '#quick-search-dialog-secondary ') {
                        if ($(this).is(':checked') && $(this).attr('id') === 'radioOneWaySecondary') {
                            $(`${self.departureDateId}`).datepickerlunar("option", 'maxDate', null);
                            $(`${self.returnDateId}`).attr('disabled', 'disabled');
                            $(`${self.returnDateId}`).val('');
                        } else
                            $(`${self.returnDateId}`).removeAttr('disabled');
                    }
                } else if (theme == 'HongNgocHa' || theme == 'HongNgocHa_V2') {
                    if ($(this).is(':checked') && $(this).attr('id') === 'radioOneWay') {
                        $(`${self.returnDateId}`).attr('disabled', 'disabled');
                    } else
                        $(`${self.returnDateId}`).removeAttr('disabled');
                }
            });

            this.initLocationCookie(theme);

            $(this.wrapWithContainer('.mooncalendar')).bind('click', function () {
                //var win = window.open('http://www.informatik.uni-leipzig.de/~duc/amlich/PHP/index.php', 'Tra cứu lịch âm', 'width=500,height=550');
                $(self.wrapWithContainer('#popup'))
                    .html("<iframe src='http://www.informatik.uni-leipzig.de/~duc/amlich/PHP/index.php\' width='500' height='600'></iframe>")
                    .dialog(
                        {
                            title: 've24h.vn',
                            width: 550,
                            height: 600,
                            modal: true
                        }).dialog("open");
            });

            $(this.wrapWithContainer('.dateicon')).bind('click', function () {
                var $input = $(this).prev();
                if ($input.attr('disabled') !== 'disabled')
                    $input.datepicker('show');
            });

            $(this.wrapWithContainer('#flightSearchForm')).submit(function (event) {
                var msg = '';
                var success = true;
                var count = 0;
                if ($(self.wrapWithContainer('#DepartureCity')).val() == '') {
                    msg += 'Vui lòng chọn điểm khởi hành! <br />';
                    success = false;
                    count++;
                    $(`${self.dialogSearchError}`).attr('data-error', '1');
                }
                if ($(self.wrapWithContainer('#ArrivalCity')).val() == '') {
                    msg += 'Vui lòng chọn điểm đến! <br />';
                    success = false;
                    if (count == 0) {
                        count = 2;
                        $(`${self.dialogSearchError}`).attr('data-error', '2');
                    }
                }
                if ($(`${self.departureDateId}`).val() == '') {
                    msg += 'Vui lòng chọn ngày đi! <br />';
                    success = false;
                    if (count == 0) {
                        count = 3;
                        $(`${self.dialogSearchError}`).attr('data-error', '3');
                    }
                }

                if ($(self.wrapWithContainer('#radioRoundTrip')).is(':checked') && ($(`${self.returnDateId}`).val() == '' || $(`${self.returnDateId}`).val() == '')) {
                    if (theme != 'Globalink') {
                        msg += 'Vui lòng chọn ngày về! <br />';
                        success = false;
                        if (count == 0) {
                            count = 4;
                            $(`${self.dialogSearchError}`).attr('data-error', '4');
                        }
                    }
                }

                if ($(self.wrapWithContainer('#radioRoundTripSecondary')).is(':checked') && ($(`${self.returnDateId}`).val() == '' || $(`${self.returnDateId}`).val() == '')) {
                    if (theme != 'Globalink') {
                        msg += 'Vui lòng chọn ngày về! <br />';
                        success = false;
                        if (count == 0) {
                            count = 4;
                            $(`${self.dialogSearchError}`).attr('data-error', '4');
                        }
                    }
                }


                if (parseInt($(self.wrapWithContainer('select[name="InfantNo"]')).val()) > parseInt($(self.wrapWithContainer('select[name="AdultNo"]')).val())) {
                    msg += "Số khách em bé nhiều hơn số khách người lớn. Vui lòng chọn lại! <br/>";
                    success = false;
                    if (count == 0) {
                        count = 5;
                        $(`${self.dialogSearchError}`).attr('data-error', '5');
                    }
                }

                if (!success) {
                    event.preventDefault();
                    $(`${self.dialogSearchError} #errormessage`).html(msg);
                    //window.dialog.display(msg, 'Error');
                    $dialogerorr.dialog('option', 'title', 'Lỗi phát sinh');
                    //$dialogerorr.dialog('option', 'position', { my: "left top", at: "left bottom", of: e.target });
                    $dialogerorr.dialog('open');
                } else {
                    self.saveLocationCookie();

                    $(`${self.dialogSearchError} #errormessage`).html("");
                    $(`${self.dialogSearchError}`).attr('data-error', '0');
                    self.submitSearchFlightPrettyUrl(event);
                }
            });

            if ($(this.wrapWithContainer('#btn-switch')).length > 0) {
                $(this.wrapWithContainer('#btn-switch')).click(function () {
                    self.switchLocations();
                });
            }

            if ($(this.wrapWithContainer('#viewPassengerInfoContent')).length > 0) {
                $(this.wrapWithContainer('select[name="AdultNo"]')).change(function () {
                    self.updatePaxInfo();
                });
                $(this.wrapWithContainer('select[name="ChildNo"]')).change(function () {
                    self.updatePaxInfo();
                });
                $(this.wrapWithContainer('select[name="InfantNo"]')).change(function () {
                    self.updatePaxInfo();
                });
                self.updatePaxInfo();
            }

            this.initStepperChoosePassenger();

            if ($(this.wrapWithContainer('.sponsor-holder')).length) {
                $(this.wrapWithContainer('.sponsor-holder')).carouFredSel({
                    direction: 'right',
                    scroll: {
                        items: 1
                    },
                    duration: 3000
                });
            }

            var choseLocationFromDialog = false;
            $(this.wrapWithContainer('#departure-location-dlg')).attr("id", this.dialogLocationId.replace('#', '')).addClass('departure-location-dlg');

            var $dialog = $(`${this.dialogLocationId}`).dialog(
                {
                    modal: false,
                    autoOpen: false,
                    resizable: true,
                    open: function () {
                        $("body").addClass("open-dialog");
                        if (theme != "SanVeRe")
                            $(self.wrapWithContainer('#inter-city-departure')).focus();
                    },
                    close: function () {
                        $dialog.dialog('close');
                        $("body").removeClass("open-dialog");

                        //****************************************************************************************
                        // Fix bugs: some do not auto popup the next component after selecting current component 
                        //****************************************************************************************
                        var keySearch = $(self.wrapWithContainer("#UseSearchAutoFocusComponent")).val().toLowerCase();
                        if (keySearch == "true") {
                            var mode = $(`${self.dialogLocationId}`).attr('data-mode');
                            if (mode == "Departure") {
                                if ($(self.wrapWithContainer('#DepartureCity-Holder')).val() != "Điểm khởi hành") {
                                    //$(this.wrapWithContainer('#ArrivalCity-Holder').select();
                                    $(self.wrapWithContainer('#ArrivalCity-Holder')).click();
                                } else {
                                    $(self.wrapWithContainer('#DepartureCity-Holder')).focus();
                                }
                            } else {
                                if ($(self.wrapWithContainer('#ArrivalCity-Holder')).val() != "Nơi đến") {
                                    $(`${self.departureDateId}`).focus();
                                } else {
                                    $(self.wrapWithContainer('#ArrivalCity-Holder')).focus();
                                }
                            }
                        }
                    }
                });
            if (theme == 'CanhChimViet' || theme == 'NuCuoiTravel') {
                $(`${this.dialogLocationId}`).dialog("option", "modal", true);
            };
            var $dialog_domestic = $(this.wrapWithContainer('#departure-location-dlg-domestic')).dialog(
                {
                    modal: false,
                    autoOpen: false,
                    resizable: true,
                    minWidth: 700,
                    open: function () {
                        $(self.wrapWithContainer('#inter-city-departure')).focus();
                        $("body").addClass("open-dialog");
                    },
                    close: function () {
                        $dialog_domestic.dialog('close');
                        $("body").removeClass("open-dialog");

                        //****************************************************************************************
                        // Fix bugs: some do not auto popup the next component after selecting current component 
                        //****************************************************************************************
                        var keySearch = $(self.wrapWithContainer("#UseSearchAutoFocusComponent")).val().toLowerCase();
                        if (keySearch == "true") {
                            var mode = $(self.wrapWithContainer('#departure-location-dlg-domestic')).attr('data-mode');
                            if (mode == "Departure") {
                                if ($(self.wrapWithContainer('#DepartureCity-Holder-Domestic')).val() != "Điểm khởi hành") {
                                    $(self.wrapWithContainer('#ArrivalCity-Holder')).select();
                                } else {
                                    $(self.wrapWithContainer('#DepartureCity-Holder-Domestic')).focus();
                                }
                            } else {
                                if ($(self.wrapWithContainer('#ArrivalCity-Holder')).val() != "Nơi đến") {
                                    $(`${self.departureDateId}`).focus();
                                } else {
                                    $(self.wrapWithContainer('#ArrivalCity-Holder')).focus();
                                }
                            }
                        }
                    }
                });

            var $dialogerorr = $(`${self.dialogSearchError}`).dialog(
                {
                    modal: false,
                    width: 300,
                    autoOpen: false,
                    resizable: false,
                    open: function () {

                    },
                    close: function () {
                        $dialogerorr.dialog('close');
                        var count = $(`${self.dialogSearchError}`).attr('data-error');
                        switch (count) {
                            case '1':
                                $(self.wrapWithContainer('#DepartureCity-Holder')).focus();
                                break;
                            case '2':
                                $(self.wrapWithContainer('#ArrivalCity-Holder')).focus();
                                break;
                            case '3':
                                $(`${self.departureDateId}`).focus();
                                break;
                            case '4':
                                $(`${self.returnDateId}`).focus();
                                break;
                        }
                    }
                });
            if (theme == 'CanhChimViet' || theme=='NuCuoiTravel') {
                $(`${self.dialogSearchError}`).dialog("option", "modal", true);
            };

            $(this.wrapWithContainer('#DepartureCity-Holder')).bind('click', function (e) {
                $(`${self.dialogLocationId} .location-link`).each(function () {
                    $(this).show();
                });
                var theme = $('#Theme').val();
                //$(this.wrapWithContainer('#inter-city-departure')).val($(this.wrapWithContainer('#DepartureCity-Holder')).val());
                //$(this.wrapWithContainer("#inter-city-departure")).attr('data-locationId', $(this.wrapWithContainer('#DepartureCity')).val());

                if (theme == 'LienLucDia') {

                    $(self.wrapWithContainer('.location-link-domestic')).each(function () {
                        $(this).show();
                    });

                    $(self.wrapWithContainer('#departure-location-dlg-domestic')).attr('data-mode', 'Departure');
                    var dataTitleDeparture = $(self.wrapWithContainer('#departure-location-dlg-domestic')).attr('data-title-departure');
                    $dialog_domestic.dialog('option', 'title', dataTitleDeparture);
                    $dialog_domestic.dialog('option', 'width', 180);
                    $dialog_domestic.dialog('option', 'height', 550);
                    $dialog_domestic.dialog({ resizable: false, draggable: false });
                    assignDialogSize($dialog_domestic);
                    $(self.wrapWithContainer('#departure-location-dlg-domestic')).parents().css("max-height", "150px");
                    $dialog_domestic.dialog('option', 'position', { my: "left top", at: "left bottom", of: e.target });

                    $(self.wrapWithContainer('#departure-location-dlg-domestic')).attr('data-id', this.id);
                    self.loadLocationByFlightConnection($(self.wrapWithContainer("#DepartureCity")).val());
                    $dialog_domestic.dialog('open');
                }
                else {
                    $(`${self.dialogLocationId}`).attr('data-mode', 'Departure');
                    var dataTitleDeparture = $(`${self.dialogLocationId}`).attr('data-title-departure');
                    $dialog.dialog('option', 'title', dataTitleDeparture);
                    assignDialogSize($dialog);
                    $dialog.dialog('option', 'position', { my: "left top", at: "left bottom", of: e.target });
                    $dialog.dialog('option', 'z-index', 2);
                    $(`${self.dialogLocationId}`).attr('data-id', this.id);

                    if ($(self.wrapWithContainer('#IsUseInternationalAndDometicTab')).val() != undefined && $(self.wrapWithContainer('#IsUseInternationalAndDometicTab')).val().toLowerCase() == "true") {

                        ShowInternationalOrDomesticLocation();
                    }

                    $dialog.dialog('open');
                }
            });

            $(this.wrapWithContainer('#ArrivalCity-Holder')).bind('click', function (e) {
                $(`${self.dialogLocationId} .location-link`).each(function () {
                    $(this).show();
                });

                var theme = $('#Theme').val();

                //$(this.wrapWithContainer('#inter-city-departure')).val($(this.wrapWithContainer('#ArrivalCity-Holder')).val());
                //$(this.wrapWithContainer("#inter-city-departure")).attr('data-locationId', $(this.wrapWithContainer('#ArrivalCity')).val());

                if (theme == 'LienLucDia') {

                    $(`${self.dialogLocationId} .location-link`).each(function () {
                        $(this).show();
                    });
                }

                var departureCity = $(self.wrapWithContainer('#DepartureCity')).val();
                var parentId = [];
                if ($(self.wrapWithContainer("#filter-arrival-location")).val().toLowerCase() == 'true') {
                    var flightConnection = [];
                    $(self.wrapWithContainer('#FlightConnection > option')).each(function () {
                        var fconnection = $(this).val();
                        if (fconnection == departureCity) {
                            flightConnection.push($(this).text());
                        }
                    });

                    $(`${self.dialogLocationId} .location-link`).each(function () {
                        
                        var locationId = $(this).attr('data-code');
                        var flag = false;
                        for (var i = 0; i < flightConnection.length; i++) {
                            if (locationId == flightConnection[i]) {
                                flag = true;
                                break;
                            }
                        }
                        if (flag == false) {
                            $(this).hide();
                        } else {
                            $(this).show();
                        }
                    });
                    if (theme == 'LienLucDia') {
                        $(`${self.dialogLocationId} .location-link`).each(function () {
                            var locationId = $(this).attr('data-code');
                            var flag = false;
                            for (var i = 0; i < flightConnection.length; i++) {
                                if (locationId == flightConnection[i]) {
                                    flag = true;
                                    break;
                                }
                            }
                            if (flag == false) {
                                $(this).hide();
                            } else {
                                $(this).show();
                            }
                        });
                    }

                }

                // Remove selected departure city out of arrival list
                $(`${self.dialogLocationId} .location-link`).each(function () {
                    var locationId = $(this).attr('data-code');
                    if (locationId == departureCity) {
                        $(this).hide();
                    }
                    else {
                        parentId.push($(this).attr('data-parentid'));
                    }
                });
                $(self.wrapWithContainer('.countryTitle')).each(function () {
                    var flag = false;
                    var id = $(this).attr('data-parentid');
                    for (var i = 0; i < parentId.length; i++) {
                        if (parentId[i] == id) {
                            flag = true;
                        }
                    }
                    if (flag == false) {
                        $(this).hide();
                    }
                    //else {
                    //    $(this).show();
                    //}
                });
                $(`${self.dialogLocationId}`).attr('data-mode', 'Arrival');
                var dataTitleArrival = $(`${self.dialogLocationId}`).attr('data-title-arrival');
                $dialog.dialog('option', 'title', dataTitleArrival);
                assignDialogSize($dialog);
                $dialog.dialog('option', 'position', { my: "left top", at: "left bottom", of: e.target });
                $(`${self.dialogLocationId}`).attr('data-id', this.id);
                if (theme == "LienLucDia") {
                    $(`${self.dialogLocationId}`).parents().css("max-height", "150px");
                    $dialog.dialog({ resizable: false, draggable: false });
                }
                if ($(self.wrapWithContainer('#IsUseInternationalAndDometicTab')).val() != undefined && $(self.wrapWithContainer('#IsUseInternationalAndDometicTab')).val().toLowerCase() == "true") {
                    ShowInternationalOrDomesticLocation();
                }

                $dialog.dialog('open');
            });

            function assignDialogSize(dialog) {
                if (self.getSearchDialogWidth() > 0) {
                    dialog.dialog('option', 'width', self.getSearchDialogWidth());
                }
                if (self.getSearchDialogHeight() > 0) {
                    dialog.dialog('option', 'height', self.getSearchDialogHeight());

                }

            }

            var thisDay = new Date();
            var monthOfCalendar = thisDay.getMonth() + 1;
            var yearOfCalendar = thisDay.getFullYear();
            if (containerId) {
                $(`${self.departureDateId}, ${self.returnDateId}`).datepickerlunar({
                    dateFormat: 'dd/mm/yy',
                    defaultDate: "+0d",
                    changeMonth: false,
                    //numberOfMonths: displayNumberOfMonth,
                    minDate: 0,
                    autoclose: true,
                    onSelect: function (selectedDate) {
                        $("body").removeClass("open-dialog");
                        var selectedDate = $(this).val();
                        var option = this.id == self.departureDateId.replace('#', '') ? "minDate" : "maxDate",
                            instance = $(this).data("datepickerlunar");
                        var date = $.datepickerlunar.parseDate(
                            instance.settings.dateFormat ||
                            $.datepicker._defaults.dateFormat,
                            selectedDate, instance.settings);
                        monthOfCalendar = date.getMonth() + 1;
                        yearOfCalendar = date.getFullYear();
                        if (this.id == self.departureDateId.replace('#', '')) {
                            $(`${self.returnDateId}`).datepickerlunar("option", 'minDate', date);

                            if ($(self.wrapWithContainer("input[name='JourneyType']:checked")).val() == '1') {

                                $(`${self.returnDateId}`).val('');
                            }
                        }
                        else {
                            $(`${self.departureDateId}`).datepickerlunar("option", 'maxDate', date);
                        }
                        //************************************************************************************
                        // Fix bugs: some do not auto popup the next component after selecting current component 
                        //************************************************************************************
                        var focusvalue = $('#ui-datepicker-div').attr('data-date-mode');
                        var keySearch = $(self.wrapWithContainer("#UseSearchAutoFocusComponent")).val().toLowerCase();
                        if (keySearch == "true") {
                            if (focusvalue == "depaturedatefocus") {
                                $("body").removeClass("open-dialog");
                                if ($(self.wrapWithContainer("input[name='JourneyType']:checked")).val() == '2') {
                                    $(`${self.returnDateId}`).focus();
                                }
                            }
                            else {
                                $('#ui-datepicker-div').hide();
                                $("body").removeClass("open-dialog");
                            }

                            if (theme == 'HongNgocHa' && focusvalue != 'depaturedatefocus') {
                                if ($(self.wrapWithContainer("input[name='JourneyType']:checked")).val() == '1') {
                                    $(`${self.returnDateId}`).focus();
                                    $(self.wrapWithContainer('label[for=radioRoundTrip]')).click();//lam cach nao de ko chay lai cai su kien click
                                    $(self.wrapWithContainer('label[for=radioRoundTripSecondary]')).click();

                                }
                            }
                        }
                    },
                    onClose: function (selectedDate) {
                        $("body").removeClass("open-dialog");
                    },
                    onChangeMonthYear: function (year, month, inst) {
                        monthOfCalendar = month;
                        yearOfCalendar = year;
                        if (share.flight_search_dialog.enableShowLowestPriceOnSearchBox)
                            this.showLowestPriceInCalendar(this.id == "depatureDate" ? true : false);

                    }
                });
            }
            else {
                $("#depatureDate, #returnDate").datepickerlunar({
                    dateFormat: 'dd/mm/yy',
                    defaultDate: "+0d",
                    changeMonth: false,
                    //numberOfMonths: displayNumberOfMonth,
                    minDate: 0,
                    autoclose: true,
                    onSelect: function (selectedDate) {
                        var selectedDate = $(this).val();
                        var option = this.id == "depatureDate" ? "minDate" : "maxDate",
                            instance = $(this).data("datepickerlunar");
                        var date = $.datepickerlunar.parseDate(
                            instance.settings.dateFormat ||
                            $.datepicker._defaults.dateFormat,
                            selectedDate, instance.settings);
                        monthOfCalendar = date.getMonth() + 1;
                        yearOfCalendar = date.getFullYear();
                        if (this.id == "depatureDate") {
                            $(self.wrapWithContainer("#returnDate")).datepickerlunar("option", 'minDate', date);

                            if ($(self.wrapWithContainer("input[name='JourneyType']:checked")).val() == '1') {

                                $(self.wrapWithContainer("#returnDate")).val('').addClass('ngay-ve');
                            }
                        }
                        else {
                            $(self.wrapWithContainer("#depatureDate")).datepickerlunar("option", 'maxDate', date);
                        }
                        //************************************************************************************
                        // Fix bugs: some do not auto popup the next component after selecting current component 
                        //************************************************************************************
                        var focusvalue = $(self.wrapWithContainer('#ui-datepicker-div')).attr('data-date-mode');
                        var keySearch = $(self.wrapWithContainer("#UseSearchAutoFocusComponent")).val().toLowerCase();
                        if (keySearch == "true") {

                            if (focusvalue == "depaturedatefocus") {
                                $("body").removeClass("open-dialog");
                                if ($(self.wrapWithContainer("input[name='JourneyType']:checked")).val() == '2') {
                                    $(self.wrapWithContainer('#returnDate')).focus();
                                }
                            }
                            else {
                                $(self.wrapWithContainer('#ui-datepicker-div')).hide();
                                $("body").removeClass("open-dialog");
                            }

                            if (theme == 'HongNgocHa' && focusvalue != 'depaturedatefocus') {
                                if ($(self.wrapWithContainer("input[name='JourneyType']:checked")).val() == '1') {
                                    $(self.wrapWithContainer('#returnDate')).focus();
                                    $(self.wrapWithContainer('label[for=radioRoundTrip]')).click();//lam cach nao de ko chay lai cai su kien click

                                }
                            }
                        }
                    },
                    onClose: function (selectedDate) {
                        $("body").removeClass("open-dialog");
                    },
                    onChangeMonthYear: function (year, month, inst) {
                        monthOfCalendar = month;
                        yearOfCalendar = year;
                        if (share.flight_search_dialog.enableShowLowestPriceOnSearchBox)
                            this.showLowestPriceInCalendar(this.id == "depatureDate" ? true : false);

                    }
                });
            }

            $(`${self.departureDateId}`).on('focus', function (e) {
                $("body").addClass("open-dialog");
                $('#ui-datepicker-div').attr('data-date-mode', 'depaturedatefocus');
            });
            $(`${self.departureDateId}`).on('click', function (e) {
                //monthOfCalendar = thisDay.getMonth() + 1;
                if (share.flight_search_dialog.enableShowLowestPriceOnSearchBox) {
                    self.showLowestPriceInCalendar(true);
                }

            });

            $(`${self.returnDateId}`).on('focus', function (e) {
                //if (theme != 'HongNgocHa') {
                $("body").addClass("open-dialog");
                $('#ui-datepicker-div').attr('data-date-mode', 'returndatefocus');
                //}
            });
            $(`${self.returnDateId}`).on('click', function (e) {
                //monthOfCalendar = thisDay.getMonth() + 1;
                if (share.flight_search_dialog.enableShowLowestPriceOnSearchBox) {
                    self.showLowestPriceInCalendar(false);
                }
            });
            /*$(this.wrapWithContainer('#returnDate').change( function (e) {
     
            });*/

            /*dates.change(function (selectedDate) {
                var selectedDate = $(this).val();
                var option = this.id == "depatureDate" ? "minDate" : "maxDate",
                        instance = $(this).data("datepickerlunar");
                var date = $.datepickerlunar.parseDate(
                    instance.settings.dateFormat ||
                        $.datepicker._defaults.dateFormat,
                    selectedDate, instance.settings);
                dates.not(this).datepickerlunar("option", option, date);
    
     
            });*/

            $('#ui-datepicker-div').bind('mouseleave', function (e) {
                //$(this.wrapWithContainer('#ui-datepicker-div').hide();
            });

            var theme = $('#Theme').val();
            $(this.wrapWithContainer('.location-link-domestic')).bind('click', function () {
                var element = $(self.wrapWithContainer('#departure-location-dlg-domestic')).attr('data-id');
                $(self.wrapWithContainer('#' + element)).val($(this).attr('data-val'));
                var valuedElement = element.split('-')[0];
                $(self.wrapWithContainer('#' + valuedElement)).val($(this).attr('data-code'));
                $dialog_domestic.dialog('close');
                this.loadLocationByFlightConnection($(self.wrapWithContainer("#DepartureCity")).val());
            });

            $(`${this.dialogLocationId} .location-link`).bind('click', function () {
                var element = $(`${self.dialogLocationId}`).attr('data-id');
                $(self.wrapWithContainer('#' + element)).val($(this).attr('data-val'));
                var valuedElement = element.split('-')[0];
                $(self.wrapWithContainer('#' + valuedElement)).val($(this).attr('data-code'));

                if (theme == 'HongNgocHa' || theme == 'CanhChimViet' || theme == 'HongNgocHa_V2' || theme == 'NuCuoiTravel') {
                    var dataMode = $(`${self.dialogLocationId}`).attr('data-mode');
                    if (dataMode == 'Departure') {
                        $(self.wrapWithContainer("#DepartureCityCountry")).val($(this).attr('data-country'));
                        if (theme == 'CanhChimViet' || theme == 'NuCuoiTravel')
                            $(self.wrapWithContainer("#departure-country")).text($(this).attr('data-country'));
                    }
                    if (dataMode == 'Arrival') {
                        $(self.wrapWithContainer("#ArrivalCityCountry")).val($(this).attr('data-country'));
                        if (theme == 'CanhChimViet' || theme == 'NuCuoiTravel')
                            $(self.wrapWithContainer("#arrival-country")).text($(this).attr('data-country'));
                    }
                }
                $dialog.dialog('close');
            });

            if (theme == 'CanhChimViet' || theme == 'NuCuoiTravel') {
                $(this.wrapWithContainer('#inter-city-departure')).bind('change', function (event) {
                    $(this).attr('data-locationId', $(this).val());
                    var dataMode = $(`${self.dialogLocationId}`).attr('data-mode');
                    if (dataMode == 'Departure') {
                        $(self.wrapWithContainer("#DepartureCityCountry")).val($(self.wrapWithContainer("#selectCountry option:selected")).text());
                        $(self.wrapWithContainer("#departure-country")).text($(self.wrapWithContainer("#selectCountry option:selected")).text());
                    }
                    if (dataMode == 'Arrival') {
                        $(self.wrapWithContainer("#ArrivalCityCountry")).val($(self.wrapWithContainer("#selectCountry option:selected")).text());
                        $(self.wrapWithContainer("#arrival-country")).text($(self.wrapWithContainer("#selectCountry option:selected")).text());
                    }
                });
            }
            else {
                $(`${this.dialogLocationId} #inter-city-departure`).autocomplete({
                    delay: 100,
                    //source: '/Home/SearchLocation',
                    source: function (request, response) {
                        $(`${self.dialogLocationId} #inter-city-departure`).attr('data-locationId', '');
                        $.ajax({
                            url: '/Home/SearchLocation',
                            type: 'GET',
                            data: {
                                term: request.term,
                            },
                            success: function (data) {
                                response(data);
                            }
                        });
                    },
                    select: function (event, ui) {
                        console.log(ui);
                        $(`${self.dialogLocationId} #inter-city-departure`).val(ui.item.label);
                        $(`${self.dialogLocationId} #inter-city-departure`).attr('data-locationId', ui.item.value);
                        choseLocationFromDialog = true;

                        chooseLocation();
                        return false;
                    },

                });
                $(this.wrapWithContainer("#inter-city-departure-text")).autocomplete({
                    delay: 100,
                    source: '/Home/SearchLocation',
                    select: function (event, ui) {
                        $(`${self.dialogLocationId} #inter-city-departure`).val(ui.item.label);
                        $(self.wrapWithContainer("#inter-city-departure-text")).val(ui.item.label);
                        choseLocationFromDialog = true;
                        return false;
                    },
                });

                $(`${this.dialogLocationId} #inter-city-departure`).bind('keydown', function (event) {

                    if (event.which == 13 || event.keyCode == 13) {
                        var location = $(`${self.dialogLocationId} #inter-city-departure`);
                        var loc = location.val();

                        if (loc.length > 0 && choseLocationFromDialog) {
                            var element = $(`${self.dialogLocationId}`).attr('data-id');

                            $(self.wrapWithContainer('#' + element)).val(loc);
                            var valuedElement = element.split('-')[0];
                            var locationId = loc.substring(loc.indexOf('(') + 1, loc.lastIndexOf(')'));
                            $(self.wrapWithContainer('#' + valuedElement)).val(locationId);
                            //('#inter-city-departure').val('');

                        }

                        $dialog.dialog('close');
                    }
                });
            }

            $(this.wrapWithContainer('#btnChooseLocation')).bind('click', function () {
                chooseLocation();
            });


            $(this.wrapWithContainer('.show-detail-flight')).bind('click', function () {
                var $link = $(this);
                $(self.wrapWithContainer('#DepartureCity')).val($link.attr('data-departure-code'));
                $(self.wrapWithContainer('#ArrivalCity')).val($link.attr('data-arrival-code'));
                $(self.wrapWithContainer('#adultNo')).val(1);
                $(self.wrapWithContainer('#childNo #infantNo')).val(0);
                $(`${self.departureDateId}`).val($link.attr('data-date'));
                $(self.wrapWithContainer('#radioOneWay')).click();
                $(self.wrapWithContainer('#radioOneWaySecondary')).click();
                $(self.wrapWithContainer('#IsDetailAction')).val(true);
                $(self.wrapWithContainer('form')).submit();
            });

            $(this.wrapWithContainer('#btnSentEmail')).bind('click', function () {
                var email = $(self.wrapWithContainer('#emailCustomer')).val();
                var validationResult = share.flight_search_dialog.validatesentmail();
                if (!validationResult) {
                    var msg = "Nhập Email không đúng định dạng!";
                    window.dialog.display(msg, 'Error');
                    return false;
                } else {
                    var url = "/Home/SaveEmailRegistration";
                    var datasend = {
                        Email: email
                    };

                    $.ajax({
                        type: "POST",
                        url: url,
                        data: JSON.stringify(datasend),
                        dataType: "json",
                        contentType: "application/json;charset=utf-8",
                        success: function (response) {
                            if (response.Success) {
                                window.dialog.display("Đăng ký Email thành công!", 'Thông báo');
                            } else {
                                window.dialog.display("Đăng ký Email không thành công!", 'Lỗi phát sinh');
                            }
                        },
                        complete: function () {
                            $.unblockUI();
                        }
                    });
                }
            });

            function ShowInternationalOrDomesticLocation() {
                var isDemostic = $(self.wrapWithContainer("input[name='FlightType']:checked")).val().toLowerCase();
                if (isDemostic == "true") {
                    $dialog.dialog('option', 'width', $(self.wrapWithContainer('#search-dialog-domestic-width')).val());
                    $(self.wrapWithContainer('#international-location')).hide();
                    $(self.wrapWithContainer('#domestic-locaiton')).show();
                }
                else {
                    $dialog.dialog('option', 'width', $(self.wrapWithContainer('#search-dialog-international-width')).val());
                    $(self.wrapWithContainer('#international-location')).show();
                    $(self.wrapWithContainer('#domestic-locaiton')).hide();
                }
            };

            function chooseLocation() {
                var theme = $('#Theme').val();
                var locationIdDialog = $(`${self.dialogLocationId} #inter-city-departure`).attr('data-locationId');
                if (!locationIdDialog) {
                    return;
                }
                var location = $(`${self.dialogLocationId} #inter-city-departure`);
                var loc = location.val();
                //if (location.prop('tagName') == 'SELECT') {
                if (loc == null || loc == '-1' || loc == '')
                    return;
                //loc = $(this.wrapWithContainer('#inter-city-departure option:selected').text();
                choseLocationFromDialog = true;
                //}
                if (loc.length > 0 && choseLocationFromDialog) {
                    var element = $(`${self.dialogLocationId}`).attr('data-id');
                    var valuedElement = element.split('-')[0];

                    if (valuedElement == 'DepartureCity') {
                        if ($(`${self.dialogLocationId} #inter-city-departure`).attr('data-locationId') == $(self.wrapWithContainer('#ArrivalCity')).val()) {
                            $(`${self.dialogSearchError} #errormessage`).html("Không được chọn sân bay giống nhau. Vui lòng chọn sân bay khác!");
                            $dialogerorr.dialog('option', 'title', 'Lỗi phát sinh');
                            $dialogerorr.dialog('open');
                            return;
                        }
                    } else if (valuedElement == 'ArrivalCity') {
                        if ($(`${self.dialogLocationId} #inter-city-departure`).attr('data-locationId') == $(self.wrapWithContainer('#DepartureCity')).val()) {
                            $(`${self.dialogSearchError} #errormessage`).html("Không được chọn sân bay giống nhau. Vui lòng chọn sân bay khác!");
                            $dialogerorr.dialog('option', 'title', 'Lỗi phát sinh');
                            $dialogerorr.dialog('open');
                            return;
                        }
                    }
                    //var locationId = loc.substring(loc.indexOf('(') + 1, loc.lastIndexOf(')'));
                    $(self.wrapWithContainer('#' + element)).val(loc);
                    var locationId = location.val();
                    var locationCountry = '';
                    if (theme == 'CanhChimViet' || theme == 'NuCuoiTravel') {
                        locationId = location.val();
                        locationCountry = $(`${self.dialogLocationId} #inter-city-departure option:selected`).text();
                        $(self.wrapWithContainer('#' + valuedElement + '-Holder')).val(locationCountry);
                    } else {
                        locationId = location.attr('data-locationId');
                        locationCountry = loc.substring(loc.indexOf(',') + 1);
                    }

                    $(self.wrapWithContainer('#' + valuedElement)).val(locationId);
                    $(`${self.dialogLocationId} #inter-city-departure`).val('');
                    $(self.wrapWithContainer('#' + valuedElement + 'Country')).val(locationCountry);
                }
                $dialog.dialog('close');
            };
        },

        showNoteYearOldArticle: function (articleId) {
            //
            var $dialogNoteYearOld = $('#NoteYearOldDialog').dialog({
                title: '',
                close: function () {
                    $dialogNoteYearOld.dialog("destroy");
                },
                modal: true,
                autoOpen: false,
                width: 520
            });
            $dialogNoteYearOld.dialog('open');
            $('#YearOldDialogCondition').addClass('hide');
            $('#YearOldDialogConditionContent').text('');
            $.ajax({
                url: '/Home/GetNoteYearOldArticle',
                type: 'POST',
                data: {
                    articleId: articleId
                },
                //contentType: 'application/json; charset=UTF-8',
                success: function (response) {
                    if (response.HasData) {
                        $('#YearOldDialogCondition').removeClass('hide');
                        $('#YearOldDialogConditionContent').html(response.Content);
                    }
                }
            });
        },

        initLocationCookie(theme) {
            this.encodeUrlCookie();

            // Do not save cookie for mobile layout
            if ($(this.wrapWithContainer('#DepartureCity-Holder')).prop('tagName') == 'SELECT')
                return;

            var languageId = $("#LanguageId").val();

            if ($.cookie('departureCity') == null) {
                var theme = $('#Theme').val();

                if (theme == 'VietJet24') {
                    $.cookie('departureCityHolder', encodeURI('Điểm khởi hành (DD)'), { path: '/' });
                }
                else {
                    if (languageId != '' && languageId == 'vi') {
                        $.cookie('departureCityHolder', encodeURI('Hồ Chí Minh (SGN)'), { path: '/' });
                    }
                    else {
                        $.cookie('departureCityHolder', encodeURI('Ho Chi Minh (SGN)'), { path: '/' });
                    }
                }
                $.cookie('departureCity', 'SGN', { path: '/' });
            }

            if ($.cookie('arrivalCity') == null) {
                if (languageId != '' && languageId == 'vi') {
                    $.cookie('arrivalCityHolder', encodeURI('Hà Nội (HAN)'), { path: '/' });
                }
                else {
                    $.cookie('arrivalCityHolder', encodeURI('Ha Noi (HAN)'), { path: '/' });
                }
                $.cookie('arrivalCity', 'HAN', { path: '/' });
            }

            if (theme == 'HongNgocHa' || theme == 'CanhChimViet' || theme == 'HongNgocHa_V2' || theme == 'NuCuoiTravel') {
                if ($.cookie('departureCityCountry') == null || $.cookie('departureCityCountry') == '') {
                    if (languageId != '' && languageId == 'vi') {
                        $.cookie('departureCityCountry', encodeURI('Việt Nam'), { path: '/' });
                    }
                    else {
                        $.cookie('departureCityCountry', encodeURI('Viet Nam'), { path: '/' });
                    }
                }
                if ($.cookie('arrivalCityCountry') == null || $.cookie('arrivalCityCountry') == '') {
                    if (languageId != '' && languageId == 'vi') {
                        $.cookie('arrivalCityCountry', encodeURI('Việt Nam'), { path: '/' });
                    }
                    else {
                        $.cookie('arrivalCityCountry', encodeURI('Viet Nam'), { path: '/' });
                    }
                }
            }

            if (theme == 'HongNgocHa' || theme == 'HongNgocHa_V2') {
                $(this.wrapWithContainer('#DepartureCity-Holder')).val(decodeURI($.cookie('departureCityHolder')) + ', ' + decodeURI($.cookie('departureCityCountry')));
                $(this.wrapWithContainer('#DepartureCity')).val($.cookie('departureCity'));
                $(this.wrapWithContainer('#DepartureCityCountry')).val(decodeURI($.cookie('departureCityCountry')));

                $(this.wrapWithContainer('#ArrivalCity-Holder')).val(decodeURI($.cookie('arrivalCityHolder')) + ', ' + decodeURI($.cookie('arrivalCityCountry')));
                $(this.wrapWithContainer('#ArrivalCity')).val($.cookie('arrivalCity'));
                $(this.wrapWithContainer('#ArrivalCityCountry')).val(decodeURI($.cookie('arrivalCityCountry')));
            }
            else {
                $(this.wrapWithContainer('#DepartureCity-Holder')).val(decodeURI($.cookie('departureCityHolder')));
                $(this.wrapWithContainer('#DepartureCity')).val($.cookie('departureCity'));

                $(this.wrapWithContainer('#ArrivalCity-Holder')).val(decodeURI($.cookie('arrivalCityHolder')));
                $(this.wrapWithContainer('#ArrivalCity')).val($.cookie('arrivalCity'));
                if (theme == 'CanhChimViet' || theme == 'NuCuoiTravel') {
                    $(this.wrapWithContainer('#DepartureCityCountry')).val(decodeURI($.cookie('departureCityCountry')));
                    $(this.wrapWithContainer('#ArrivalCityCountry')).val(decodeURI($.cookie('arrivalCityCountry')));
                    $(this.wrapWithContainer('#departure-country')).text(decodeURI($.cookie('departureCityCountry')));
                    $(this.wrapWithContainer('#arrival-country')).text(decodeURI($.cookie('arrivalCityCountry')));
                }
            }


            if ($.cookie('journeyType') == null) {
                if (theme == 'SanVeRe')
                    $.cookie('journeyType', '2');
                else
                    $.cookie('journeyType', '1');
            }

            var journeyType = $.cookie('journeyType');

            if (journeyType == 1) {
                $(this.wrapWithContainer("input[name=JourneyType][value=1]")).closest('label[for=radioOneWay]').click();
                $(this.wrapWithContainer("input[name=JourneyType][value=1]")).closest('label[for=radioOneWaySecondary]').click();
            }
            else {
                $(this.wrapWithContainer("input[name=JourneyType][value=2]")).closest('label[for=radioRoundTrip]').click();
                $(this.wrapWithContainer("input[name=JourneyType][value=2]")).closest('label[for=radioRoundTripSecondary]').click();

            }

            //$(this.wrapWithContainer('#DepartureCity-Holder')).val($.cookie('departureCityHolder'));
            //var departureLoc = $(this.wrapWithContainer('#DepartureCity-Holder')).val();
            //var departureLocationId = departureLoc.substring(departureLoc.indexOf('(') + 1, departureLoc.lastIndexOf(')'));
            //$(this.wrapWithContainer('#DepartureCity')).val(departureLocationId);



            // $(this.wrapWithContainer('#ArrivalCity-Holder')).val($.cookie('arrivalCityHolder'));
            //var arrivalLoc = $(this.wrapWithContainer('#ArrivalCity-Holder')).val();
            //var arrivalLocationId = arrivalLoc.substring(arrivalLoc.indexOf('(') + 1, arrivalLoc.lastIndexOf(')'));
            //$(this.wrapWithContainer('#ArrivalCity')).val(arrivalLocationId);

            if ($.cookie('depatureDate') != null) {
                console.log($.cookie('depatureDate'));
                $(`${this.departureDateId}`).val($.cookie('depatureDate'));
            }
            if (theme != 'Globalink' && $.cookie('returnDate') != null && $.cookie('journeyType') == '2') {
                $(`${this.returnDateId}`).val($.cookie('returnDate'));
            }

            if ($.cookie('adultNo') != null && $.cookie('adultNo') != '') {
                $(this.wrapWithContainer('#adultNo')).val($.cookie('adultNo'));
            } else {
                $(this.wrapWithContainer('#adultNo')).val(1);
            }

            if ($.cookie('childNo') != null && $.cookie('childNo') != '') {
                $(this.wrapWithContainer('#childNo')).val($.cookie('childNo'));
            } else {
                $(this.wrapWithContainer('#childNo')).val(0);
            }

            if ($.cookie('infantNo') != null && $.cookie('infantNo') != '') {
                $(this.wrapWithContainer('#infantNo')).val($.cookie('infantNo'));
            } else {
                $(this.wrapWithContainer('#infantNo')).val(0);
            }
        },

        saveLocationCookie() {
            var theme = $('#Theme').val();
            $.removeCookie('departureCityHolder', { path: '/Booking' });
            $.removeCookie('arrivalCityHolder', { path: '/Booking' });
            $.removeCookie('departureCity', { path: '/Booking' });
            $.removeCookie('arrivalCity', { path: '/Booking' });
            $.removeCookie('depatureDate', { path: '/Booking' });
            $.removeCookie('returnDate', { path: '/Booking' });
            $.removeCookie('adultNo', { path: '/Booking' });
            $.removeCookie('childNo', { path: '/Booking' });
            $.removeCookie('infantNo', { path: '/Booking' });
            $.removeCookie('journeyType', { path: '/Booking' });
            if (theme == 'HongNgocHa' || theme == 'CanhChimViet' || theme == 'HongNgocHa_V2' || theme == 'NuCuoiTravel') {
                $.removeCookie('arrivalCityCountry', { path: '/Booking' });
                $.removeCookie('departureCityCountry', { path: '/Booking' });
            }

            //$.removeCookie('departureCityCountry', { path: '/Booking' });
            //$.removeCookie('arrivalCityCountry', { path: '/Booking' });

            var departureCityHolder = $(this.wrapWithContainer('#DepartureCity-Holder')).val();
            var arrivalCityHolder = $(this.wrapWithContainer('#ArrivalCity-Holder')).val();

            if (departureCityHolder.indexOf('%') < 0) {
                departureCityHolder = encodeURI(departureCityHolder);
            }
            if (arrivalCityHolder.indexOf('%') < 0) {
                arrivalCityHolder = encodeURI(arrivalCityHolder);
            }


            $.cookie('departureCityHolder', departureCityHolder, { path: '/' });
            $.cookie('arrivalCityHolder', arrivalCityHolder, { path: '/' });
            $.cookie('departureCity', $(this.wrapWithContainer('#DepartureCity')).val(), { path: '/' });
            $.cookie('arrivalCity', $(this.wrapWithContainer('#ArrivalCity')).val(), { path: '/' });
            $.cookie('depatureDate', $(`${this.departureDateId}`).val(), { path: '/' });
            $.cookie('returnDate', $(`${this.returnDateId}`).val(), { path: '/' });
            $.cookie('adultNo', $(this.wrapWithContainer('#adultNo')).val(), { path: '/' });
            $.cookie('childNo', $(this.wrapWithContainer('#childNo')).val(), { path: '/' });
            $.cookie('infantNo', $(this.wrapWithContainer('#infantNo')).val(), { path: '/' });
            $.cookie('journeyType', $(this.wrapWithContainer("input[name='JourneyType']:checked")).val(), { path: '/' });

            if (theme == 'HongNgocHa' || theme == 'CanhChimViet' || theme == 'HongNgocHa_V2' || theme == 'NuCuoiTravel') {
                var departureCityCountry = $(this.wrapWithContainer('#DepartureCityCountry')).val();
                var arrivalCityCountry = $(this.wrapWithContainer('#ArrivalCityCountry')).val();
                if (departureCityCountry.indexOf('%') < 0) {
                    departureCityCountry = encodeURI(departureCityCountry);
                }
                if (arrivalCityCountry.indexOf('%') < 0) {
                    arrivalCityCountry = encodeURI(arrivalCityCountry);
                }
                $.cookie('departureCityCountry', departureCityCountry, { path: '/' });
                $.cookie('arrivalCityCountry', arrivalCityCountry, { path: '/' });
            }
        },

        encodeUrlCookie() {

            var departureCityHolder = $.cookie('departureCityHolder');
            var arrivalCityHolder = $.cookie('arrivalCityHolder');
            var departureCityCountry = $.cookie('departureCityCountry');
            var arrivalCityCountry = $.cookie('arrivalCityCountry');

            if (departureCityHolder && departureCityHolder.indexOf('%') < 0) {
                $.cookie('departureCityHolder', encodeURI(departureCityHolder), { path: '/' });
            }

            if (arrivalCityHolder && arrivalCityHolder.indexOf('%') < 0) {
                $.cookie('arrivalCityHolder', encodeURI(arrivalCityHolder), { path: '/' });
            }

            if (departureCityCountry && departureCityCountry.indexOf('%') < 0) {
                $.cookie('departureCityCountry', encodeURI(departureCityCountry), { path: '/' });
            }

            if (arrivalCityCountry && arrivalCityCountry.indexOf('%') < 0) {
                $.cookie('arrivalCityCountry', encodeURI(arrivalCityCountry), { path: '/' });
            }
        },

        submitSearchFlightPrettyUrl(event) {
            event.preventDefault();
            var departureCity = $(this.wrapWithContainer('#DepartureCity')).val();
            var arrivalCity = $(this.wrapWithContainer('#ArrivalCity')).val();
            var departureDate = $(`${this.departureDateId}`).val().substring(6, 10) + $(`${this.departureDateId}`).val().substring(3, 5) + $(`${this.departureDateId}`).val().substring(0, 2);
            var arrivalDate = $(`${this.returnDateId}`).val().substring(6, 10) + $(`${this.returnDateId}`).val().substring(3, 5) + $(`${this.returnDateId}`).val().substring(0, 2);
            var journeyType = $(this.wrapWithContainer("input[name='JourneyType']:checked")).val() == undefined ? "1" : $(this.wrapWithContainer("input[name='JourneyType']:checked")).val();
            var adultNo = $(this.wrapWithContainer('#adultNo option:selected')).val() == undefined ? "1" : $(this.wrapWithContainer('#adultNo option:selected')).val();
            var childNo = $(this.wrapWithContainer('#childNo option:selected')).val() == undefined ? "0" : $(this.wrapWithContainer('#childNo option:selected')).val();
            var infantNo = $(this.wrapWithContainer('#infantNo option:selected')).val() == undefined ? "0" : $(this.wrapWithContainer('#infantNo option:selected')).val();
            var theme = $('#Theme').val();
            if (theme == 'NamThanh' || theme == "CanhChimViet" || theme == 'HongNgocHa_V2' || theme == 'NuCuoiTravel' || theme == 'BaseVeMayBay') {
                adultNo = $(this.wrapWithContainer('#adultNo')).val();
                childNo = $(this.wrapWithContainer('#childNo')).val();
                infantNo = $(this.wrapWithContainer('#infantNo')).val();
            }

            /*if (theme == 'NamThanh') {
                var dateNow = new Date();
                var date = new Date(departureDate.substr(0, 4) + "-" + departureDate.substr(4, 2) + "-" + departureDate.substr(6));
                departureDate = Math.round((date - dateNow) / (1000 * 60 * 60 * 24)) + 'D';
            
                if (journeyType != 1) {
                    date = new Date(arrivalDate.substr(0, 4) + "-" + arrivalDate.substr(4, 2) + "-" + arrivalDate.substr(6));
                    arrivalDate = Math.round((date - dateNow) / (1000 * 60 * 60 * 24)) + 'D';
                }
            }*/

            var paramSearchString = departureCity + "-" + arrivalCity + "-" + departureDate;
            if (journeyType == 1) {
                paramSearchString += '-' + adultNo + childNo + infantNo;
            } else {
                paramSearchString += '-' + arrivalDate + '-' + adultNo + childNo + infantNo;
            }
            var urlSearchString = `${getLanguageRouting(URLs.searchFlightUrl)}/${paramSearchString}`;
            location.href = urlSearchString;
        },

        loadLocationByFlightConnection(_depatureCity) {
            var theme = $('#Theme').val();
            var departureCity = _depatureCity;
            if (theme == 'LienLucDia') {
                var flightConnection = [];
                $(this.wrapWithContainer('#FlightConnection > option')).each(function () {
                    var fconnection = $(this).val();
                    if (fconnection == departureCity) {
                        flightConnection.push($(this).text());
                    }
                });
                var parentId = [];
                $(`${this.dialogLocationId} .location-link`).each(function () {
                    var locationId = $(this).attr('data-code');
                    var flag = false;
                    for (var i = 0; i < flightConnection.length; i++) {
                        if (locationId == flightConnection[i]) {
                            flag = true;
                            break;
                        }
                    }
                    if (flag == false) {
                        $(this).hide();
                    } else {
                        parentId.push($(this).attr('data-parentid'));
                        $(this).show();
                    }
                });
                $(this.wrapWithContainer('.countryTitle')).each(function () {
                    var flag = false;
                    var id = $(this).attr('data-parentid');
                    for (var i = 0; i < parentId.length; i++) {
                        if (parentId[i] == id) {
                            flag = true;
                        }
                    }
                    if (flag == false) {
                        $(this).hide();
                    }
                    else {
                        $(this).show();
                    }
                });
            }
        },

        getSearchDialogWidth() {
            if ($(this.wrapWithContainer('#FullSearchDialog')) != null && $(this.wrapWithContainer('#FullSearchDialog')).val() == '1') {
                if ($(this.wrapWithContainer('#international-search-dialog-width')) != null) {
                    return $(this.wrapWithContainer('#international-search-dialog-width')).val();
                }
            } else {
                if ($(this.wrapWithContainer('#search-dialog-width')) != null)
                    return $(this.wrapWithContainer('#search-dialog-width')).val();
            }

            return 0;
        },

        getSearchDialogHeight() {
            if ($(this.wrapWithContainer('#FullSearchDialog')) != null && $(this.wrapWithContainer('#FullSearchDialog')).val() == '1') {
                if ($(this.wrapWithContainer('#international-search-dialog-height')) != null)
                    return $(this.wrapWithContainer('#international-search-dialog-height')).val();
            } else {
                if ($(this.wrapWithContainer('#search-dialog-height')) != null)
                    return $(this.wrapWithContainer('#search-dialog-height')).val();
            }

            return 0;
        },

        showLowestPriceInCalendar(isDepartureDate) {
            let departureCity = $(this.wrapWithContainer("#DepartureCity")).val();
            let arrivalCity = $(this.wrapWithContainer("#ArrivalCity")).val();
            if (isDepartureDate == false) {
                departureCity = $(this.wrapWithContainer("#ArrivalCity")).val();
                arrivalCity = $(this.wrapWithContainer("#DepartureCity")).val();
            }
            var lastDayOfMonth = new Date(yearOfCalendar, monthOfCalendar, 0);
            let fromDate = monthOfCalendar + "/" + 1 + "/" + yearOfCalendar; // new Date(today.getFullYear(), month, $(calendarDays[0]).html());
            let toDate = monthOfCalendar + "/" + lastDayOfMonth.getDate() + "/" + yearOfCalendar; //new Date(today.getFullYear(), month, $(calendarDays[calendarDays.length - 1]).html());
            let url = "/PopulateCategory/GetFlightLowestPrice";
            var datasend = {
                depatureCity: departureCity,
                arrivalCity: arrivalCity,
                fromDate: fromDate,
                toDate: toDate
            };

            $.ajax({
                type: "GET",
                url: url,
                data: datasend,
                contentType: "application/json",
                success: function (response) {
                    let currentCalendarDays = $(this.wrapWithContainer('.ui-datepicker-day'));
                    if (response.length > 0) {
                        response.forEach(function (item) {
                            let departureDateData = new Date(item.DepartureDate);

                            let dayHasLowestPrice = currentCalendarDays.toArray().filter(x => $(x).html() == departureDateData.getDate());
                            if (dayHasLowestPrice.length > 0) {
                                let price = item.Price + '';
                                if (price.length > 4) {
                                    if (price.endsWith("000")) {
                                        let index = price.lastIndexOf("000");
                                        price = price.substr(0, index) + 'K';
                                    }
                                }
                                let flightPriceHtml = `<span class='price-in-calendar'>${price}</span>`;
                                $(dayHasLowestPrice[0]).parent().parent().append(flightPriceHtml);
                            }
                        });
                    }
                }
            });
        }

    }
}

Define("share.flight_search_dialog", flightSearchDialog())
Define("share.flight_search_dialog_secondary", flightSearchDialog());
