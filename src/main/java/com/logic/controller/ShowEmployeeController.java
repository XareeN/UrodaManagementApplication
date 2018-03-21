package com.logic.controller;

import com.logic.model.Employee;
import com.logic.repository.IEmployeeRepository;
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
 * Created by xareen on 21.11.2017.
 */
@Controller
public class ShowEmployeeController {
    @Autowired
     private IEmployeeRepository employeeRepository;

    @RequestMapping(value = "/auth/showUsers", method = RequestMethod.POST)
    public ResponseEntity<List<Employee>> showEmployee (Authentication authentication){

        List<Employee> employee = employeeRepository.findAll();

        return new ResponseEntity<>(employee, HttpStatus.OK);

//        String userInfo = employeeRepository.findByEMail(authentication.getName()).geteMail();

//        List<Employee> employeeList;
//        List<String> firstNameList = new ArrayList<>();
//        List<String> lastNameList = new ArrayList<>();
//        List<String> telNoList = new ArrayList<>();
//        List<String> dateOfBirthList = new ArrayList<>();
//        List<String> emailList = new ArrayList<>();
//        List<List<String>> roleList = new ArrayList<>();
//        List<Integer> isActiveList = new ArrayList<>();
//        List<String> passwordList = new ArrayList<>();
//
//        employeeList = employeeRepository.findAll();
//        for(Employee i : employeeList){
//            firstNameList.add(i.getFirstName());
//            lastNameList.add(i.getLastName());
//            telNoList.add(i.getTelNo());
//            dateOfBirthList.add(i.getDateOfBirth());
//            emailList.add(i.geteMail());
//            roleList.add(i.getRole());
//            isActiveList.add(i.getIsActive());
//            passwordList.add(i.getPassword());
//        }
//        model.addAttribute("firstName", firstNameList);
//        model.addAttribute("lastName", lastNameList);
//        model.addAttribute("telNo", telNoList);
//        model.addAttribute("dateOfBirth", dateOfBirthList);
//        model.addAttribute("eMail", emailList);
//        model.addAttribute("role", roleList);
//        model.addAttribute("isActive", isActiveList);
//        model.addAttribute("password", passwordList);
//        model.addAttribute("employee", new Employee());
//        model.addAttribute("userInfo", userInfo);
//        return "addEmployee";
    }
}
