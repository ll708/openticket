package backend.otp.controller;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import backend.otp.dto.*;
import backend.otp.entity.*;
import backend.otp.repository.*;
import backend.otp.service.EventService;
import backend.otp.service.EventStatsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/events")
@Tag(name = "Event API", description = "活動相關 API，提供活動查詢、統計、瀏覽與分享等功能")
public class EventController {
	private final EventStatsService eventStatsService;
	private final EventDetailRepository eventDetailRepository;
	private final EventRepositoryJPA eventRepositoryJPA;
	private final EventTitlePageRepository eventTitlePageRepository;
	private final EventService eventService;

	public EventController(EventStatsService eventStatsService,
			EventDetailRepository eventDetailRepository, EventRepositoryJPA eventRepositoryJPA,
			EventTitlePageRepository eventTitlePageRepository, EventService eventService) {
		this.eventStatsService = eventStatsService;
		this.eventDetailRepository = eventDetailRepository;
		this.eventRepositoryJPA = eventRepositoryJPA;
		this.eventTitlePageRepository = eventTitlePageRepository;
		this.eventService = eventService;
	}

	@Operation(summary = "取得所有活動列表", description = "回傳所有活動的基本資訊與封面圖")
	@GetMapping
	public ResponseEntity<List<EventDto>> getAllEvents() {
		try {
			List<EventDto> result = eventService.getAllEventsDto();
			return ResponseEntity.ok(result);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}

	// 取得單一活動
	@Operation(summary = "取得單一活動詳情", description = "根據活動 ID 回傳該活動的詳細資訊與封面圖")
	@GetMapping("/detail/{id}")
	public ResponseEntity<EventDto> getEventById(
			@Parameter(description = "活動 ID", required = true) @PathVariable Long id) {
		try {
			return eventService.getEventDtoById(id)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}

	// 取得單一活動介紹內容
	@Operation(summary = "取得單一活動介紹內容", description = "根據活動 ID 回傳活動介紹內容 (HTML/文字)")
	@GetMapping(value = "/intro/{id}", produces = "text/html;charset=UTF-8")
	public ResponseEntity<String> getEventIntro(
			@Parameter(description = "活動 ID", required = true) @PathVariable Long id) {
		try {
			return eventDetailRepository.findByEventId(id)
					.map(detail -> {
						String content = detail.getContent();
						return ResponseEntity.ok(content != null ? content : "");
					})
					.orElse(ResponseEntity.notFound().build());
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}

	// 取得活動總瀏覽/分享數
	@Operation(summary = "取得活動總瀏覽/分享數", description = "取得指定活動的總瀏覽數與分享數")
	@GetMapping("/{eventId}/stats")
	public ResponseEntity<EventStatsDto> getEventStats(
			@Parameter(description = "活動 ID", required = true) @PathVariable Long eventId) {
		EventStatsDto stats = eventStatsService.getStats(eventId);
		return ResponseEntity.ok(stats);
	}

	// 活動瀏覽量 +1
	@Operation(summary = "活動瀏覽量 +1", description = "指定活動的瀏覽量加 1")
	@PostMapping("/{eventId}/stats/view")
	public ResponseEntity<Void> addView(
			@Parameter(description = "活動 ID", required = true) @PathVariable Long eventId) {
		eventStatsService.addView(eventId);
		return ResponseEntity.ok().build();
	}

	// 活動分享量 +1
	@Operation(summary = "活動分享量 +1", description = "指定活動的分享量加 1")
	@PostMapping("/{eventId}/stats/share")
	public ResponseEntity<Void> addShare(
			@Parameter(description = "活動 ID", required = true) @PathVariable Long eventId) {
		eventStatsService.addShare(eventId);
		return ResponseEntity.ok().build();
	}

	// 取得活動每日瀏覽/分享數
	@Operation(summary = "取得活動每日瀏覽/分享數", description = "取得指定活動在指定日期的每日瀏覽與分享數")
	@GetMapping("/{eventId}/daily-stats")
	public ResponseEntity<EventDailyStatsDto> getDailyStats(
			@Parameter(description = "活動 ID", required = true) @PathVariable Long eventId,
			@Parameter(description = "日期 (yyyy-MM-dd)", required = true) @org.springframework.web.bind.annotation.RequestParam String date) {
		EventDailyStatsDto stats = eventStatsService.getDailyStats(eventId, date);
		return ResponseEntity.ok(stats);
	}

	// 活動每日瀏覽量 +1
	@Operation(summary = "活動每日瀏覽量 +1", description = "指定活動在今日的瀏覽量加 1")
	@PostMapping("/{eventId}/daily-stats/view")
	public ResponseEntity<Void> addDailyView(
			@Parameter(description = "活動 ID", required = true) @PathVariable Long eventId) {
		eventStatsService.addDailyView(eventId);
		return ResponseEntity.ok().build();
	}

	// 活動每日分享量 +1
	@Operation(summary = "活動每日分享量 +1", description = "指定活動在今日的分享量加 1")
	@PostMapping("/{eventId}/daily-stats/share")
	public ResponseEntity<Void> addDailyShare(
			@Parameter(description = "活動 ID", required = true) @PathVariable Long eventId) {
		eventStatsService.addDailyShare(eventId);
		return ResponseEntity.ok().build();
	}
}
