$(document).ready(function () {
    $('.dropdown-menu a.dropdown-toggle').on('click', function (e) {
        var $el = $(this);
        $el.toggleClass('active-dropdown');
        var $parent = $(this).offsetParent(".dropdown-menu");
        if (!$(this).next().hasClass('show')) {
            $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
        }
        var $subMenu = $(this).next(".dropdown-menu");
        $subMenu.toggleClass('show');

        $(this).parent("li").toggleClass('show');

        $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
            $('.dropdown-menu .show').removeClass("show");
            $el.removeClass('active-dropdown');
        });

        if (!$parent.parent().hasClass('navbar-nav')) {
            $el.next().css({ "top": $el[0].offsetTop, "left": $parent.outerWidth() - 4 });
        }

        return false;
    });
    $(document).on("click", function (event) {
        var $trigger = $(".dropdown-account");
        if ($trigger !== event.target && !$trigger.has(event.target).length) {
            $(".dropdown-account .dropdown-menu").removeClass("show");
        }
    });
});

$(document).ready(function () {
    $(".dropdown").mouseover(function () {
        $(this).addClass("is-active");;
    });
    $(".dropdown").mouseout(function () {
        $(this).removeClass("is-active");;
    });
    if ($('#bonus-point').length > 0) {
        $.ajax({
            url: '/Account/GetBonusPoint',
            type: 'POST',
            data: {},
            success: function (response) {
                if (response.BonusPoint != "") {
                    $('#bonus-point').html(response.BonusPoint);
                }
                else {
                    $('#bonus-point').html("0");
                }
            }
        });
    }

});

// Search flight Dialog

$('#viewPassengerInfoContent, #btnShowPassengerInfoContent').click(function () {
    //$(this).toggleClass('active');
    $(this).next('#viewPassengerInfoContent_dropdownContent').toggle();
    return false;
});
$('#modalPassenger-dimiss').click(function () {
    $(this).parent().toggle();
    return false;
});
$('#modalPassenger-dimiss-secondary').click(function () {
    debugger
    $(this).parent().toggle();
    return false;
});
$('#dropdownContent, #viewPassengerInfoContent_dropdownContent').click(function (event) {
    event.stopPropagation();
    return false;
});
$(document).click(function (event) {
    if ($('#dropdownContent').is(':visible')) {
        $('#dropdownContent').toggle();
        $('#dropdownPassenger').toggleClass('active');
    }

    if ($('#viewPassengerInfoContent_dropdownContent').is(':visible')) {
        $('#viewPassengerInfoContent_dropdownContent').toggle();
        $('#btnShowPassengerInfoContent').toggleClass('active');
    }

    if ($("[name='viewPassengerInfoContent_dropdownContent']").is(':visible')) {
        $("[name='viewPassengerInfoContent_dropdownContent']").toggle();
    }
});

