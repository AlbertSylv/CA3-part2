/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DTOs;

import entities.Dog;
import entities.User;

/**
 *
 * @author baske
 */
public class DogDTO {
    private Long id;
    private String owner; 
    private String breed;
    private String sex;
    private int age;
    private String name;

    public DogDTO(Dog dog) {
        if(dog.getId() != null)this.id = dog.getId();
        this.owner = dog.getOwner().getUserName();
        this.breed = dog.getBreed();
        this.sex = dog.getSex();
        this.age = dog.getAge();
        this.name = dog.getName();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    
    
    
}
