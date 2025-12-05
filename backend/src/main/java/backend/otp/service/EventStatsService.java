package backend.otp.service;

import backend.otp.dto.EventStatsDto;
import backend.otp.dto.EventDailyStatsDto;

public interface EventStatsService {
    EventStatsDto getStats(Long eventId);
    void addView(Long eventId);
    void addShare(Long eventId);
    EventDailyStatsDto getDailyStats(Long eventId, String date);
    void addDailyView(Long eventId);
    void addDailyShare(Long eventId);
}
