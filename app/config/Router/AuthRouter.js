import ForgotPasswordScreen from "../../modules/auth/screens/ForgotPassword";
import RegisterScreen from "../../modules/auth/screens/Register";
import {StackNavigator} from "react-navigation";
import LoginScreen from "../../modules/auth/screens/Login";
import WelcomeScreen from "../../modules/auth/screens/Welcome";

export default StackNavigator({
    Welcome: {screen: WelcomeScreen},
    Register: {screen: RegisterScreen},
    Login: {screen: LoginScreen},
    ForgotPassword: {screen: ForgotPasswordScreen},
}, {
    initialRouteName: 'Welcome',
});