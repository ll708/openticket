package backend.otp.repository;

import backend.otp.entity.EventDailyStats;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.Optional;
import java.util.List;

public interface EventDailyStatsRepository extends JpaRepository<EventDailyStats, Long> {
    Optional<EventDailyStats> findByEventIdAndStatDate(Long eventId, LocalDate statDate);
    List<EventDailyStats> findAllByEventId(Long eventId);
}
