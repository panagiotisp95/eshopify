import RNSmtpMailer from "react-native-smtp-mailer";

export async function sendEmail(email, str){
    var body = "We're glad you're here! Write the code provided below to your app and start buying or selling immediately."+
                "We can't wait to see you using our app."
                var response = null
    try {
        response = await RNSmtpMailer.sendMail({
            mailhost: "smtp.gmail.com",
            port: "465",
            ssl: true,
            username: "",
            password: "",
            from: "",
            recipients: email,
            subject: "Account Confirmation",
            htmlBody: "<div><h1>eShopify</h1></div><div><p>"+body+"</p></div><div><h3> Code: "+str+"</h3></div>",
        })
    }
    catch(err) {
        console.log(err)
        response = {error: err}
    }
    
    return await response;
}
