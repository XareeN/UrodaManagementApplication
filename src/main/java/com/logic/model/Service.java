package com.logic.model;

import org.springframework.data.annotation.Id;

/**
 * Created by xareen on 21.10.2017.
 */
public class Service {

    @Id
    private String id;
    private String name;
    private int price;
    private int time;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getTime() {
        return time;
    }

    public void setTime(int time) {
        this.time = time;
    }
}
