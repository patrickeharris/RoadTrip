package road.trip.api.persistence;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@Entity
@Table(name = Notification.TABLE_NAME)
@AllArgsConstructor
@NoArgsConstructor
public class Notification {
    public static final String TABLE_NAME = "notifications";

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "notif_id")
    private Long notif_id;

    @Column(name = "user")
    Long user;

    @Column(name = "notif")
    String notification;

    @Column(name = "date")
    String date;

    @Column(name = "timestamp")
    LocalDate timestamp;

}
