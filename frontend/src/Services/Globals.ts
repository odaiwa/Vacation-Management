abstract class Globals {

}

// General globals only for development:
class DevelopmentGlobals extends Globals {

    public vacationsUrl = "http://localhost:3001/api/vacations/";  
    public usersUrl = "http://localhost:3001/api/users/"; 
    public followersUrl = "http://localhost:3001/api/follows/"; 
    public registerUrl = "http://localhost:3001/api/auth/register/";
    public loginUrl = "http://localhost:3001/api/auth/login/";
    public socketUrl = "http://localhost:3001/";
}


// General globals only for production:
class ProductionGlobals extends Globals {
    public vacationsUrl = "http://localhost:3001/api/vacations/";  
    public usersUrl = "http://localhost:3001/api/users/"; 
    public followersUrl = "http://localhost:3001/api/followers/"; 
    public registerUrl = "http://localhost:3001/api/auth/register/";
    public loginUrl = "http://localhost:3001/api/auth/login/";
     public socketUrl = "http://localhost:3001/";
}

const globals = process.env.NODE_ENV === "production" ? new ProductionGlobals() : new DevelopmentGlobals();

export default globals;