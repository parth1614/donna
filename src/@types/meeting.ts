interface Speaker {
  os: string;
  vp: number;
  _id: string;
  name: string;
  coach: boolean;
  email: string;
  login: boolean;
  callId: string;
  source: string;
  company: string;
  isMobile: boolean;
  latitude: string;
  longitude: string;
  totalTime: number;
  userAgent: string;
  created_at: number;
  currentUid: number;
  updated_at: number;
  userJoined: boolean;
  browserName: string;
  downloadURL: string;
  joiningTime: number;
  leavingTime: number;
  deviceMemory: number;
  cookieCompany: string;
  browserVersion: string;
  callInstanceId: string;
  screen_sharing: boolean;
  browser_name_api: string;
  longestMonologue: string | number;
  totalVisibleTime: number;
  talkToListenRatio: string | number;
}

interface Recording {
  _id: string;
  source: string;
  company: string;
  meetingId: string;
  created_at: number;
  updated_at: number;
  audio_files: string[]; // Assuming an array, specify a type if available
  recordingId: string;
  summary_desc: string;
  summary_title: string;
  callInstanceId: string;
  recorded_uname: string;
  video_duration: number;
  video_url_update: boolean;
  recorded_video_url: string;
  transcript_vtt_url: string;
  recorded_video_url_aws: string;
}

export interface Meeting {
  attendees: {
    name: string;
    email: string;
  }[];
  id: number;
  created_at: string;
  agenda: string;
  meetingLink: string;
  ActionPoints: string[][];
  uuid: string;
  KeyPoints: string[]; // Assuming an array, specify a type if available
  Transcript: string;
  client_instance_id: string;
  isReady: boolean;
  speakers: Speaker[];
  summary: string;
  recordings: Recording[];
  meetingId: string;
  host_image: string;
  callInstanceId: string;
  meetingStartTime: string;
  title: string;
}
