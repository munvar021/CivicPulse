import React, { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faUserPlus,
  faCheckCircle,
  faPlay,
  faCalendarAlt,
  faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../utils/dateFormatter";
import ImageModal from "../ImageModal/imageModal";
import { useImageModal } from "../../hooks/useImageModal";
import {
  TimelineContainer,
  TimelineTitle,
  TimelineList,
  TimelineItem,
  TimelineDot,
  TimelineContent,
  TimelineDate,
  TimelineEventTitle,
  TimelineUpdatedBy,
  TimelineDescription,
  ImageGrid,
  TimelineImage,
  MetadataBox,
  MetadataText,
} from "./progressTimelineStyles";

const normalizeText = (value = "") =>
  value.trim().replace(/\s+/g, " ").toLowerCase();

const getEntityId = (value) =>
  value && typeof value === "object" ? value._id : value;

const getTimestamp = (value) => {
  const ts = new Date(value).getTime();
  return Number.isNaN(ts) ? null : ts;
};

const isDuplicateOfficerUpdate = (progressUpdate, timelineEvent) => {
  if (!progressUpdate || !timelineEvent) return false;
  if (timelineEvent.updatedByModel !== "Officer") return false;

  if (timelineEvent.status !== progressUpdate.status) return false;

  const timelineOfficerId = String(getEntityId(timelineEvent.updatedBy) || "");
  const progressOfficerId = String(getEntityId(progressUpdate.updatedBy) || "");

  if (
    timelineOfficerId &&
    progressOfficerId &&
    timelineOfficerId !== progressOfficerId
  ) {
    return false;
  }

  const timelineText = normalizeText(timelineEvent.description || "");
  const progressText = normalizeText(progressUpdate.remarks || "");
  const hasSameText = timelineText === progressText;

  if (!hasSameText) return false;

  const timelineTime = getTimestamp(timelineEvent.date);
  const progressTime = getTimestamp(progressUpdate.createdAt);

  if (timelineTime === null || progressTime === null) return false;

  return Math.abs(timelineTime - progressTime) <= 15000;
};

const ProgressTimeline = ({ timeline, progressUpdates }) => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const timelineRefs = useRef([]);
  const [modalImages, setModalImages] = useState([]);
  const { isOpen, currentIndex, openModal, closeModal, navigateToImage } =
    useImageModal(modalImages);
  const timelineItems = timeline || [];
  const allEvents = [];

  if (timelineItems.length > 0) {
    timelineItems.forEach((item) =>
      allEvents.push({ ...item, type: "timeline", date: item.date }),
    );
  }

  if (progressUpdates?.length > 0) {
    progressUpdates.forEach((update) => {
      const alreadyInTimeline = timelineItems.some((event) =>
        isDuplicateOfficerUpdate(update, event),
      );

      if (!alreadyInTimeline) {
        allEvents.push({ ...update, type: "progress", date: update.createdAt });
      }
    });
  }

  if (allEvents.length === 0) return null;

  const sortedEvents = allEvents.sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  useEffect(() => {
    const observers = timelineRefs.current.map((ref, index) => {
      if (!ref) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        },
        { threshold: 0.2 },
      );
      observer.observe(ref);
      return observer;
    });

    return () => observers.forEach((observer) => observer?.disconnect());
  }, [sortedEvents.length]);

  const getEventIcon = (event) => {
    if (event.type === "progress") {
      const statusIcons = {
        in_progress: faPlay,
        resolved: faCheckCircle,
        reassigned: faExchangeAlt,
        accepted: faCheckCircle,
      };
      return statusIcons[event.status] || faPlay;
    }
    const icons = {
      submitted: faFileAlt,
      assigned: faUserPlus,
      accepted: faCheckCircle,
      in_progress: faPlay,
      due_date_updated: faCalendarAlt,
      reassigned: faExchangeAlt,
      completed: faCheckCircle,
    };
    return icons[event.eventType?.toLowerCase()] || faFileAlt;
  };

  const formatEventType = (event) => {
    if (event.type === "progress") {
      return event.status
        .replace("_", " ")
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    }
    return (
      event.eventType
        ?.replace("_", " ")
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ") || "Update"
    );
  };

  const formatDateOnly = (date) => {
    const d = new Date(date);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${String(d.getDate()).padStart(2, "0")} ${months[d.getMonth()]}`;
  };

  const getUserRole = (model) =>
    ({
      Citizen: "Citizen",
      Admin: "Admin",
      SuperAdmin: "Admin",
      Officer: "Field Officer",
    })[model] || "System";

  return (
    <>
      <TimelineContainer>
        <TimelineTitle>Progress Timeline</TimelineTitle>
        <TimelineList>
          {sortedEvents.map((event, index) => (
            <TimelineItem
              key={index}
              index={index}
              isVisible={visibleItems.has(index)}
              ref={(el) => (timelineRefs.current[index] = el)}
            >
              <TimelineDot index={index}>
                <FontAwesomeIcon icon={getEventIcon(event)} />
              </TimelineDot>

              <TimelineContent>
                <TimelineDate>{formatDate(event.date)}</TimelineDate>
                <TimelineEventTitle>
                  {formatEventType(event)}
                </TimelineEventTitle>

                {event.type === "progress" ? (
                  <>
                    {event.updatedBy && (
                      <TimelineUpdatedBy>
                        Updated by: Field Officer
                        {event.updatedBy.name && ` - ${event.updatedBy.name}`}
                      </TimelineUpdatedBy>
                    )}
                    {event.remarks && (
                      <TimelineDescription>{event.remarks}</TimelineDescription>
                    )}
                    {event.images?.length > 0 && (
                      <ImageGrid>
                        {event.images.map((img, i) => (
                          <TimelineImage
                            key={i}
                            src={img}
                            alt={`Progress ${i + 1}`}
                            onClick={() => {
                              setModalImages(event.images);
                              setTimeout(() => openModal(i), 0);
                            }}
                          />
                        ))}
                      </ImageGrid>
                    )}
                  </>
                ) : (
                  <>
                    {event.updatedBy && (
                      <TimelineUpdatedBy>
                        Updated by: {getUserRole(event.updatedByModel)}
                        {event.updatedBy.name && ` - ${event.updatedBy.name}`}
                      </TimelineUpdatedBy>
                    )}
                    {event.description && (
                      <TimelineDescription>
                        "{event.description}"
                      </TimelineDescription>
                    )}
                    {event.eventType === "due_date_updated" &&
                      event.metadata && (
                        <MetadataBox>
                          <MetadataText>
                            Old: {formatDateOnly(event.metadata.oldDueDate)}
                          </MetadataText>
                          <MetadataText>
                            New: {formatDateOnly(event.metadata.newDueDate)}
                          </MetadataText>
                          {event.metadata.reason && (
                            <MetadataText>
                              Reason: {event.metadata.reason}
                            </MetadataText>
                          )}
                        </MetadataBox>
                      )}
                    {event.eventType === "reassigned" && event.metadata && (
                      <MetadataBox>
                        {event.metadata.fromOfficer && (
                          <MetadataText>
                            From: Officer{" "}
                            {event.metadata.fromOfficer.name || "N/A"}
                          </MetadataText>
                        )}
                        {event.metadata.toOfficer && (
                          <MetadataText>
                            To: Officer {event.metadata.toOfficer.name || "N/A"}
                          </MetadataText>
                        )}
                        {event.metadata.reason && (
                          <MetadataText>
                            Reason: {event.metadata.reason}
                          </MetadataText>
                        )}
                      </MetadataBox>
                    )}
                    {event.images?.length > 0 && (
                      <ImageGrid>
                        {event.images.map((img, i) => (
                          <TimelineImage
                            key={i}
                            src={img}
                            alt={`Event ${i + 1}`}
                            onClick={() => {
                              setModalImages(event.images);
                              setTimeout(() => openModal(i), 0);
                            }}
                          />
                        ))}
                      </ImageGrid>
                    )}
                  </>
                )}
              </TimelineContent>
            </TimelineItem>
          ))}
        </TimelineList>
      </TimelineContainer>
      <ImageModal
        isOpen={isOpen}
        onClose={closeModal}
        images={modalImages}
        currentIndex={currentIndex}
        onNavigate={navigateToImage}
      />
    </>
  );
};

export default ProgressTimeline;
