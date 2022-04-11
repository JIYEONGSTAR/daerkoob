import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import React from "react";
import Home from "../pages/Home";
import Mypage from "pages/Mypage";
import Auth from "../pages/Auth";
import Form from "../pages/Form";
import Navbar from "Layout/Navbar";
import Footer from "Layout/Footer";
import Notice from "../pages/Notice/index";
import Detail from "../pages/Detail";
import useCurrentUser from "Hooks/useCurrentUser";
import FriendPage from "pages/Mypage/FriendPage";
import NotFound from "pages/NotFound";
import Register from "pages/Register";
const Router = () => {
  const { currentUser } = useCurrentUser();
  const pushWhenSignedIn = (Component) =>
    currentUser.id !== 0 ? (
      Component
    ) : (
      <Redirect
        to={{
          pathname: "/auth",
          state: {
            from: "/mypage",
          },
        }}
      />
    );
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/mypage"
          render={() => pushWhenSignedIn(<Mypage />)}
        />
        <Route exact path="/friendPage/:id" component={FriendPage} />
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/form" component={Form} />
        <Route exact path="/notice" component={Notice} />
        {/* <Route path="/transcription" component={Review} /> */}
        <Route exact path="/detail/:isbn" component={Detail} />
        <Route exact path="/register/:isbn" component={Register} />
        {/*        
        <Route path="/bookregister/:id" component={BookRegister} />
        id를 파라미터로 받기
         */}
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
