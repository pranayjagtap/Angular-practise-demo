
package a;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.*;
import java.util.*;
public class AutoTimeOutMail{
public static void main(String[] args) {
String emailid="";
sendMail(emailid);

}
public static void sendMail(String emailid){
	final String email = emailid;
    final String username = "pranayjagtap@gmail.com";  // Alert sender
    final String password = "koyana15pjkoyana15";   // password here

    Properties props = new Properties();
    props.put("mail.smtp.auth", "true");
    props.put("mail.smtp.starttls.enable", "true");
    props.put("mail.smtp.host", "smtp.gmail.com");
    props.put("mail.smtp.port", "25");

    Session session = Session.getInstance(props,
      new javax.mail.Authenticator() {
        @Override
        protected PasswordAuthentication getPasswordAuthentication() {
            return new PasswordAuthentication(username, password);
        }
      });
    session.setDebug(true);

    try {

        Message message = new MimeMessage(session);
        message.setFrom(new InternetAddress(username));
        message.setRecipients(Message.RecipientType.TO,
            InternetAddress.parse(email));   // Alert recievers
        message.setSubject("Congratulations");
        message.setText("Congratulations now that you are happy with your career.");

        Transport.send(message);

        System.out.println("Done");

    } catch (MessagingException e) {
        throw new RuntimeException(e);
    }
}
}