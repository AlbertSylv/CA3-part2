/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import DTOs.RandomDogBreedDTO;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeoutException;
import javax.persistence.EntityManagerFactory;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.UriInfo;
import utils.EMF_Creator;
import utils.HttpUtils;

/**
 *
 * @author baske
 */
@Path("breeds")
public class DogResource {
    private static final EntityManagerFactory EMF = EMF_Creator.createEntityManagerFactory(); 
    private static Gson GSON = new Gson();
    @Context
    private UriInfo context;

    @Context
    SecurityContext securityContext;
        @GET
    @Produces(MediaType.APPLICATION_JSON)              
     public String getRandomBreed() throws IOException, InterruptedException, ExecutionException, TimeoutException {
        String URL = "https://dog.ceo/api/breeds/list/random";
        
        String jsonString = HttpUtils.fetchData(URL);
 

        RandomDogBreedDTO breedDTO = new RandomDogBreedDTO(GSON.fromJson(jsonString, JsonObject.class).get("message").toString());


        return GSON.toJson(breedDTO);
    }


}
