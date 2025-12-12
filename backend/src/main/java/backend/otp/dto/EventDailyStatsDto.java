package backend.otp.dto;

import java.time.LocalDate;

public class EventDailyStatsDto {
    private Integer dayShares;
    private Integer dayViews;
    private LocalDate statDate;

    public EventDailyStatsDto(Integer dayShares, Integer dayViews, LocalDate statDate) {
        this.dayShares = dayShares;
        this.dayViews = dayViews;
        this.statDate = statDate;
    }

    public Integer getDayShares() { return dayShares; }
    public void setDayShares(Integer dayShares) { this.dayShares = dayShares; }
    public Integer getDayViews() { return dayViews; }
    public void setDayViews(Integer dayViews) { this.dayViews = dayViews; }
    public LocalDate getStatDate() { return statDate; }
    public void setStatDate(LocalDate statDate) { this.statDate = statDate; }
}
