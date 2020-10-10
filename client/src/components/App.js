import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import CommunityPage from "./views/CommunityPage/CommunityPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import Postlist from "./views/CommunityPage/NoticeBoard/PostList/Postlist"
import DetailBoardPage from "./views/CommunityPage/DetailBoardPage/DetailBoardPage"
import Logo from "./views/Logo/Logo"
import FindPassword from "./views/LoginPage/FindPassword/FindPassword"
import FindPwNextPage from  "./views/LoginPage/FindPassword/FindPwNextPage"
import ResetPw from  "./views/LoginPage/FindPassword/ResetPw"
import NotFound from "./views/NotFound/NotFound"
import Success from "./views/Success/Success"
import MyPage from "./views/MyPage/MyPage"
import Admin from "./views/Admin/Admin"
import MustRead from "./views/MustRead/MustRead"

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
       
      
      
      <div style={{ minHeight: 'calc(100vh - 80px)' }}>
        <div style={{ paddingTop: '140px'}}>
          <Logo/>
        </div>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/community" component={Auth(CommunityPage, null)} />
          <Route exact path="/write" component={Auth(Postlist, true)} />
          <Route exact path="/mypage" component={Auth(MyPage, true)} />
          <Route exact path="/mustread" component={Auth(MustRead, null)} />
          <Route exact path="/admin" component={Auth(Admin, true, true)} />
          <Route exact path="/findpassword" component={Auth(FindPassword, false)} />
          <Route exact path="/findpwnextpage" component={Auth(FindPwNextPage, false)} />
          <Route exact path="/reset/:tokenId" component={Auth(ResetPw, false)} />
          <Route exact path="/success" component={Auth(Success, null)} />
          <Route exact path="/community/:postId" component={Auth(DetailBoardPage, true)} />
          <Route exact path="/:notfound" component={Auth(NotFound, null)} />
          
          
        </Switch>
      </div>
      <Footer />
    </Suspense>
  
  );
}

export default App;
