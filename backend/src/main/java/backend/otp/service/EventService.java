package backend.otp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.otp.entity.EventJpa;
import backend.otp.repository.EventRepositoryJPA;



@Service
public class EventService {
    @Autowired
    private EventRepositoryJPA eventsRepository;

    public Optional<EventJpa> getEventById(Long id) {//透過id取得活動資料
        return eventsRepository.findById(id);
    }

    public List<EventJpa> getallEvent(){
        return eventsRepository.findAll();
    }
    

}
