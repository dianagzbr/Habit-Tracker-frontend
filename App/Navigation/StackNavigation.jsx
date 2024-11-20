import { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import 'react-native-gesture-handler';
import LoginScreen from '../Screens/Login';
import SignUpScreen from '../Screens/Register';
import PasswordScreen from '../Screens/Password';
import VerifyOTPScreen from '../Screens/VerifyOTP';
import ResetPasswordScreen from '../Screens/ResetPassword';
import HomeScreen from '../Screens/Home';
import ProgressScreen from '../Screens/Progress';
import AddHabitScreen from '../Screens/AddHabit';
import HabitDetailScreen from '../Screens/HabitDetail';
import HabitHistoryScreen from "../Screens/HabitHistory";
import EditHabitScreen from "../Screens/EditHabit";
import SettingsScreen from "../Screens/Settings";
import AccountScreen from "../Screens/Account";
import TermsAndConditionsScreen from "../Screens/TermsAndConditions";
import PrivacyPolicyScreen from "../Screens/PrivacyPolicy";
import VerifyEmailScreen from "../Screens/VerifyEmail";

const Stack = createStackNavigator();

const StackNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen 
                name="LoginScreen"
                component={LoginScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="SingUpScreen"
                component={SignUpScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="PasswordScreen"
                component={PasswordScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="VerifyOTPScreen"
                component={VerifyOTPScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="ResetPasswordScreen"
                component={ResetPasswordScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="PasswordScreen"
                component={PasswordScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="VerifyOTPScreen"
                component={VerifyOTPScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="VerifyEmailScreen"
                component={VerifyEmailScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    headerLeft: () => null,
                    title: ' ',
                }}
            />
            <Stack.Screen
                name="ProgressScreen"
                component={ProgressScreen}
                options={{title: ' '}}
            />
            <Stack.Screen
                name="AddHabit"
                component={AddHabitScreen}
                options={{title: ' '}}
            />
            <Stack.Screen
                name="HabitDetail"
                component={HabitDetailScreen}
                options={{title: ' '}}
            />
            <Stack.Screen
                name="HabitHistory"
                component={HabitHistoryScreen}
                options={{title: ' '}}
            />
            <Stack.Screen
                name="EditHabit"
                component={EditHabitScreen}
                options={{title: ' '}}
            />
            <Stack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{title: ' '}}
            />
            <Stack.Screen
                name="Account"
                component={AccountScreen}
                options={{title: ' '}}
            />
            <Stack.Screen
                name="TermsAndConditionsScreen"
                component={TermsAndConditionsScreen}
                options={{title: ' '}}
            />
            <Stack.Screen
                name="PolicyScreen"
                component={PrivacyPolicyScreen}
                options={{title: ' '}}
            />

        </Stack.Navigator>
    )
}

export default StackNavigation;