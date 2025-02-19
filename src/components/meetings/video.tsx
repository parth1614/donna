interface Video {
  url: string;
}
export function Video(url: Video) {
  return (
    <video width="320" height="240" controls preload="none">
      <source src="" type="video/mp4" />
      <track
        src="/path/to/captions.vtt"
        kind="subtitles"
        srcLang="en"
        label="English"
      />
      Your browser does not support the video tag.
    </video>
  );
}
