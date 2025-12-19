package backend.otp.entity;

public enum EventStatus {
    NOT_OPEN(1, "未開放"),
    ONGOING(2, "活動進行中"),
    ENDED(3, "已結束"),
    OPEN_FOR_TICKET(4, "開放購票"),
    CANCELLED(5, "已取消");

    private final int id;
    private final String description;

    EventStatus(int id, String description) {
        this.id = id;
        this.description = description;
    }

    public int getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public static boolean isVisible(Integer statusId) {
        if (statusId == null) return false;
        return statusId == NOT_OPEN.id || statusId == ONGOING.id || statusId == OPEN_FOR_TICKET.id;
    }
}
