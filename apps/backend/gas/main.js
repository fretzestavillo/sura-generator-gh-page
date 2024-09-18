"use strict";
// function doPost(e) {
//   // Parse the incoming POST request body
//   const body = e.postData.contents;
//   const bodyJSON = JSON.parse(body);
//   const suraPrize = bodyJSON.agent
//   testEmail(suraPrize)
//   // Return a response with CORS headers and a success status
//   return ContentService.createTextOutput(
//     JSON.stringify({ result: bodyJSON })
//   ).setMimeType(ContentService.MimeType.JSON);
// }
// function testEmail(sura){
//   // const sura = bodyJSON
//   GmailApp.sendEmail(
//     "fretzestavillo4444@gmail.com",
//     "lucky winner???",
//       `${sura}`
//   );
// }
function doGet() {
    const ss = SpreadsheetApp.openById("191-7sXPiff4ljNuJ-KgLupkezUDicdWMDKKqF0E4O5E");
    const ws = ss.getSheetByName("Party Ulam");
    if (!ws)
        return;
    const data = ws.getDataRange().getValues();
    const values = data[data.length - 1];
    const headers = [
        "timeStamp",
        "name",
        "religion",
        "allergies",
        "email",
        "number",
        "street",
        "city",
        "state",
        "zip",
        "id",
    ];
    const result = values.map((value, i) => ({
        [headers[i]]: value,
    }));
    const obj = Object.assign({}, ...result);
    createDocument(obj);
    // workingggggggggggggg   how to put time interval and get data after spin and POST it here so we can use it when creating email
    // createMap(obj, prize="Pinangat nga ayam!!!");
}
function createDocument(obj) {
    const doc = DocumentApp.create("secret69");
    const body = doc.getBody();
    //   const params = new URLSearchParams({ email: obj.id });
    //   const url = `https://mambo001.github.io/sura-generator/${params}`;
    const url = `https://mambo001.github.io/sura-generator/?id=${obj.id}`;
    console.log(url);
    body.appendParagraph(`

Dear ${obj.name},

Thank you for signing up for our contest! We are excited to have you participate in this opportunity to win amazing prizes.

To proceed and check if you are one of the lucky winners, please click the link below:
`);
    const linkText = body.appendParagraph("Click here to check if you're a lucky winner!");
    linkText.setLinkUrl(url);
    body.appendParagraph(`
We wish you the best of luck and hope you find your name among the winners!

Thank you once again for your participation, and we look forward to your continued engagement.

Best regards,
George
CEO
  `);
    doc.saveAndClose();
    //   sendEmail(doc, obj);
}
// function sendEmail(doc, obj){
//   GmailApp.sendEmail(
//     `${obj.email}`,
//     "lucky winner???",
//     "Please see the attached file.",
//     {
//       attachments: doc,
//       name: "Sura corp",
//     }
//   );
// }
// function createMap(obj, prize){
//   const streetAddsource = `${obj.street}, ${obj.city},  ${obj.state} ${obj.zip}`
//   // const addWay = "Uptown Mall, 9th Ave, Taguig, Metro Manila"
//   const streetAddTarget = "Sta. Teresita Parish (Archdiocese of Manila)"
//   // Get the directions.
// const directions = Maps.newDirectionFinder()
//     .setOrigin(streetAddsource)
//     // .addWaypoint(addWay)
//     .setDestination(streetAddTarget)
//     .setMode(Maps.DirectionFinder.Mode.DRIVING)
//     .getDirections();
// var route = directions.routes[0];
// // Set up marker styles.
// var markerSize = Maps.StaticMap.MarkerSize.SMALL;
// var markerColor = Maps.StaticMap.Color.RED
// var markerLetterCode = 'A'.charCodeAt();
// // Add markers to the map.
// var map = Maps.newStaticMap();
// for (var i = 0; i < route.legs.length; i++) {
//   var leg = route.legs[i];
//   if (i == 0) {
//     map.setMarkerStyle( markerSize, markerColor, String.fromCharCode(markerLetterCode));
//     map.addMarker(leg.start_location.lat, leg.start_location.lng);
//     markerLetterCode++;
//   }
//   map.setMarkerStyle(markerSize, markerColor, String.fromCharCode(markerLetterCode));
//   map.addMarker(leg.end_location.lat, leg.end_location.lng);
//   markerLetterCode++;
// }
// map.addPath(route.overview_polyline.points);
// // Send the map in an email.
// MailApp.sendEmail(
//   'fretzestavillo4444@gmail.com',
//   'Directions',
//   'Please open: ' + map.getMapUrl() + '&key=YOUR_API_KEY', {
//     htmlBody: `
// Dear ${obj.name},
// <br /><br />
// Congratulations! You Won <b>${prize}</b> <br /><br />
// We are thrilled to inform you that you have been selected as one of the lucky winners in our raffle! Your creativity and effort have truly shone through, and we are excited to reward you for your achievement.<br /><br />
// To claim your prize, please follow the direction below:<br /><br />
// Once again, congratulations! We look forward to seeing you soon and hope this prize brings you as much joy as your participation brought to us.<br /><br />
// Best regards,<br />
// George Malone<br />
// CEO<br /><br />
// See below.<br/><img src="cid:mapImage">`
// ,
//     inlineImages: {
//       mapImage: Utilities.newBlob(map.getMapImage(), 'image/png')
//     }
//   }
// );
// }
