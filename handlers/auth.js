const db = require('../models/index');
const jwt = require('jsonwebtoken');
exports.signin = async function(req,res,next){
	try{
	// find a user 
	let user = await db.User.findOne({
		email: req.body.email
	})
	let {id,username,profileImageUrl} = user;
	let isMatch = await user.comparePassword(req.body.password);
	// checking if their password matches what was sent to the server
	if(isMatch){
		let token = jwt.sign({
			id,
			username,
			profileImageUrl
			},
			process.env.SECRET_KEY
		);
		//  if it all matches
			// log them in
		return res.status(200).json({
			id,
			username,
			profileImageUrl,
			token
		})
	}else{
		return next({
			status: 400,
			message: "Invalid Email/Password"
		})
	}

	}catch(e){
		return next({
			status: 400,
			message: "Invalid Email/Password"
		});
	}

};
exports.signup = async function(req,res,next){
	try{
		let user = await db.User.create(req.body);
		let { id, username, profileImageUrl} = user;
		let token = jwt.sign({
			id,
			username,
			profileImageUrl
		},
			process.env.SECRET_KEY
		);
		return res.status(200).json({
			id,
			username,
			profileImageUrl,
			token
		})
	}catch(err){
		if(err.code === 11000){
			err.message = "Sorry, that username and/or email is taken"
		}
		return next({
			status: 400,
			message: err.message
		})
	}
}