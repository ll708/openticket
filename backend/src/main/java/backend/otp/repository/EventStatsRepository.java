package backend.otp.repository;

import backend.otp.entity.EventStats;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventStatsRepository extends JpaRepository<EventStats, Long> {
    // 可加自訂查詢方法
}
