import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './app.css';

/* pages */
import ChatRoom from './pages/ChatRoom';
import Settiing from './pages/Settiing';
import Home from './pages/Home';
import ContactsList from './pages/ContactsList';
import OnBoard from './pages/OnBoard';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ProfileDetails from './pages/ProfileDetails';
import PrivateRoute from './components/PrivateRoute';

import { connect, useDispatch } from 'react-redux';
import { getUserInfo, setUserInfo } from './store/userActions';
import { getPreferences, setPreferences } from './store/preferenceActions';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { rootState } from './store/rootReducer';
import { ThunkDispatch } from 'redux-thunk';
import { UserState } from './store/types';

const App: React.FC = () => {
  const dispatch: ThunkDispatch<UserState, any, AnyAction> = useDispatch();
  useEffect(() => {
    dispatch(getUserInfo());
    dispatch(getPreferences());
  }, [dispatch]);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path='/intro' component={OnBoard} exact={true} />
          <Route path='/signup' component={SignUp} exact={true} />
          <Route path='/login' component={Login} exact={true} />
          <Route path='/profile' component={ProfileDetails} exact={true} />
          <PrivateRoute path='/home' component={Home} exact={true} />
          <PrivateRoute
            path='/chatroom/:id'
            component={ChatRoom}
            exact={true}
          />
          <PrivateRoute path='/setting' component={Settiing} exact={true} />
          <PrivateRoute
            path='/contactList'
            component={ContactsList}
            exact={true}
          />
          <Route exact path='/' render={() => <Redirect to='/home' />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};
const MapStateToProps = (store: rootState) => ({
  userInfo: store.userInfo,
  preference: store.userInfo,
});
const mapDispachProps = (dispatch: Dispatch) =>
  bindActionCreators(
    { getPreferences, getUserInfo, setUserInfo, setPreferences },
    dispatch
  );
export default connect(MapStateToProps, mapDispachProps)(App);
