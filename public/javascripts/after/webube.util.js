/**
 * Created by IntelliJ IDEA.
 * User: guillaumebadin
 * Date: 27/12/11
 * Time: 23:25
 * To change this template use File | Settings | File Templates.
 */
'use strict';
var UbeHistory = {
    history:null,

    init:function()
    {
        UbeHistory.history = window.History; // Note: We are using a capital H instead of a lower h

        if ( !History.enabled ) {
            // History.js is disabled for this browser.
            // This is because we can optionally choose to support HTML4 browsers or not.
            return false;
        }

        // Bind to StateChange Event
        UbeHistory.history.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
            var State = UbeHistory.history.getState(); // Note: We are using History.getState() instead of event.state
            UbeHistory.history.log(State.data, State.title, State.url);
        });
    }
};

'use strict';
(function(window,undefined){

    // Check Location

    // Establish Variables
    var History = window.History, // Note: We are using a capital H instead of a lower h
        State = History.getState(),
        $log = $('#log');


    // Log Initial State
    // console.log('initial:', State.data, State.title, State.url);

    // Bind to State Change
    History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
        // Log the State
        var State = History.getState(); // Note: We are using History.getState() instead of event.state
//        console.log('statechange:', State.data, State.title, State.url);
    });

    UbeHistory.history = History;

})(window);

'use strict';
var UbeMenu = function () {

    /**
     * You must use strict option for javascript
     */

    /**
     *
     * You must use this method with data-link attribute
     * @param classToAdd
     */
    var updateMenu = function (classToAdd) {

        var pathName = document.location.pathname.toLowerCase();

        $('[data-link]').each(function (index, item) {

            var dataLink = $(item).attr('href').toLowerCase();

            if (pathName == dataLink) {
                $(item).addClass(classToAdd);
            }
        });

        return this;
    }

    var updateMenuViaAjax = function (classToAdd) {
        $('[data-link]').each(function (index, item) {

            $(this).unbind();

            $(item).removeClass(classToAdd);


            var dataLink = $(item).attr('href').toLowerCase();


            $(this).click(function (event) {


                event.preventDefault();


                if ($('.isAnimating').length == 0) {

                    $('[data-link]').each(function (index, item) {
                        $(item).removeClass(classToAdd);
                    });

                    $(this).addClass(classToAdd);

                    var idToShow = '#' + $(this).attr('data-link');
                    var idToRemove = '#' + $('.active').attr('id');


                    $('.active').each(function () {
                        $(this).removeClass('active');
                    });

                    $(idToShow).addClass('active');

                    UbeHistory.history.pushState({}, '', dataLink);

                    _UbeUi.ubeReplace(idToRemove, idToShow);
                }

            });
        });
    }

    var applyDataUbeLink = function () {
        $('[data-ube-link]').each(function (index, item) {

            var url = $(item).attr('data-ube-link');

            $(item).click(function () {


            });

        });
    }


    return {
        /**
         * You must use this method with data-link attribute
         * @param classToAdd
         */
        updateMenu:updateMenu,
        applyDataUbeLink:applyDataUbeLink,
        updateMenuViaAjax:updateMenuViaAjax

    }
}();

'use strict';
var UBE_AJAX = (function () {



    /**
     * This method post a form via ajax.
     * @param idToAttach
     * @param successCallback
     */
    var postForm = function (idToAttach, successCallback) {


        var urlToPost = $(idToAttach).attr('action');

        var sendButton = $(idToAttach).find("[type='submit']").get(0);

        sendButton.click(function (event) {

            event.preventDefault();

        });

        /* Send the data using post and call successCallback */
        $.post(urlToPost, UBE_AJAX.formToJson(idToAttach));

    }


    var formToJson = function (idFrom) {

        var form = $(idFrom);

        var o = {};
        var a = form.serialize();

        var tab = a.split('&');

        $.each(tab, function (index, elem) {
            var ele = elem.split('=');

            o[ele[0]] = ele[1];
        });
        return o;
    }


    var loadImg = function (urlImg) {
        $('body').append('<img src="' + urlImg + '" style="display:none;" /> ');
    }

    /*
     Load all images of url
     */
    var loadImgOfUrl = function (urlToLoad) {
        $('<div>').load(urlToLoad + ' img',
            function () {
                $('#loadToHide').append($(this).html());
            });
    }

    var loadPageOfUrl = function (urlToLoad, id, callBack) {
        $('<div>').load(urlToLoad + ' ' + id,
            function () {

                $(this).children(id).css('display', 'none');
                $('#main-content').append($(this).html());
                if (callBack)
                    callBack();
            });
    }


    return {
        /**
         * This method post a form via ajax.
         * @param idToAttach
         * @param successCallback
         */
        postForm:postForm,
        formToJson:formToJson,
        loadImg:loadImg,
        loadImgOfUrl:loadImgOfUrl,
        loadPageOfUrl:loadPageOfUrl

    }

})();

var _UbeUi = (function () {
    'use strict';

    var ubeReplace = function (idToRemove, idToShow) {


        // We add block class during animation
        $(idToRemove).addClass('isAnimating');
        $(idToShow).addClass('isAnimating');

        $(idToRemove).fadeOut('slow',function(){
            $(idToShow).fadeIn('slow');
        });


        // Animation is ending we remove block class
        $(idToRemove).removeClass('isAnimating');
        $(idToShow).removeClass('isAnimating');

    };


    return {

        ubeReplace:ubeReplace
    }

})();

'use strict';
var _UbeUtil = (function () {



    var userAgent = navigator.userAgent.toLowerCase();
    jQuery.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());

    /**
     *  Check the email validation
     * @param email
     * @return true | false
     */
    function checkEmailValidation(email) {
        if (null == email || "" == email)
            return true;


        var checkEmail = /.com$|.fr$|.eu$|.uk$/;

        return checkEmail.test(email);
    }

    /**
     * Check if the current browser is IE7
     */
    function isBrowserIE7() {
        if (jQuery.browser.msie && jQuery.browser.version.substr(0, 1) == 7) {
            return true;
        }
        else
            return false;
    }


    /**
     * Check if the current browser is IE8
     */
    function isBrowserIE8() {
        if (jQuery.browser.msie && jQuery.browser.version.substr(0, 1) == 8) {
            return true;
        }
        else
            return false;
    }

    /**
     * Check if the current browser is IE9
     */
    function isBrowserIE9() {
        if (jQuery.browser.msie && jQuery.browser.version.substr(0, 1) == 9) {
            return true;
        }
        else
            return false;
    }


    /**
     * Check if the current browser is IE
     */
    function isBrowserIE() {
        if (jQuery.browser.msie) {
            return true;
        }
        else
            return false;
    }


    /**
     * Check if the current browser is Chrome
     */
    function isBrowserChrome() {
        return jQuery.browser.chrome;
    }


    /**
     * Webube function with replace de $ of jquery
     */
    function $(el) {
        if (isBrowserIE7()) {
            return jQuery('[treatment-name-id=' + el + ']');
        }
        else {
            return jQuery(el);
        }
    }


    var alertCpt = 0;

    /**
     * This method show just 1 alert (Useful for IE debuging)
     * @param str to put in the alert
     */
    function debugAlert(str) {

        if (alertCpt < 1) {
            window.alert(str);
        }

        alertCpt = alertCpt + 1;
    }

    function showCptAlert() {
        window.alert(alertCpt);
    }


    return {
        checkEmailValidation:checkEmailValidation,
        isBrowserIE7:isBrowserIE7,
        isBrowserIE8:isBrowserIE8,
        isBrowserIE9:isBrowserIE9,
        isBrowserIE:isBrowserIE,
        isBrowserChrome:isBrowserChrome,
        $:$,
        debugAlert:debugAlert,
        showCptAlert:showCptAlert
    }

})();

function posMouse(event) {
    var p_nav_bar = $("#mini_footer");
    var p_nav_bar_fix = $("#mini_footer_fix");
    var position_navbar = p_nav_bar.position();
    var position_navbar_fix = p_nav_bar_fix.position();

    var heightScreen = jQuery(document).height();
    var pageHeight = document.body.offsetHeight;


    var elem = document.getElementById('mini_footer');
    var elem_fix = document.getElementById('mini_footer_fix');
    var googleplus = document.getElementById('googleplus');
    var googleplusfix = document.getElementById('googleplusfix');

    if (position_navbar.top > position_navbar_fix.top)
    {
        elem.style.visibility = "hidden";
        elem_fix.style.visibility = "visible";
        googleplusfix.style.display = "block";
        googleplus.style.display = "none";
    }
    else {
        elem_fix.style.visibility = "hidden";
        elem.style.visibility = "visible";
        googleplusfix.style.display = "none";
        googleplus.style.display = "block";
    }
}

$(window).bind('scroll', posMouse);
