package road.trip.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import road.trip.api.persistence.Trip;
import road.trip.api.persistence.TripRepository;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;
import java.util.Properties;

@Service
public class TripService {
    @Autowired
    private TripRepository tripRepository;

    @Autowired
    private UserService userService;

    public Trip findTripById(Long id) {
        return tripRepository.findById(id).get();
    }

    //public Trip findTripByUser(Long user_id) {
       // return tripRepository.findByUser_id(user_id);
    //}

    public Trip makeTrip (Trip trip) throws GeneralSecurityException, IOException, MessagingException {
        System.out.println("test1");
        System.out.println(trip);
        Trip t = tripRepository.save(trip);
        sendEmail(t);
        System.out.println(t);
        System.out.println("test2");

        return t;
    }

    public void sendEmail(Trip trip) {

        // email ID of Recipient.
        String recipient = userService.findAccountById(trip.getUser_id()).getEmail();

        // email ID of Sender.
        String sender = "travelz.trailblazers@gmail.com";

        String host = "https://trailblazers.gq/";

        // Getting system properties
        Properties properties = System.getProperties();

        // Setting up mail server
        properties.setProperty("mail.smtp.host", host);

        // creating session object to get properties
        Session session = Session.getDefaultInstance(properties);

        try {
            // MimeMessage object.
            MimeMessage message = new MimeMessage(session);

            // Set From Field: adding senders email to from field.
            message.setFrom(new InternetAddress(sender));

            // Set To Field: adding recipient's email to from field.
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(recipient));

            // Set Subject: subject of the email
            message.setSubject("Trip Confirmation: " + trip.getTripName());

            // set body of the email.
            message.setText("Hey Trailblazer!\nYour trip on " + trip.getDate() + " from " + trip.getStart()
            + " to " + trip.getEnd() + " has been confirmed.\nSee you then!");

            // Send email.
            Transport.send(message);
            System.out.println("Mail successfully sent");

        } catch (MessagingException mex) {
            mex.printStackTrace();
        }
    }

    public Trip editTrip(Trip trip) {

        Trip t = findTripById(trip.getTrip_id());
        t.setDate(trip.getDate());
        t.setEnd(trip.getEnd());
        t.setStart(trip.getStart());
        t.setTripName(trip.getTripName());
        t.setUser_id(trip.getUser_id());
        t.setSelectedRoute(trip.getSelectedRoute());

        return tripRepository.save(t);
    }

    public List<Trip> getTrips(){
        return tripRepository.findAll();
    }

    /*
    public Trip deleteTrip(Long trip_Id) {

    }

    public void chooseRoute(Long routeId) {

    }

    public void choosePlaylist(Long playlistId) {

    }

    public List<Playlist> getRecommendedPlaylists(Long tripId) {

    }
    */
}
