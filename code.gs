function CopyMyEventsContainKeyword() {
  /*
  あるカレンダーのイベントのうち, 特定のキーワードをタイトルに持つものを別のカレンダーにコピーする.
  すでにコピー済みのイベントはコピーしない (コピー先の該当時刻に同名のイベントが存在する場合にはコピーされない)
  */

  // ---------- 設定項目 ----------
  // カレンダーIDの調べ方: https://calendar.google.com/calendar/u/0/r/settings > マイカレンダーの設定 > カレンダーの統合 > カレンダーID

  const from_calendar = CalendarApp.getCalendarById("calendar_id_events_copy_from"); // イベントのコピー元のカレンダーのID
  const to_calendar = CalendarApp.getCalendarById("calendar_id_events_copy_to"); // イベントのコピー先のカレンダーのID
  const keywords = ["keyword1", "keyword2"]; // コピー元のイベントをフィルタする際のキーワード
  // -----------------------------

  console.log("Start to copy events. From: %s To: %s", from_calendar.getName(), to_calendar.getName());

  let startDate = new Date();
  let endDate = new Date();
  endDate.setMonth(endDate.getMonth()+12);

  const events = from_calendar.getEvents(startDate, endDate);

  for (let i=0; i<events.length; i++){
    e = events[i];
    title = e.getTitle();
    start = e.getStartTime();
    end = e.getEndTime();

    // コピー元のカレンダーのイベントのうち, イベントタイトルにキーワードを含むものに処理を実施
    if (doesTitleContainKeywords(title, keywords)){
      if (!doesEventAlreadyExist(to_calendar, e)){
        e = to_calendar.createEvent(title, start, end);
        e.setDescription(`This event was copied from ${from_calendar.getName()}`);
        console.log("Copy event: %s, %s", title, start.toDateString());
      }
      else{
        console.log("Skip copying the event: %s, %s, because the event already exists.", title, start.toDateString());
      }
    }
  }
}

function doesEventAlreadyExist(calendar, event){
  let is_duplicate = false
  duplicate_canditates = calendar.getEvents(event.getStartTime(), event.getEndTime())
  for (let j=0; j<duplicate_canditates.length; j++){
    if (duplicate_canditates[j].getTitle() === event.getTitle()){
      is_duplicate = true
    }
  }
  return is_duplicate
}

function doesTitleContainKeywords(title, keywords){
  let is_match = false
  for(let i=0; i<keywords.length; i++){
    if (title.match(keywords[i])){
      is_match = true;
    }
  }
  return is_match
}
