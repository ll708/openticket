package backend.otp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend.otp.entity.EventJpa;


@Repository
public interface EventRepositoryJPA extends JpaRepository<EventJpa, Long> {
    }
