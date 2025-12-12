package backend.otp.service;

import backend.otp.dto.EventStatsDto;
import backend.otp.dto.EventDailyStatsDto;
import backend.otp.entity.EventStats;
import backend.otp.entity.EventDailyStats;
import backend.otp.repository.EventStatsRepository;
import backend.otp.repository.EventDailyStatsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
public class EventStatsServiceImpl implements EventStatsService {
    @Autowired
    private EventStatsRepository eventStatsRepository;
    @Autowired
    private EventDailyStatsRepository eventDailyStatsRepository;

    @Override
    public EventStatsDto getStats(Long eventId) {
        EventStats stats = eventStatsRepository.findById(eventId).orElse(new EventStats());
        return new EventStatsDto(stats.getShares(), stats.getViews());
    }

    @Override
    @Transactional
    public void addView(Long eventId) {
        EventStats stats = eventStatsRepository.findById(eventId).orElseGet(() -> {
            EventStats s = new EventStats();
            s.setEventId(eventId);
            return s;
        });
        stats.setViews(stats.getViews() + 1);
        eventStatsRepository.save(stats);
    }

    @Override
    @Transactional
    public void addShare(Long eventId) {
        EventStats stats = eventStatsRepository.findById(eventId).orElseGet(() -> {
            EventStats s = new EventStats();
            s.setEventId(eventId);
            return s;
        });
        stats.setShares(stats.getShares() + 1);
        eventStatsRepository.save(stats);
    }

    @Override
    public EventDailyStatsDto getDailyStats(Long eventId, String date) {
        LocalDate statDate = LocalDate.parse(date);
        EventDailyStats stats = eventDailyStatsRepository.findByEventIdAndStatDate(eventId, statDate)
                .orElse(new EventDailyStats());
        return new EventDailyStatsDto(stats.getDayShares(), stats.getDayViews(), statDate);
    }

    @Override
    @Transactional
    public void addDailyView(Long eventId) {
        LocalDate today = LocalDate.now();
        EventDailyStats stats = eventDailyStatsRepository.findByEventIdAndStatDate(eventId, today)
                .orElseGet(() -> {
                    EventDailyStats s = new EventDailyStats();
                    s.setEventId(eventId);
                    s.setStatDate(today);
                    return s;
                });
        stats.setDayViews(stats.getDayViews() + 1);
        eventDailyStatsRepository.save(stats);
    }

    @Override
    @Transactional
    public void addDailyShare(Long eventId) {
        LocalDate today = LocalDate.now();
        EventDailyStats stats = eventDailyStatsRepository.findByEventIdAndStatDate(eventId, today)
                .orElseGet(() -> {
                    EventDailyStats s = new EventDailyStats();
                    s.setEventId(eventId);
                    s.setStatDate(today);
                    return s;
                });
        stats.setDayShares(stats.getDayShares() + 1);
        eventDailyStatsRepository.save(stats);
    }
}
