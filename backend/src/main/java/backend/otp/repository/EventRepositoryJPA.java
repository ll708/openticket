package backend.otp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend.otp.entity.EventJpa;
import java.util.List;


@Repository
public interface EventRepositoryJPA extends JpaRepository<EventJpa, Long> {
    List<EventJpa> findAllByStatusIdIn(List<Integer> statusIds);
}
