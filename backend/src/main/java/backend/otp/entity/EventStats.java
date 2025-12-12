package backend.otp.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "event_stats", schema = "otp")
public class EventStats {
    @Id
    @Column(name = "event_id")
    private Long eventId;

    @Column(name = "shares")
    private Integer shares = 0;

    @Column(name = "views")
    private Integer views = 0;

    // Getter/Setter
    public Long getEventId() { return eventId; }
    public void setEventId(Long eventId) { this.eventId = eventId; }
    public Integer getShares() { return shares; }
    public void setShares(Integer shares) { this.shares = shares; }
    public Integer getViews() { return views; }
    public void setViews(Integer views) { this.views = views; }
}
