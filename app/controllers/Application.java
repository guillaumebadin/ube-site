package controllers;

import play.*;
import play.mvc.*;

import java.util.ArrayList;


public class Application extends Controller {

    private static  void checkMobile () {
        String              user_agent = request.headers.get("user-agent").value();
        String[]            keyWords = {"iPad", "iPhone", "Android", "BlackBerry"};
        int                 mobileAgent = -1;
        
        for (int i = 0; i < keyWords.length && mobileAgent < 0; i++)
            mobileAgent = user_agent.indexOf(keyWords[i]);

        if (mobileAgent > 0)
            redirect("/public/appocalypse-demo.html");
    }

    public static void index()
    {
        Application.checkMobile();
        render();
    }

    public static void mobile()
    {
        render();
    }

    public static void digitalFactory()
    {
        render();
    }

    public static void company()
    {
        render();
    }

    public static void ref()
    {
        render();
    }

    public static void contact()
    {
        render();
    }

    public static void appOcalypse()
    {
        render();
    }

    public static void appFacebook()
    {
        render();
    }

    public static void cloud()
    {
        render();
    }

}