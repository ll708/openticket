package com.example.openticket.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.openticket.entity.EventJpa;



@Repository
public interface EventRepositoryJPA extends JpaRepository<EventJpa, Long> {
    }
