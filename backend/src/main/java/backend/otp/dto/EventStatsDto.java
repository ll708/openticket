package backend.otp.dto;

public class EventStatsDto {
    private Integer shares;
    private Integer views;

    public EventStatsDto(Integer shares, Integer views) {
        this.shares = shares;
        this.views = views;
    }

    public Integer getShares() { return shares; }
    public void setShares(Integer shares) { this.shares = shares; }
    public Integer getViews() { return views; }
    public void setViews(Integer views) { this.views = views; }
}
