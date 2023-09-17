import { configureStore } from '@reduxjs/toolkit';
import UsersReducer from './reducers/users';
import ProgressReducer from './reducers/progress';
import NotificationsReducer from './reducers/notifications';
import SiteReducer from './reducers/site';

export const store = configureStore({
    reducer:{
        users: UsersReducer,
        progress: ProgressReducer,
        notifications: NotificationsReducer,
        site:SiteReducer
    }
})