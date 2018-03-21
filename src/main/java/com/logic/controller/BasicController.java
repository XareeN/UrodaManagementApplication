package com.logic.controller;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by xareen on 12.10.2017.
 */

@Controller
public class BasicController {

    @RequestMapping({
            "/{path:(?!.*.js|.*.css|.*.jpg).*$}",
            "/main/{path:(?!.*.js|.*.css|.*.jpg).*$}",
            "/auth/{path:(?!.*.js|.*.css|.*.jpg).*$}",
            "/"
    })
    public String index() {
        return "index";
    }


//    @RequestMapping("/login")
//    public String login (){
//        return "login";
//    }
//
//    @RequestMapping("/logout")
//    public String logout (){
//        return "logout";
//    }
//webp
//    @RequestMapping("/test")
//    public String test (){
//        return "test";
//    }


}
