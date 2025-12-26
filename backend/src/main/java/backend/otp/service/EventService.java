package backend.otp.service;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import backend.otp.dto.EventDto;
import backend.otp.entity.EventJpa;
import backend.otp.entity.EventStatus;
import backend.otp.entity.EventTitlePageEntity;
import backend.otp.repository.EventRepositoryJPA;
import backend.otp.repository.EventTitlePageRepository;

@Service
public class EventService {
    @Autowired
    private EventRepositoryJPA eventsRepository;

    @Autowired
    private EventTitlePageRepository eventTitlePageRepository;

    @Cacheable(value = "events", key = "'all'")
    public List<EventDto> getAllEventsDto() {
        // 1. 取得所有可顯示的活動
        List<Integer> visibleStatuses = Arrays.asList(
            EventStatus.NOT_OPEN.getId(), 
            EventStatus.ONGOING.getId(), 
            EventStatus.OPEN_FOR_TICKET.getId()
        );
        List<EventJpa> events = eventsRepository.findAllByStatusIdIn(visibleStatuses);
        
        // 2. 取得所有圖片資訊
        List<EventTitlePageEntity> images = eventTitlePageRepository.findAllByOrderByCreatedAtDesc();
        
        // 3. 建立 Map
        Map<Long, String> imageMap = new HashMap<>();
        for (EventTitlePageEntity img : images) {
            imageMap.putIfAbsent(img.getEventId(), img.getImageUrl());
        }

        // 4. 轉換為 DTO
        return events.stream()
            .sorted(Comparator.comparing(EventJpa::getId).reversed())
            .map(eventJpa -> {
                String imageUrl = imageMap.getOrDefault(eventJpa.getId(), "/api/images/covers/test.jpg");
                imageUrl = processImageUrl(imageUrl);
                return new EventDto(
                    eventJpa.getId(),
                    imageUrl,
                    eventJpa.getAddress(),
                    eventJpa.getEvent_start() != null ? eventJpa.getEvent_start().toString() : "",
                    eventJpa.getEvent_end() != null ? eventJpa.getEvent_end().toString() : "",
                    eventJpa.getTitle(),
                    eventJpa.getStatusId());
            })
            .collect(Collectors.toList());
    }

    @Cacheable(value = "eventDetail", key = "#id")
    public Optional<EventDto> getEventDtoById(Long id) {
        return eventsRepository.findById(id)
            .filter(eventJpa -> EventStatus.isVisible(eventJpa.getStatusId()))
            .map(eventJpa -> {
                String imageUrl = eventTitlePageRepository.findFirstByEventIdOrderByCreatedAtDesc(id)
                    .map(img -> processImageUrl(img.getImageUrl()))
                    .orElse("/api/images/covers/test.jpg");

                return new EventDto(
                    eventJpa.getId(),
                    imageUrl,
                    eventJpa.getAddress(),
                    eventJpa.getEvent_start() != null ? eventJpa.getEvent_start().toString() : "",
                    eventJpa.getEvent_end() != null ? eventJpa.getEvent_end().toString() : "",
                    eventJpa.getTitle(),
                    eventJpa.getStatusId());
            });
    }

    private String processImageUrl(String url) {
        if (url == null || url.equals("/api/images/covers/test.jpg")) {
            return "/api/images/covers/test.jpg";
        }
        if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/api/images/covers/")) {
            return url;
        }
        if (url.startsWith("/api/files/covers/")) {
            return "/api/images/covers/" + url.substring("/api/files/covers/".length());
        }
        return "/api/images/covers/" + url;
    }

    public Optional<EventJpa> getEventById(Long id) {
        return eventsRepository.findById(id);
    }

    public List<EventJpa> getallEvent(){
        return eventsRepository.findAll();
    }
}
