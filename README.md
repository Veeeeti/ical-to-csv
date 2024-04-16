# iCal to CSV Converter (node.js)

## Overview
This simple Node.js script converts iCal (.ics) files to CSV format.

## What is iCal?


## What is iCal?
iCal is a standard file format used by various calendar and scheduling applications to store calendar information. It typically includes details about events such as summaries, start and end times, descriptions, and more.

An iCal file (`.ics`), contains structured data for calendar events. It's used by many applications like Google Calendar, Apple Calendar (iCal), and Microsoft Outlook to exchange calendar information.

## Installation
1. Ensure Node.js is installed on your system.
2. Navigate to the script directory and run `npm install` to install the dependencies.
3. Place your iCal file to the root directory and replace `path_to_ical_file.ics` with the path to your local iCal file.

## Usage
Run the script using the command: `node convert.js`

Make sure to update the script with the correct path to your `.ics` file.

## iCal Variables Explanation
The script extracts and converts the following iCal properties into CSV format:

- **SUMMARY**: A brief description or title of the event.
- **START**: The starting date and time of the event.
- **END**: The ending date and time of the event.
- **DURATION**: The duration of the event. Used if an end time is not specified.
- **DESCRIPTION**: Detailed information about the event.
- **LOCATION**: The physical or virtual location of the event.
- **ORGANIZER**: The organizer of the event, often includes email.
- **STATUS**: Indicates the current status of the event (e.g., confirmed, tentative, cancelled).
- **CATEGORIES**: Categories or tags associated with the event.
- **RRULE**: Rule to define repeating occurrences of the event.
- **EXDATE**: Specifies exception dates when a recurring event does not occur.
- **TRANSP**: Indicates whether the event is transparent or opaque to busy time searches.
- **SEQUENCE**: Used in conjunction with the UID to identify revisions to the event.
- **ATTENDEES**: List of attendees, including their participation status and contact information.
- **URL**: A URL associated with the event for more information.
- **ATTACH**: Files or URLs attached to the event.
- **LAST-MODIFIED**: The timestamp when the event was last modified.
- **UID**: A unique identifier for the event.
- **DTSTAMP**: The date and time the instance of the iCal object was created.

## Notes
This script is configurable, and the CSV output can be adapted by modifying the CSV writer's header configuration to include more or fewer fields from the iCal data.


## Disclaimer
I've generated this entire code snippet and markdown with ChatGPT.

