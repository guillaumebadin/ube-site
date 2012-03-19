package controllers;

import nl.bitwalker.useragentutils.BrowserType;
import nl.bitwalker.useragentutils.Manufacturer;
import nl.bitwalker.useragentutils.OperatingSystem;
import nl.bitwalker.useragentutils.UserAgent;
import play.*;
import play.mvc.*;

import java.util.ArrayList;


public class Application extends Controller {

    private static void checkMobile() {
        String user_agent = request.headers.get("user-agent").value();


        String[] keyWords = {"iPad", "iPhone", "Android", "BlackBerry"};

        UserAgent ua = new UserAgent(user_agent);

        if (ua.getOperatingSystem().isMobileDevice())
        {
            
            int version = Integer.valueOf(ua.getBrowserVersion().getMajorVersion());

                    
            if (0 == ua.getOperatingSystem().getManufacturer().compareTo(Manufacturer.GOOGLE))
            {
                Logger.info("Android");

                if (version >= 4)
                    redirect("http://m.webube.com");

            } else if (0 == ua.getOperatingSystem().getManufacturer().compareTo(Manufacturer.BLACKBERRY)) {
                Logger.info("Blackberry");

                if (version >= 6)
                    redirect("http://m.webube.com");
            }
            else if (0 == ua.getOperatingSystem().getManufacturer().compareTo(Manufacturer.APPLE)) {
                Logger.info("iPhone");
                redirect("http://m.webube.com");
            }
        }
        
        


    }


    public static void index(String host) {

        Logger.info(host);


        if ("m.webube.com".equals(host))
            renderTemplate("Application/eagle-technology.html");
        else {
            Application.checkMobile();
            render();
        }
    }

    public static void webApp() {
        render();
    }

    public static void webSite() {
        render();
    }

    public static void company() {
        render();
    }

    public static void reference() {
        render();
    }

    public static void contact() {
        render();
    }

    public static void phoenixProject() {
        render();
    }

    public static void appFacebook() {
        render();
    }

    public static void cloud() {
        render();
    }

}