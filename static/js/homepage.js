google.load("gdata", "2.x", {packages: ["calendar"]});

google.setOnLoadCallback(function () {
  var service = new google.gdata.calendar.CalendarService("acm-events");
  var query = new google.gdata.calendar.CalendarEventQuery("http://www.google.com/calendar/feeds/acm@ccs.neu.edu/public/full");
  query.setOrderBy('starttime');
  query.setSortOrder('ascending');
  query.setFutureEvents(true);
  query.setMaxResults(5);
  var event_tmpl = tmpl("event_tmpl");
  var event_list = $("#events-list");
  service.getEventsFeed(query, function(root) {
    var entries = root.feed.getEntries();
    for(var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      var locations = entry.getLocations();
      var times = entry.getTimes();
      event_list.append(event_tmpl({title: entry.title.getText(),
                                    where: locations.length > 0 ? locations[0].getValueString() : "",
                                    when: times.length > 0 ? times[0].getStartTime().getDate().toString("M/d h:mmtt") : "",
                                    content: entry.content.getText() }));
    }
  })
});

$(function() {
  $("#photos").slickr("flickr.groups.pools.getPhotos",
                      {api_key: "f388a91007aa5feefe4437be2b65e86c",
                       group_id: "391770@N22", per_page: 5},
                     function(photos) {
                         photos.nivoSlider({width: 500, height: 375, effect: "boxRain",
                                            pauseTime: 8 * 1000, controlNav: false});
                     });
});
