package com.webube.utils;


import org.apache.commons.mail.SimpleEmail;
import play.Logger;
import play.Play;
import play.libs.Mail;

/**
 * Created by IntelliJ IDEA.
 * User: guillaumebadin
 * Date: 07/11/11
 * Time: 12:36
 * <p/>
 * This is the UbeMail class utility for send mail.
 */
public class UbeMail {


    private final String senderLabel;
    private final String content;
    private final String recipient;
    private final String from;
    

    private UbeMail(final String label, final String content, final String recipient) {
        this.senderLabel = label;
        this.content = content;
        this.recipient = recipient;
        this.from = "toto@toto.com";
    }
    
    private UbeMail(String label,
                    String content,
                    String recipient,
                    String from)
    {
        this.senderLabel = label;
        this.content = content;
        this.recipient = recipient;
        this.from = from;
    }

    public static UbeMail createNewEmail(final String label,
                                          final String content,
                                          final String from,
                                          final String recipient) {
        return new UbeMail(label, content, recipient,from);
    }

    public boolean send() {

        if (Play.id.equals("prod-test")) {
            Logger.debug("[Mail][Mock]" + this.toString());
            return (true);
        } else {

            try {
                SimpleEmail locEmail = new SimpleEmail();
                locEmail.setFrom(this.from, "WebUbe");
                locEmail.addTo(this.recipient);
                locEmail.setSubject(this.senderLabel);
                locEmail.setMsg(this.content);
                Mail.send(locEmail);
            } catch (Exception e) {
                Logger.error("[Error]", e.toString());
            }

            return true;
        }
    }


}
