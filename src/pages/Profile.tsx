import React from 'react';
import ProfileComponent from "../components/TaskFolder/Profile/ProfileComponent";
import UserState from "../store/UserState";
import {observer} from "mobx-react-lite";
import Auth from "../components/TaskFolder/Auth/Auth";

const Profile = observer(() => {
        if(UserState.token) {
            return <ProfileComponent/>
        } else {
            return <Auth type={'log'}/>
        }
});

export default Profile;