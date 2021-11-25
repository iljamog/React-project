[1mdiff --git a/backend-node/.gitignore b/backend-node/.gitignore[m
[1mdeleted file mode 100644[m
[1mindex 7af7f04..0000000[m
[1m--- a/backend-node/.gitignore[m
[1m+++ /dev/null[m
[36m@@ -1,2 +0,0 @@[m
[31m-/node_modules[m
[31m-.env[m
\ No newline at end of file[m
[1mdiff --git a/backend-node/controllers/auth.js b/backend-node/controllers/auth.js[m
[1mindex 2d32d99..9b942f7 100644[m
[1m--- a/backend-node/controllers/auth.js[m
[1m+++ b/backend-node/controllers/auth.js[m
[36m@@ -10,27 +10,26 @@[m [mexports.login = async (req, res) => {[m
 [m
     if (!user) throw Error("User with this e-mail does not exist")[m
 [m
[31m-    const isMatch = bcrypt.compare(password, user.password)[m
[32m+[m[32m    const isMatch = await bcrypt.compare(password, user.password)[m
     if (!isMatch) throw Error("I should not say that the password does not match")[m
 [m
     const userTemplate = {[m
[31m-      user: {[m
[31m-        id: user.id,[m
[31m-        firstName: user.firstName,[m
[31m-        lastName: user.lastName,[m
[31m-        email[m
[31m-      }[m
[32m+[m[32m      id: user.id,[m
[32m+[m[32m      firstName: user.firstName,[m
[32m+[m[32m      lastName: user.lastName,[m
[32m+[m[32m      email[m
     }[m
 [m
     const token = jwt.sign(userTemplate, process.env.JWT_SECRET)[m
[31m-    if (!token) throw Error("Something critical happened 720631")[m
[32m+[m[32m    if (!token) throw Error("Something critical happened 99981811")[m
 [m
     res.status(200).json({[m
       token,[m
       ...userTemplate[m
     })[m
[31m-  } catch (e) { [m
[31m-    res.status(400).json({ error: e.message})[m
[32m+[m
[32m+[m[32m  } catch (e){[m
[32m+[m[32m    res.status(400).json({ error: e.message })[m
   }[m
 }[m
 [m
[36m@@ -43,10 +42,10 @@[m [mexports.signup = async (req, res) => {[m
     if (user) throw Error("User with that e-mail already exists")[m
 [m
     const salt = await bcrypt.genSalt(10)[m
[31m-    if (!salt) throw Error("Something critical happened 356457")[m
[32m+[m[32m    if (!salt) throw Error("Something critical happened 483543875")[m
 [m
     const hash = await bcrypt.hash(password, salt)[m
[31m-    if (!hash) throw Error("Something critical happened 123415")[m
[32m+[m[32m    if (!hash) throw Error("Something critical happened 123172387")[m
 [m
     const newUser = new User({[m
       firstName,[m
[36m@@ -59,8 +58,7 @@[m [mexports.signup = async (req, res) => {[m
     if (!savedUser) throw Error("Error saving user")[m
 [m
     res.status(200).json({ message: "User created successfully" })[m
[31m-[m
   } catch (e) {[m
[31m-    res.status(400).json({error: e.message})[m
[32m+[m[32m    res.status(400).json({ error: e.message })[m
   }[m
 }[m
\ No newline at end of file[m
[1mdiff --git a/backend-node/middleware/jwtAuth.js b/backend-node/middleware/jwtAuth.js[m
[1mindex 7dc9749..88e2718 100644[m
[1m--- a/backend-node/middleware/jwtAuth.js[m
[1m+++ b/backend-node/middleware/jwtAuth.js[m
[36m@@ -1,13 +1,17 @@[m
 const jwt = require("jsonwebtoken")[m
[32m+[m
 const jwtAuth = (req, res, next) => {[m
   try {[m
[32m+[m[32m    if (!req.headers["authorization"]) throw Error("Access denied");[m
 [m
[31m-    if (!req.headers["authorization"]) throw Error("Access denied")[m
[31m-    [m
[32m+[m[32m    // Authorization: Bearer token[m
     const accesToken = req.headers.authorization.split(" ")[1][m
[32m+[m
     const decoded = jwt.verify(accesToken, process.env.JWT_SECRET)[m
     req.user = decoded[m
[32m+[m
     next()[m
[32m+[m
   } catch (e) {[m
     return res.status(401).send({ error: e.message })[m
   }[m
[1mdiff --git a/backend-node/middleware/validationMiddleware.js b/backend-node/middleware/validationMiddleware.js[m
[1mindex 048dcbc..4727b15 100644[m
[1m--- a/backend-node/middleware/validationMiddleware.js[m
[1m+++ b/backend-node/middleware/validationMiddleware.js[m
[36m@@ -1,8 +1,9 @@[m
[31m-const { validationResult } = require("express-validator")[m
[32