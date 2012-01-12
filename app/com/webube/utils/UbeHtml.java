package com.webube.utils;

import org.apache.commons.codec.DecoderException;
import org.apache.commons.codec.net.URLCodec;

/**
 * Created by IntelliJ IDEA.
 * User: guillaumebadin
 * Date: 12/01/12
 * Time: 23:55
 * To change this template use File | Settings | File Templates.
 */
public class UbeHtml {

    private final static URLCodec urlCodec = new URLCodec("utf-8");


    public static String decode(String strToDecode) {
        try {
            return urlCodec.decode(strToDecode);
        } catch (DecoderException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            return null;
        }
    }

}
