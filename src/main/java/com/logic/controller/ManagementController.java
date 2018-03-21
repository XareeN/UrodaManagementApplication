package com.logic.controller;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by xareen on 17.12.2017.
 */
@RequestMapping("/config")
@Controller
public class ManagementController {

    @RequestMapping("/tempManagement")
    public String tempManagement (){
        return "/tempManagement";
    }

}
