package backend.otp.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "event_daily_stats", schema = "otp")
public class EventDailyStats {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "day_shares")
    private Integer dayShares = 0;

    @Column(name = "day_views")
    private Integer dayViews = 0;

    @Column(name = "event_id")
    private Long eventId;

    @Column(name = "stat_date")
    private LocalDate statDate;

    // Getter/Setter
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Integer getDayShares() { return dayShares; }
    public void setDayShares(Integer dayShares) { this.dayShares = dayShares; }
    public Integer getDayViews() { return dayViews; }
    public void setDayViews(Integer dayViews) { this.dayViews = dayViews; }
    public Long getEventId() { return eventId; }
    public void setEventId(Long eventId) { this.eventId = eventId; }
    public LocalDate getStatDate() { return statDate; }
    public void setStatDate(LocalDate statDate) { this.statDate = statDate; }
}
