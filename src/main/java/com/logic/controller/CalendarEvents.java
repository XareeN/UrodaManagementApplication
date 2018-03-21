package com.logic.controller;

import com.logic.model.Calendar;
import com.logic.model.CalendarModified;
import com.logic.repository.IEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequestMapping("/auth")
@RestController
public class CalendarEvents {
    @Autowired
    private IEventRepository eventRepository;

    @PostMapping("/addEvent")
    public ResponseEntity<Calendar> addEvent(@RequestBody Calendar calendar) {
        eventRepository.save(calendar);

        return new ResponseEntity<>(calendar, HttpStatus.OK);
    }

    @RequestMapping(value = "/deleteEvent", method = RequestMethod.POST)
    public ResponseEntity<Calendar> deleteEvent(@RequestBody Calendar calendar) {
        eventRepository.delete(calendar);

        return new ResponseEntity<>(calendar, HttpStatus.OK);
    }


    @RequestMapping(value = "/showEvents", method = RequestMethod.POST)
    public ResponseEntity<List<CalendarModified>> showEvents() {
        List<CalendarModified> calendarModifieds = new ArrayList<>();
        List<Calendar> calendar = eventRepository.findAll();

        for (Calendar i : calendar) {
            CalendarModified calendarModified = new CalendarModified();
            calendarModified.setId(i.getId());
            calendarModified.setTitle("Zabieg: " + i.getTitle() + "\n Klient: " + i.getClient() + "\n Cena: " + i.getPrice() + "zł \n Pracownik: " + i.getEmployee());
            calendarModified.setStart(i.getDate() + "T" + i.getStartParam());
            calendarModified.setEnd(i.getDate() + "T" + i.getEndParam());
            calendarModified.setTimezone("UTC");
            calendarModified.setColor("");

            calendarModifieds.add(calendarModified);
        }

        return new ResponseEntity<>(calendarModifieds, HttpStatus.OK);
    }
}
