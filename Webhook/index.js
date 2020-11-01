'use strict';
 
const functions = require('firebase-functions');
const {dialogflow} = require ('actions-on-google');
const WELCOME_INTENT = 'Default Welcome Intent';
const FALLBACK_INTENT = 'Default Fallback Intent';
const CHECK_IN = 'checkin';
const YES = 'checkinyes'
const NO = 'checkinno'
const CHECK ='check'
const RESET = 'reset'
var meds=0
var med = "heart"
const app = dialogflow();
app.intent(WELCOME_INTENT, (conv) => {
    conv.ask("welcome to Med Loop");
    meds=0;
});
app.intent(RESET, (conv) => {
     conv.ask("reset complete");
     meds = 0;
});
app.intent(FALLBACK_INTENT, (conv) => {
    conv.ask("please repeat");
});
app.intent(CHECK_IN, (conv) => {
     conv.ask("Check in time! did you take your medication today");
     
});
app.intent(CHECK, (conv) => {
	 if (meds === 0){
	 conv.ask("you still have not taken your ".concat(med).concat(" medication"))
	 }
	 else{
     conv.ask("Looks like you've taken all your medication for the day");
     }
});
app.intent(YES, (conv) => {
    conv.ask("Awesome! Marking that down as complete");
    meds=1;
});
app.intent(NO, (conv) => {
    conv.ask("You need to take your ".concat(med).concat(" medication daily please do so soon") );
   
});
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);