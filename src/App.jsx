import React from "react";
import { Route, Switch, Redirect } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from 'easy-peasy';
import easyStore from 'Store';
import muiTheme from 'Style/muiTheme';
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles'

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { useStyles, StyledSpinner } from 'Style/components'

import Footer from "Components/Footer/Footer.jsx";
import HeaderContainer from "Components/Header/HeaderContainer.jsx";
import TheftMessageContainer from "Components/TheftMessage/TheftMessageContainer.jsx";
import UserCreateContainer from "Components/UserCreate/UserCreateContainer.jsx";
import SignInContainer from "Components/SignIn/SignInContainer.jsx";
import MainContainer from "Components/Main/MainContainer.jsx";
import AuthorizedMenuContainer from "Components/AuthorizedMenu/AuthorizedMenuContainer.jsx";
import OfficersContainer from "Components/Officers/OfficersContainer.jsx";
import StolenBikesContainer from "Components/StolenBikes/StolenBikesContainer.jsx";

const App = () => {
  const classes = useStyles();
    return (
      <div className={classes.root}>
      <CssBaseline />
        <Container>
        <HeaderContainer />
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '87vh' }}
          >
            <Grid item xs={12} className={classes.paper}>
              <React.Suspense fallback={<StyledSpinner/>}>
                <Switch>
                  <Route path="/registration" component={UserCreateContainer} />
                  <Route path="/sign-in" component={SignInContainer} />
                  <Route path="/menu" component={AuthorizedMenuContainer} />
                  <Route path="/officers" component={OfficersContainer} />
                  <Route path="/stolen-bikes" component={StolenBikesContainer} />
                  <Route path="/theft-message" component={TheftMessageContainer} />
                  <Route path="/" exact component={MainContainer} />
                  <Route path="*" render={() => <MainContainer/>} />
                </Switch>
              </React.Suspense>
            </Grid>   
          </Grid>
          </Container>
      <Footer />
    </div>
    );
}

const BikeApp = () => {
  return (
    <BrowserRouter>
      <StoreProvider store={easyStore}>
        <MuiThemeProvider theme={muiTheme}>
          <App />
        </MuiThemeProvider>
      </StoreProvider>
    </BrowserRouter>
  );
};

export default BikeApp;