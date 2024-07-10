import * as moment from "moment";
import { customAlphabet } from "nanoid";

export const nanoidUppercase = (length: number) => {
  const n = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", length);
  return n();
};

export const formatDateAgo = (date: string, short_format = false): string => {
  if (short_format) {
    const last_upd = moment(date);
    const now = moment(); // now
    const s = now.diff(last_upd, "seconds");
    const m = now.diff(last_upd, "minutes");
    const h = now.diff(last_upd, "h");
    const d = now.diff(last_upd, "days");
    const mth = now.diff(last_upd, "months");
    const y = now.diff(last_upd, "years");
    const duration = `${y ? `${y} y` : ""} ${
      mth && mth < 12 ? `${mth} mth` : ""
    } ${d && d < 30 ? `${d} d` : ""} ${h && h < 24 ? `${h} h` : ""} ${
      m && m < 60 ? `${m} m` : ""
    } ${s && s < 60 ? `${s} s` : ""}`;
    if (!duration.trim()) {
      return "now";
    } else {
      return duration;
    }
  } else {
    const last_upd = moment(date);
    const now = moment(); // now
    const s = now.diff(last_upd, "seconds");
    const m = now.diff(last_upd, "minutes");
    const h = now.diff(last_upd, "h");
    const d = now.diff(last_upd, "days");
    const mth = now.diff(last_upd, "months");
    const y = now.diff(last_upd, "years");
    const duration =
      `${y ? `${y} ${y === 1 ? "year" : "years"}` : ""} ${
        mth && mth < 12 ? `${mth} ${mth === 1 ? "month" : "months"}` : ""
      } ${d && d < 30 ? `${d} ${d === 1 ? "day" : "days"}` : ""} ${
        h && h < 24 ? `${h} ${h === 1 ? "hour" : "hours"}` : ""
      } ${m && m < 60 ? `${m} ${m === 1 ? "minute" : "minutes"}` : ""} ${
        s && s < 60 ? `${s} ${s === 1 ? "second" : "seconds"}` : ""
      }` + " ago";

    if (duration.trim() === "       ago".trim()) {
      return "now";
    } else {
      return duration;
    }
  }
};

export const formatText = (text: string) => {
  if (text != undefined && text != null) return text.replace(/\n/g, "<br>");
  else return "";
};

export const isAllowedMakeCaseFileType = (file: File): boolean => {
  const allowedExtensions: string[] = [
    "mp4",
    "avi",
    "mkv",
    "mov",
    "hevc",
    "h264",
    "pdf",
    "doc",
    "docx",
  ];
  const extension: string = file.name.split(".").pop()?.toLowerCase() || "";
  return allowedExtensions.includes(extension);
};
