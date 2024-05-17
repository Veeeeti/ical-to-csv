// Disclaimer: this code was entirely written by ChatGPT 4.0
const ical = require('node-ical');
const csvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');

// Configure the CSV writer with headers corresponding to iCal event properties
const csvWriterInstance = csvWriter({
    path: 'output.csv',
    header: [
        {id: 'summary', title: 'SUMMARY'},
        {id: 'start', title: 'START'},
        {id: 'end', title: 'END'},
        {id: 'duration', title: 'DURATION'},
        {id: 'description', title: 'DESCRIPTION'},
        {id: 'location', title: 'LOCATION'},
        {id: 'organizer', title: 'ORGANIZER'},
        {id: 'status', title: 'STATUS'},
        {id: 'categories', title: 'CATEGORIES'},
        {id: 'rrule', title: 'RRULE'},
        {id: 'exdate', title: 'EXDATE'},
        {id: 'transp', title: 'TRANSP'},
        {id: 'sequence', title: 'SEQUENCE'},
        {id: 'attendees', title: 'ATTENDEES'},
        {id: 'url', title: 'URL'},
        {id: 'attach', title: 'ATTACH'},
        {id: 'lastModified', title: 'LAST-MODIFIED'},
        {id: 'uid', title: 'UID'},
        {id: 'dtstamp', title: 'DTSTAMP'}
    ]
});

// Helper function to format date values to ISO string, or return an empty string if date is not provided
function formatDate(date) {
    return date ? date.toISOString() : '';
}

// Formats attendees array into a string; handles missing attendee names
function formatAttendees(attendees) {
    if (!attendees) return '';
    return attendees.map(att => `${att.params.CN || 'N/A'} (${att.val})`).join('; ');
}

// Formats attachment information; handles different types (array or single object)
function formatAttachments(attachments) {
    if (!attachments) return '';
    if (Array.isArray(attachments)) {
        return attachments.map(attach => attach.uri || attach).join('; ');
    } else {
        return attachments.uri || String(attachments);
    }
}

// Main function to read iCal data from a file, parse it, and convert to CSV
function convertIcalToCsv(filePath) {
    fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
        if (err) {
            console.error('Error reading iCal file:', err);
            return;
        }

        // Parse the iCal data
        const eventsData = ical.parseICS(data);
        // Filter out entries that are not events and map their properties to CSV format
        const events = Object.values(eventsData).filter(event => event.type === 'VEVENT').map(event => ({
            summary: event.summary || '',
            start: formatDate(event.start),
            end: formatDate(event.end),
            duration: event.duration ? event.duration.toISOString() : '',
            description: event.description || '',
            location: event.location || '',
            organizer: event.organizer ? event.organizer.val : '',
            status: event.status || '',
            categories: event.categories ? event.categories.join(', ') : '',
            rrule: event.rrule ? event.rrule.toString() : '',
            exdate: event.exdate ? Object.keys(event.exdate).join(', ') : '',
            transp: event.transp || '',
            sequence: event.sequence || '',
            attendees: formatAttendees(event.attendees),
            url: event.url || '',
            attach: formatAttachments(event.attach),
            lastModified: formatDate(event.lastModified),
            uid: event.uid || '',
            dtstamp: formatDate(event.dtstamp)
        }));

        // Write the mapped event data to a CSV file
        csvWriterInstance.writeRecords(events)
            .then(() => {
                console.log('CSV file was written successfully');
            });
    });
}

// Replace 'path_to_ical_file.ics' with the path to your local iCal file
convertIcalToCsv('path_to_ical_file.ics');