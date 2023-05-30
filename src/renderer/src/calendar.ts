import dayjs from 'dayjs';

export async function getCalendarEvents(index, item, days, conf) {
  const start_date = dayjs().toISOString();
  const end_date = dayjs().add(days??1, 'day').toISOString();
  const params = encodeURI(`?start=${start_date}&end=${end_date}`);

  let host = conf.ha_url;
  let port = conf.ha_port;
  let token = conf.ha_token;

  if(host && port && token) {
    return new Promise((resolve, reject) => {
      fetch(`http://${host}:${port}/api/calendars/${item.entity_id}${params}`, {
        method: "GET",
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => { return res.json() })
      .then(res => {
        for(const element of res) {
          element.color = item.color??getColorByIndex(index);
          element.entity_id = item.entity_id;
          element.show_description = item.show_description;
        }
        resolve(res)
      })
    })
  }
};

export function formatCalendarEvents(events) {
  if (events && events.length > 0) {
    const groups = events.reduce((groups, event) => {
      const date = dayjs(event.start.dateTime).format('YYYY-MM-DD');

      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(event);
      return groups;
    }, {});

    const sortedStarts = Object.keys(groups).sort((a, b) => {
      const dateA = new Date(a).getTime();
      const dateB = new Date(b).getTime();
      return dateA - dateB;
    });

    const eventCounts = {};

    const groupArrays = sortedStarts.map(date => {
      const processedEvents = groups[date].map(event => {
        const eventType = event.entity_id;

        if (!eventCounts[eventType]) {
          eventCounts[eventType] = 1;
        } else {
          eventCounts[eventType]++;
        }

        return { ...event, type_count: eventCounts[eventType] };
      });

      return {
        date,
        events: processedEvents
      };
    });

    return groupArrays;
  }
}


export const COLORS = [
  "#44739e",
  "#984ea3",
  "#00d2d5",
  "#ff7f00",
  "#af8d00",
  "#7f80cd",
  "#b3e900",
  "#c42e60",
  "#a65628",
  "#f781bf",
  "#8dd3c7",
  "#bebada",
  "#fb8072",
  "#80b1d3",
  "#fdb462",
  "#fccde5",
  "#bc80bd",
  "#ffed6f",
  "#c4eaff",
  "#cf8c00",
  "#1b9e77",
  "#d95f02",
  "#e7298a",
  "#e6ab02",
  "#a6761d",
  "#0097ff",
  "#00d067",
  "#f43600",
  "#4ba93b",
  "#5779bb",
  "#927acc",
  "#97ee3f",
  "#bf3947",
  "#9f5b00",
  "#f48758",
  "#8caed6",
  "#f2b94f",
  "#eff26e",
  "#e43872",
  "#d9b100",
  "#9d7a00",
  "#698cff",
  "#d9d9d9",
  "#00d27e",
  "#d06800",
  "#009f82",
  "#c49200",
  "#cbe8ff",
  "#fecddf",
  "#c27eb6",
  "#8cd2ce",
  "#c4b8d9",
  "#f883b0",
  "#a49100",
  "#f48800",
  "#27d0df",
  "#a04a9b",
];

export function getColorByIndex(index: number) {
  return COLORS[index % COLORS.length];
}
