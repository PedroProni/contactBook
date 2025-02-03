import 'core-js/stable';
import 'regenerator-runtime/runtime';
import User from './modules/User';
import Contact from './modules/Contact';

const register = new User('.register-form');
const login = new User('.login-form');

register.execute();
login.execute();

const contact = new Contact('.contact-form');
contact.execute();




// import "./assets/css/style.css";
