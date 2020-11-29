import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
import LandingPage from "./views/LandingPage/LandingPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import Logo from "./views/Logo/Logo"
import AdfitWebComponent from 'react-adfit-web-component'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const LoginPage = React.lazy(() => import('./views/LoginPage/LoginPage.js'));
const CommunityPage = React.lazy(() => import('./views/CommunityPage/CommunityPage.js'));
const Postlist = React.lazy(() => import('./views/CommunityPage/NoticeBoard/PostList/Postlist'));
const DetailBoardPage = React.lazy(() => import('./views/CommunityPage/DetailBoardPage/DetailBoardPage'));
const FindPassword = React.lazy(() => import('./views/LoginPage/FindPassword/FindPassword'));
const FindPwNextPage = React.lazy(() => import('./views/LoginPage/FindPassword/FindPwNextPage'));
const ResetPw = React.lazy(() => import('./views/LoginPage/FindPassword/ResetPw'));
const NotFound = React.lazy(() => import('./views/NotFound/NotFound'));
const Success = React.lazy(() => import('./views/Success/Success'));
const MyPage = React.lazy(() => import('./views/MyPage/MyPage'));
const Admin = React.lazy(() => import('./views/Admin/Admin'));
const MustRead = React.lazy(() => import('./views/MustRead/MustRead'));
const Privacy = React.lazy(() => import('./views/Privacy/Privacy'));
const BeforeRegister = React.lazy(() => import('./views/BeforeRegister/BeforeRegister'));
const PreMyComment = React.lazy(() => import('./views/MyPage/MyComment/PreMyComment'));
const PreMyPost = React.lazy(() => import('./views/MyPage/MyPost/PreMyPost'));
const PwdChange = React.lazy(() => import('./views/MyPage/PwdChange/PwdChange'));
const RemoveUser = React.lazy(() => import('./views/MyPage/RemoveUser/RemoveUser'));


function App() {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

  return (
 
    <Suspense fallback={(<div style={{display:'flex', marginTop:'200px', justifyContent:'center', alignItems: 'center'}}>
      <Spin indicator={antIcon} /></div>)}>
      
      <NavBar/>
      
      
      <div style={{ minHeight: 'calc(100vh - 80px)' }}>
        <div className='logo'>
          <Logo/>
        </div>
        <div className='mobilelogo'>
          <div style={{ height: '40px' }}>
          </div>
        </div>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/community" component={Auth(CommunityPage, null)} />
          <Route exact path="/register" component={Auth(BeforeRegister, false)} />
          <Route exact path="/privacy" component={Auth(Privacy, null)} />
          <Route exact path="/write" component={Auth(Postlist, true)} />
          <Route exact path="/mypage" component={Auth(MyPage, true)} />
          <Route exact path="/mycomment" component={Auth(PreMyComment, true)} />
          <Route exact path="/mypost" component={Auth(PreMyPost, true)} />
          <Route exact path="/pwdchange" component={Auth(PwdChange, true)} />
          <Route exact path="/removeuser" component={Auth(RemoveUser, true)} />
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
      <div className='space'></div>


      <div className='ad'>
        <AdfitWebComponent
              adUnit="DAN-V9d7WCyIzwR4YHec"
              />
        <AdfitWebComponent
              adUnit="DAN-jCvwBeZvnWTQuTOM"
              />
      </div>
      
      <Footer />
    </Suspense>
  
  );
}

export default App;
