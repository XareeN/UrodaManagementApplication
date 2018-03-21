package com.logic.controller;

import com.logic.model.Service;
import com.logic.repository.IServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Created by xareen on 21.10.2017.
 */
@RestController
@RequestMapping("/service")
public class ServiceController {


    @Autowired
    IServiceRepository serviceRepository;

    //create
    @RequestMapping(method = RequestMethod.POST)
    public void create(@RequestBody Service service){
        serviceRepository.save(service);
    }


    //read
    @RequestMapping(value = "/{_id}")
    public Service read(@PathVariable String id){
        return serviceRepository.findOne(id);
    }


    //update
    @RequestMapping(method = RequestMethod.PUT)
    public void update(@RequestBody Service service){
        serviceRepository.save(service);
    }


    //delete
    @RequestMapping(value = "/{_id}", method = RequestMethod.DELETE)
    public void delete(String id){
        serviceRepository.delete(id);
    }

}
