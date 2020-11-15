package facades;

import DTOs.DogDTO;
import DTOs.DogsDTO;
import DTOs.UserDTO;
import entities.Dog;
import entities.Role;
import entities.User;
import errorhandling.InvalidInputException;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import security.errorhandling.AuthenticationException;

/**
 * @author lam@cphbusiness.dk
 */
public class UserFacade {

    private static EntityManagerFactory emf;
    private static UserFacade instance;

    private UserFacade() {
    }

    /**
     *
     * @param _emf
     * @return the instance of this facade.
     */
    public static UserFacade getUserFacade(EntityManagerFactory _emf) {
        if (instance == null) {
            emf = _emf;
            instance = new UserFacade();
        }
        return instance;
    }

    public User getVeryfiedUser(String username, String password) throws AuthenticationException {
        EntityManager em = emf.createEntityManager();
        User user;
        try {
            user = em.find(User.class, username);
            if (user == null || !user.verifyPassword(password)) {
                throw new AuthenticationException("Invalid user name or password");
            }
        } finally {
            em.close();
        }
        return user;
    }

    public UserDTO addUser(UserDTO userDTO) throws InvalidInputException {
        EntityManager em = emf.createEntityManager();
        String name = null;
        try {
            Query query = em.createQuery("SELECT u.userName FROM User u WHERE u.userName = :name");
            query.setParameter("name", userDTO.getName());
            name = (String) query.getSingleResult();
        } catch (Exception e) {}

        if (name != null) {
            throw new InvalidInputException(String.format("The name %s is already taken", name));
        }

        User user = new User(userDTO.getName(), userDTO.getPassword());
        for (String role : userDTO.getRoles()) {
            user.addRole(new Role(role));
        }
        em.getTransaction().begin();
        em.persist(user);
        em.getTransaction().commit();

        return new UserDTO(user);
    }
    
    public DogDTO addDog(DogDTO dDTO, String username){
        EntityManager em = emf.createEntityManager();
        Dog dog = new Dog(dDTO.getBreed(),dDTO.getSex(),dDTO.getAge(),dDTO.getName());
        
        TypedQuery<User> query = em.createQuery("select u from User u where u.userName = :username", User.class);
        query.setParameter("username", username);
        User user = query.getSingleResult();
        user.addDog(dog);
        
        em.getTransaction().begin();
        em.persist(user);
        em.getTransaction().commit();
        
        DogDTO newDog = new DogDTO(dog);
        return newDog;
    }
        
    public DogDTO removeDog(long id){
        EntityManager em = emf.createEntityManager();
        
        em.getTransaction().begin();
        Dog dog = em.find(Dog.class, id);
        dog.getOwner().removeDog(dog);
        em.remove(dog);
        em.getTransaction().commit();
        
        DogDTO dDTO = new DogDTO(dog);
        return dDTO;
    } 
        
    public DogsDTO getDogs(String username){
        DogsDTO dogs = new DogsDTO(new ArrayList());
        
        EntityManager em = emf.createEntityManager();
        TypedQuery<User> query = em.createQuery("select u from User u where u.userName = :username", User.class);
        query.setParameter("username", username);
        User user = query.getSingleResult();
        
        List<Dog> userDogs = user.getDogs();
        for (Dog d : userDogs) {
            dogs.addDog(new DogDTO(d));
        }
        
        return dogs;
    }
        
    

}
