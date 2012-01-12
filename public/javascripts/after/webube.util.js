/**
 * Created by IntelliJ IDEA.
 * User: guillaumebadin
 * Date: 27/12/11
 * Time: 23:25
 * To change this template use File | Settings | File Templates.
 */
var UbeMenu = function(){

    /**
     * You must use strict option for javascript
     */
    'use strict';


    /**
     *
     * You must use this method with data-link attribute
     * @param classToAdd
     */
    var updateMenu = function(classToAdd)
    {

        var pathName = document.location.pathname.toLowerCase();

        $('[data-link]').each(function(index,item){

            var dataLink = $(item).attr('href').toLowerCase();

            if (pathName == dataLink)
                $(item).addClass(classToAdd);

        });

        return this;
    }

    var applyDataUbeLink = function()  {
        $('[data-ube-link]').each(function(index,item){

            var url = $(item).attr('data-ube-link');

            $(item).click(function(){


            });

        });
    }




    return {
        /**
         * You must use this method with data-link attribute
         * @param classToAdd
         */
        updateMenu:updateMenu,
        applyDataUbeLink:applyDataUbeLink
    }
}();

var UBE_AJAX = (function() {

    'use strict';

    /**
     * This method post a form via ajax.
     * @param idToAttach
     * @param successCallback
     */
    function postForm(idToAttach, successCallback) {


        var urlToPost = $(idToAttach).attr('action');

        var sendButton = $(idToAttach).find("[type='submit']").get(0);

        sendButton.click(function(event){

            event.preventDefault();

        });

        /* Send the data using post and call successCallback */
        $.post(urlToPost, UBE_AJAX.formToJson(idToAttach), successCallback);

    }


    function formToJson(idFrom) {

        var form = $(idFrom);

        var o = {};
        var a = form.serialize();

        var tab = a.split('&');

        $.each(tab, function(index, elem) {
            var ele = elem.split('=');

            o[ele[0]] = ele[1];
        });
        return o;
    }


    return {
        /**
         * This method post a form via ajax.
         * @param idToAttach
         * @param successCallback
         */
        postForm:postForm,
        formToJson:formToJson
    }

})();



