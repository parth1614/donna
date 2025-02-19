interface Speaker {
    _id: string;
    name: string;
    email: string;
    callId: string;
    currentUid: number;
    latitude: string;
    longitude: string;
    deviceMemory: number;
    isMobile: boolean;
    userJoined: boolean;
    userAgent: string;
    login: boolean;
    company: string;
    cookieCompany: string;
    coach: boolean;
    screen_sharing: boolean;
    created_at: number;
    updated_at: number;
    browserName: string;
    browserVersion: string;
    browser_name_api: string;
    os: string;
    joiningTime: number;
    downloadURL: string;
    leavingTime: number;
    totalTime: number;
    totalVisibleTime: number;
    vp: number;
    callInstanceId: string;
    source: string;
    talkToListenRatio: string | number;
    longestMonologue: string | number;
  }
  
  interface Recording {
    _id: string;
    recorded_video_url: string;
    audio_files: string[]; // Assuming an array, specify a type if available
    company: string;
    created_at: number;
    meetingId: string;
    recorded_uname: string;
    recordingId: string;
    source: string;
    summary_desc: string;
    summary_title: string;
    updated_at: number;
    video_duration: number;
    callInstanceId: string;
    recorded_video_url_aws: string;
    video_url_update: boolean;
    transcript_vtt_url: string;
  }
  
  interface Summary {
    summary_text: [string];
    action_items: string[];
    action_items2: string[];
    tldr: [boolean, string];
    summary_time_data: [string, number, number][][];
    items_time_data: string[][];
  }
  
  interface Apps {
    location: boolean;
    attentiveness: boolean;
    notes: boolean;
    annotation: boolean;
    screenshots: boolean;
    transcript: boolean;
  }
  
  export interface MeetingDetails {
    _id: string;
    callInstanceId: string;
    calendarEventId: string;
    calendar_event_visibility: string;
    client_client_id: string;
    company: string;
    docId: string;
    hostEmailId: string;
    hostUserId: string;
    logBy: string;
    meetingEndBy: string;
    meetingEndTime: number;
    meetingId: string;
    meetingStartTime: number;
    meetingStartedBy: string;
    scheduler_end_time: string;
    scheduler_start_time: string;
    source: string;
    title: string;
    user_name: string;
    attentiveness_score: number;
    speakers: Speaker[];
    host_image: string;
    recordings: Recording[];
    rating: number;
    call_rating: string[];
    totalMeetingTime: number;
    screenShareCount: number;
    screenShared: boolean;
    attendees: string;
    internal_meeting: boolean;
    quote: string;
    summary: Summary;
    annotation: Record<string, unknown>; // Assuming an object, specify a type if available
    notes: string[];
    screenshots: string[];
    apps: Apps;
  }
  