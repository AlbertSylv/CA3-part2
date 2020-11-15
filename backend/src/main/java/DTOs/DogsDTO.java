/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DTOs;

import entities.Dog;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author baske
 */
public class DogsDTO {
    private List<DogDTO> allDogs = new ArrayList();

    public DogsDTO(List<Dog> dogs) {
        dogs.forEach((d) -> {
            allDogs.add(new DogDTO(d));
        });
    }

    public DogsDTO() {
    }
    
    

    public List<DogDTO> getAll() {
        return allDogs;
    }
    
    public void addDog(DogDTO dDTO){
        allDogs.add(dDTO);
    }
    
}
