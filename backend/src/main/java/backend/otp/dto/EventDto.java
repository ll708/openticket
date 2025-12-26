package backend.otp.dto;

import java.io.Serializable;

public class EventDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private String image;
	private String address;
	private String eventStart;
	private String eventEnd;
	private String title;
	private Integer statusId;
	

	public EventDto() {}

	public EventDto(Long id, String image, String address, String eventStart, String eventEnd, String title, Integer statusId) {
		this.id = id;
		this.image = image;
		this.address = address;
		this.eventStart = eventStart;
		this.eventEnd = eventEnd;
		this.title = title;
		this.statusId = statusId;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getEventStart() {
		return eventStart;
	}

	public void setEventStart(String eventStart) {
		this.eventStart = eventStart;
	}

	public String getEventEnd() {
		return eventEnd;
	}

	public void setEventEnd(String eventEnd) {
		this.eventEnd = eventEnd;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Integer getStatusId() {
		return statusId;
	}

	public void setStatusId(Integer statusId) {
		this.statusId = statusId;
	}
}
