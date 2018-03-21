package com.logic.controller;

import com.logic.model.Service;
import com.logic.repository.IEmployeeRepository;
import com.logic.repository.IServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by xareen on 24.10.2017.
 */
@Controller
public class ShowServiceController {
    @Autowired
     private IServiceRepository serviceRepository;

//    tylko do wyświetlania zalogowanego użytkownika
//    @Autowired
//    IEmployeeRepository employeeRepository;

    @RequestMapping(value = "/auth/showServices", method = RequestMethod.POST)
    public ResponseEntity<List<Service>> showService (Authentication authentication){

        List<Service> service = serviceRepository.findAll();

        return new ResponseEntity<>(service, HttpStatus.OK);


//        List<Service> service = new ArrayList<>();
//        List<String> nameList = new ArrayList<>();
//        List<Integer> priceList = new ArrayList<>();
//        List<Integer> timeList = new ArrayList<>();
//
////        service = serviceRepository.findAllByNameContaining("example");
//        service = serviceRepository.findAll();
//        for (Service i : service) {
//            nameList.add(i.getName());
//            priceList.add(i.getPrice());
//            timeList.add(i.getTime());
//        }
//        model.addAttribute("name", nameList);
//        model.addAttribute("price", priceList);
//        model.addAttribute("time", timeList);
//        model.addAttribute("service", new Service());
//        model.addAttribute("userInfo", userInfo);
//        return "addService";
    }
}
