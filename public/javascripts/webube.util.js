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


    return {
        /**
         * You must use this method with data-link attribute
         * @param classToAdd
         */
        updateMenu:updateMenu
    }
}();