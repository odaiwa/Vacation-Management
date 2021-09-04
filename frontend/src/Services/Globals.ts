abstract class Globals {

}

class DevelopmentGlobals extends Globals {

    public vacationsUrl = "http://localhost:3001/api/vacations/";  
    public usersUrl = "http://localhost:3001/api/users/"; 
    public followersUrl = "http://localhost:3001/api/follows/"; 
    public registerUrl = "http://localhost:3001/api/auth/register/";
    public loginUrl = "http://localhost:3001/api/auth/login/";
    public socketUrl = "http://localhost:3001/";
}



class ProductionGlobals extends Globals {
    public vacationsUrl = "https://vacation-rest-api.herokuapp.com/api/vacations/";  
    public usersUrl = "https://vacation-rest-api.herokuapp.com/api/users/"; 
    public followersUrl = "https://vacation-rest-api.herokuapp.com/api/followers/"; 
    public registerUrl = "https://vacation-rest-api.herokuapp.com/api/auth/register/";
    public loginUrl = "https://vacation-rest-api.herokuapp.com/api/auth/login/";
     public socketUrl = "https://vacation-rest-api.herokuapp.com/";
}

const globals = process.env.NODE_ENV === "production" ? new ProductionGlobals() : new DevelopmentGlobals();

export default globals;