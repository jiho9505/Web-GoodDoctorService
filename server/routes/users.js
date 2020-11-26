const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");
const { Tokenauth } = require("../models/Tokenauth")
const { Board } = require("../models/Board");
const { Alert } = require("../models/Alert");
const { Like } = require("../models/Like")
const { Comment } = require("../models/Comment")
const { Alarm } = require("../models/Alarm")
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const config = require('../config/key')

router.get("/auth", auth, (req, res) => {
    res.status(200)
        .json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        nickname: req.user.nickname,
        role: req.user.role,
        
    })

});

router.post("/register", (req, res) => {
    User.findOne({ nickname : req.body.nickname } , (err,userInfo)=>{
        if(err) return res.json({ success: false, message: 'Error 발생..' })
        if(userInfo) return res.json({ success: false, message: '중복된 닉네임이 있습니다' })

        const user = new User(req.body);
            user.save((err, doc) => {                                                                                    
                if (err) return res.json({ success: false, message: '중복된 E-mail이 있습니다' });
                return res.status(200).json({
                    success: true
                });
    });
    })
    
});

router.post("/info", (req, res) => {
    User.findOne({ _id : req.body._id } , (err,userInfo)=>{
        if(err) return res.json({ success: false })
        return res.json({ success: true, userInfo })
    
})
})

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "E-mail을 확인해주세요."
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "비밀번호를 확인해주세요" });

            user.generateToken((err, user) => {
                if (err) return res.send(err);
     
                 res.cookie("w_auth", user.token , { httpOnly: true ,  secure: process.env.NODE_ENV === 'production'  })
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});



router.post("/findpassword", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                success: false,
                message: 'E-mali이 존재하지 않습니다'
            });

        const token = crypto.randomBytes(20).toString('hex'); // token 생성
        const data = { // 데이터 정리
            token,
            userId: user._id,
            //ttl: 300000 // ttl 값 설정 (5분)
        };
        
        const tokenauth = new Tokenauth(data)
        
        tokenauth.save((err,doc)=>{
            if(err) {
                return res.json({
                    success: false,
                    message: '오류 발생-다시 입력해주시기 바랍니다'
                })
            }
            return res.status(200).json({
                success: true
            })
        })
        
        const transporter = nodemailer.createTransport({
            service: 'Naver',
            host: 'smtp.naver.com',
            port: 587,
            auth: { // 이메일을 보낼 계정 데이터 입력
              user: config.MAIL_EMAIL,
              pass: config.MAIL_PASS,
            },
          });
        const emailOptions = { // 옵션값 설정
              from: config.MAIL_EMAIL,
              to: req.body.email,
              subject: '[숨은 명의 찾기] 비밀번호 초기화 이메일입니다.',
              html: `<div>
              <h1 style="color:#ffa940;  font-family: roboto,helvetica neue,helvetica,arial,sans-serif;
               display:flex; justify-content:flex-end;">[숨은 명의 찾기]</h1>
              <hr></hr>
              <h2 style="color:#ffa940; font-family: roboto,helvetica neue,helvetica,arial,sans-serif"> 
              비밀번호 찾기 요청 </h2>
              <br></br>
              <p>[숨은 명의 찾기]에서 비밀번호 찾기를 요청하셔서 보낸 이메일입니다.</p>
              <p>(만약 실수로 변경신청을 하셨다면 이 이메일을 무시해 주세요)</p>
              <p>본인이 맞으시다면 비밀번호 초기화를 위해서 아래의 '버튼'을 클릭하여 주세요.</p>
              <br></br>
              <a href=https://www.findgooddoctors.co.kr/reset/${token}><button>비밀번호 초기화</button></a></div>`
            
            };
            transporter.sendMail(emailOptions, res); //전송
        });
     });
 

router.post('/resetpw', (req, res) => {
   Tokenauth.findOne({ token : req.body.tokenId } , (err,info)=>
    {     
        if(err){
            return res.json({
                success:false,
                message:'Error..'
            })
        }
        if(!info){
            return res.json({
                success:false,
                message:'제한시간 초과... 비밀번호 찾기 절차를 다시 밟아주세요.'
            })
        }
      
        User.findOne({_id:info.userId}
            , (err,userInfo) => {                
                 if(err) return res.json({ success : false ,
                    message:'Error 발생...'})
                 const user = userInfo
                 user.password = req.body.password
                 user.save((err)=>{
                     if(err) return res.json({ success : false , 
                        message:'Error 발생...'})
                     return res.status(200).json({ success : true})
                 })
                 }) 

        })   
    }
)

router.post("/changepwd", (req, res) => {
    User.findOne({_id : req.body._id})
        .exec((err,user)=>{
            if(err) return res.json({success: false, message:"Error 발생.."})

            user.comparePassword(req.body.prepassword, (err, isMatch) => {
                if(err) return res.json({success: false, message:"Error 발생.."})
                if (!isMatch) return res.json({ success: false, message: "현재 비밀번호를 바르게 입력해주세요" });
            
                user.password = req.body.password
                user.save((err,info)=>{
                        if(err) return res.json({success: false, message:"Error 발생.."})
                        res.json({success: true, message: "변경에 성공하였습니다!"})
                        })                    
                })
             })
        })


router.post("/remove", (req, res) => {

    const min = 1000 * 60
    const hour = min * 60
    const hour24 = hour * 24

    const uIPromise = () => {
         return new Promise((resolve, reject) => {
        
            User.findOne({_id : req.body._id})
                .exec((err,user)=>{
                    if(err) reject(new Error("Error 발생.."))
                    resolve(user)
          
         })
       })}

    const pwdPromise = (user) => {
        return new Promise((resolve, reject) => {
          
            user.comparePassword(req.body.password, (err, isMatch) => {
                if(err) reject(new Error("Error 발생.."))
                if(!isMatch) reject(new Error("현재 비밀번호를 바르게 입력해주세요"))
                if(Date.now() > user.createdAt.valueOf() + hour24) reject(new Error("가입 후 24시간 이후에 탈퇴 가능합니다"))
                resolve()
          
        })
      })}

      const DBPromise_1 = (user) => {
        return new Promise((resolve, reject) => {
       
            User.findOneAndDelete({_id : user._id},(err)=>{
                if(err) reject(new Error("Error 발생.."))
                resolve()
            })
          
        })
      }

      const DBPromise_2 = (user) => {
        return new Promise((resolve, reject) => {
       
            Board.deleteMany({writer : user._id})
                    .exec((err)=>{
                    if(err) reject(new Error("Error 발생.."))
                    resolve()
        })  
          
        })
      }

      const DBPromise_3 = (user) => {
        return new Promise((resolve, reject) => {
       
            Like.deleteMany({userId : user._id}) 
                    .exec((err)=>{
                        if(err) reject(new Error("Error 발생.."))
                        resolve()
            // 게시물 자체 Like를 삭제해야하지만 시스템에 이상은 없음 (DB만 남음)
        })
        })  
          
      }

      const DBPromise_4 = (user) => {
        return new Promise((resolve, reject) => {
       
            Alarm.deleteMany({userId : user._id}) 
                .exec((err)=>{
                    if(err) reject(new Error("Error 발생.."))
                    resolve()
                })
          
        })
      }

      const DBPromise_5 = (user) => {
        return new Promise((resolve, reject) => {
       
            Alarm.deleteMany({toWhom : user._id}) 
                .exec((err)=>{
                    if(err) reject(new Error("Error 발생.."))
                    resolve()
                })
          
        })
      }

      const DBPromise_6 = (user) => {
        return new Promise((resolve, reject) => {
       
            Alert.deleteMany({userId : user._id}) 
                .exec((err)=>{
                    if(err) reject(new Error("Error 발생.."))
                    resolve()
                })
          
        })
      }

      const DBPromise_7 = (user) => {
        return new Promise((resolve, reject) => {
       
             Comment.find({writer : user._id})
                    .exec((err,results) => {
                        if(err) reject(new Error("Error 발생.."))
                        resolve(results)
                })
          
        })
      }

      const DBPromise_8 = async (results) => {
       
        await Promise.all(
            results.map((resultInfo)=>{
                
                if(resultInfo.responseTo){                   
                        Board.findOneAndUpdate({_id : resultInfo.postId},{ $inc: { "commentCount": -1 } }).exec()    
                        Comment.deleteOne({_id : resultInfo._id}).exec()
                        }
                 else{
                        Comment.find({ responseTo : resultInfo._id})
                               .exec((comlength)=>{
                                    if(comlength){
                                        let count = (comlength.length * -1) - 1;
                                        Board.findOneAndUpdate({_id : resultInfo.postId},{ $inc: { "commentCount": count } }).exec()
                                    }
                                    else{
                                        Board.findOneAndUpdate({_id : resultInfo.postId},{ $inc: { "commentCount": -1 } }).exec()
                                    }
                                    
                        Comment.deleteOne({_id : resultInfo._id}).exec()
                        Comment.deleteMany({responseTo : resultInfo._id}).exec()   
                        // if와 else 둘의 실행순서가 보장되야할듯                                   
                                })
                            }}
        ))
                    .catch(()=>{throw new Error("Error 발생..")})
    } 
               

      const callMyPromise = async () => { 
        
        try{
        const userInfo = await uIPromise();
        
        await pwdPromise(userInfo);
        const DBresult = await DBPromise_7(userInfo)
        await DBPromise_8(DBresult)
        await Promise.all([DBPromise_1(userInfo),DBPromise_2(userInfo),DBPromise_3(userInfo),
            DBPromise_4(userInfo),DBPromise_5(userInfo),DBPromise_6(userInfo)])
        
        return res.json({success: true})
        }
        catch(err){
            return res.json({success: false, message:err.toString()})
        }
        

       };

       callMyPromise()
  })
             

module.exports = router;
