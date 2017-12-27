import { computeSummary, PLATFORM, MULTIPLY } from "./answer"

const _ = console.log

const TEST_CASE = "Compute summary, no platform, multiply specified"

const ansArr1 = [
  {
    "multiply": {
      "ios": 1
    },
    "type": "PLATFORM",
    "img_url": "http://by.originally.us/howmuch/images/iphone-300x300.png",
    "title": "Create IOS App",
    "answerTxt": "ios",
    "answers": [
      {
        "multiply": {
          "ios": 1
        },
        "type": "PLATFORM",
        "img_url": "http://by.originally.us/howmuch/images/iphone-300x300.png",
        "title": "Create IOS App",
        "text": "ios"
      },
      {
        "multiply": {
          "android": 1
        },
        "type": "PLATFORM",
        "img_url": "http://by.originally.us/howmuch/images/android-300x300.png",
        "title": "Create Android App",
        "text": "android"
      },
      {
        "multiply": {
          "android": 1,
          "ios": 1
        },
        "type": "PLATFORM",
        "img_url": "http://by.originally.us/howmuch/images/baloons-300x300.png",
        "title": "Create IOS & Android App",
        "text": "both"
      },
      {
        "multiply": {
          "android": 0,
          "ios": 0
        },
        "type": "PLATFORM",
        "img_url": "http://by.originally.us/howmuch/images/no-300x300.png",
        "text": "No"
      }
    ],
    "order": 1,
    "questionTxt": "Which mobile platforms do you wish to build for?",
    "questionId": "5a1392c60b0f8d3f0571ea9c"
  },
  {
    "questionId": "5a1ce204310f7bc6b0f9b397",
    "questionTxt": "Which mobile platforms do you wish to build for?",
    "order": 1,
    "answers": [
      {
        "text": "ios",
        "title": "Create IOS App",
        "img_url": "http://by.originally.us/howmuch/images/iphone-300x300.png",
        "type": "PLATFORM",
        "multiply": {
          "ios": 1
        }
      },
      {
        "text": "android",
        "title": "Create Android App",
        "img_url": "http://by.originally.us/howmuch/images/android-300x300.png",
        "type": "PLATFORM",
        "multiply": {
          "android": 1
        }
      },
      {
        "text": "both",
        "title": "Create IOS & Android App",
        "img_url": "http://by.originally.us/howmuch/images/baloons-300x300.png",
        "type": "PLATFORM",
        "multiply": {
          "ios": 1,
          "android": 1
        }
      },
      {
        "text": "No",
        "img_url": "http://by.originally.us/howmuch/images/no-300x300.png",
        "type": "PLATFORM",
        "multiply": {
          "ios": 0,
          "android": 0
        }
      }
    ],
    "answerTxt": "android",
    "title": "Create Android App",
    "img_url": "http://by.originally.us/howmuch/images/android-300x300.png",
    "type": "PLATFORM",
    "multiply": {
      "android": 1
    }
  },
  {
    "multiply": {
      "web": 1
    },
    "type": "PLATFORM",
    "img_url": "http://by.originally.us/howmuch/images/browser-300x300.png",
    "title": "Create Web App",
    "answerTxt": "Yes",
    "answers": [
      {
        "multiply": {
          "web": 1
        },
        "type": "PLATFORM",
        "img_url": "http://by.originally.us/howmuch/images/browser-300x300.png",
        "title": "Create Web App",
        "text": "Yes"
      },
      {
        "multiply": {
          "web": 0
        },
        "type": "PLATFORM",
        "img_url": "http://by.originally.us/howmuch/images/no-300x300.png",
        "text": "No"
      }
    ],
    "order": 2,
    "questionTxt": "Do you want to build for web?",
    "questionId": "5a1ce204310f7bc6b0f9b398"
  },
  {
    "questionId": "5a1ce204310f7bc6b0f9b38f",
    "questionTxt": "Need a version for tablets?",
    "order": 3,
    "answers": [
      {
        "text": "iPads",
        "title": "Create iOS Tablet Version",
        "img_url": "http://by.originally.us/howmuch/images/ipad-300x300.png",
        "type": "MULTIPLY",
        "multiply": {
          "ios": 1.6
        },
        "platform": {
          "ios": true
        }
      },
      {
        "text": "Android tablets",
        "title": "Create Android Tablet Version",
        "img_url": "http://by.originally.us/howmuch/images/graph-300x300.png",
        "type": "MULTIPLY",
        "multiply": {
          "android": 1.6
        },
        "platform": {
          "android": true
        }
      },
      {
        "text": "Both",
        "title": "Create iOS & Android Tablet Version",
        "img_url": "http://by.originally.us/howmuch/images/baloons-300x300.png",
        "type": "MULTIPLY",
        "multiply": {
          "ios": 1.6,
          "android": 1.6
        },
        "platform": {
          "ios": true,
          "android": true
        }
      },
      {
        "text": "No",
        "img_url": "http://by.originally.us/howmuch/images/no-300x300.png",
        "type": "MULTIPLY",
        "multiply": {
          "ios": 1,
          "android": 1
        }
      }
    ],
    "answerTxt": "iPads",
    "title": "Create iOS Tablet Version",
    "img_url": "http://by.originally.us/howmuch/images/ipad-300x300.png",
    "type": "MULTIPLY",
    "multiply": {
      "ios": 1.6
    },
    "platform": {
      "ios": true
    }
  },
  {
    "fixed_pay": 1600,
    "pay": 0,
    "img_url": "http://by.originally.us/howmuch/images/pen-300x300.png",
    "title": "Need Logo Design",
    "answerTxt": "Yes",
    "answers": [
      {
        "fixed_pay": 1600,
        "pay": 0,
        "img_url": "http://by.originally.us/howmuch/images/pen-300x300.png",
        "title": "Need Logo Design",
        "text": "Yes"
      },
      {
        "fixed_pay": 0,
        "pay": 0,
        "img_url": "http://by.originally.us/howmuch/images/no-300x300.png",
        "text": "No"
      }
    ],
    "order": 4,
    "questionTxt": "Do you need us to design a logo for your app?",
    "questionId": "5a1ce204310f7bc6b0f9b399"
  },
  {
    "questionId": "5a1ce204310f7bc6b0f9b390",
    "questionTxt": "Do you have detailed drawings and plans on how each screen on your app will work?",
    "order": 5,
    "answers": [
      {
        "text": "Not Yet",
        "title": "Need Help With Requirements",
        "img_url": "http://by.originally.us/howmuch/images/box-300x300.png",
        "pay": 800,
        "fixed_pay": 5000
      },
      {
        "text": "Somewhat",
        "title": "Need Some Help With Requirements",
        "img_url": "http://by.originally.us/howmuch/images/brain-300x300.png",
        "pay": 0,
        "fixed_pay": 3000
      },
      {
        "text": "I have everything",
        "img_url": "http://by.originally.us/howmuch/images/bulb-300x300.png",
        "pay": 0,
        "fixed_pay": 1000
      }
    ],
    "answerTxt": "Not Yet",
    "title": "Need Help With Requirements",
    "img_url": "http://by.originally.us/howmuch/images/box-300x300.png",
    "pay": 800,
    "fixed_pay": 5000
  },
  {
    "fixed_pay": 3000,
    "pay": 6000,
    "img_url": "http://by.originally.us/howmuch/images/brush-300x300.png",
    "title": "Need Design and UX Work",
    "answerTxt": "Yes",
    "answers": [
      {
        "fixed_pay": 3000,
        "pay": 6000,
        "img_url": "http://by.originally.us/howmuch/images/brush-300x300.png",
        "title": "Need Design and UX Work",
        "text": "Yes"
      },
      {
        "fixed_pay": 0,
        "pay": 3000,
        "img_url": "http://by.originally.us/howmuch/images/no-300x300.png",
        "text": "No"
      }
    ],
    "order": 6,
    "questionTxt": "Do you need us to supply app designs and plan the user experiences (UX)?",
    "questionId": "5a1ce204310f7bc6b0f9b39a"
  },
  {
    "questionId": "5a1ce204310f7bc6b0f9b391",
    "questionTxt": "Do you require a login and signup mechanism for app users?",
    "order": 7,
    "answers": [
      {
        "fixed_pay": 0,
        "pay": 9600,
        "img_url": "http://by.originally.us/howmuch/images/suit-up-300x300.png",
        "text": "FB, Email & Mobile No."
      },
      {
        "fixed_pay": 0,
        "pay": 6400,
        "img_url": "http://by.originally.us/howmuch/images/like-300x300.png",
        "text": "Facebook & Email"
      },
      {
        "fixed_pay": 0,
        "pay": 3200,
        "img_url": "http://by.originally.us/howmuch/images/document-300x300.png",
        "text": "Email only"
      },
      {
        "fixed_pay": 0,
        "pay": 3200,
        "img_url": "",
        "text": "Mobile No. only"
      }
    ],
    "answerTxt": "Mobile No. only",
    "fixed_pay": 0,
    "pay": 3200,
    "img_url": ""
  },
  {
    "fixed_pay": 3000,
    "pay": 5000,
    "img_url": "http://by.originally.us/howmuch/images/mountain-300x300.png",
    "title": "App Retrieves Server Content",
    "answerTxt": "Yes",
    "answers": [
      {
        "fixed_pay": 3000,
        "pay": 5000,
        "img_url": "http://by.originally.us/howmuch/images/mountain-300x300.png",
        "title": "App Retrieves Server Content",
        "text": "Yes"
      },
      {
        "fixed_pay": 0,
        "pay": 3000,
        "img_url": "http://by.originally.us/howmuch/images/no-300x300.png",
        "text": "No"
      }
    ],
    "order": 8,
    "questionTxt": "Does your app retrieve content from the cloud or servers?",
    "questionId": "5a1ce204310f7bc6b0f9b39b"
  },
  {
    "questionId": "5a1ce204310f7bc6b0f9b39c",
    "questionTxt": "Do you need to automatically send SMSes to users? (For One-Time-Pins, alerts, etc)",
    "order": 9,
    "answers": [
      {
        "text": "Yes",
        "title": "SMS Gateway Integration",
        "img_url": "http://by.originally.us/howmuch/images/letter-300x300.png",
        "pay": 0,
        "fixed_pay": 2000
      },
      {
        "text": "No",
        "img_url": "http://by.originally.us/howmuch/images/no-300x300.png",
        "pay": 0,
        "fixed_pay": 0
      }
    ],
    "answerTxt": "Yes",
    "title": "SMS Gateway Integration",
    "img_url": "http://by.originally.us/howmuch/images/letter-300x300.png",
    "pay": 0,
    "fixed_pay": 2000
  },
  {
    "fixed_pay": 1500,
    "pay": 1000,
    "img_url": "http://by.originally.us/howmuch/images/paper-airplane-300x300.png",
    "title": "Push Notification Integration",
    "answerTxt": "Yes",
    "answers": [
      {
        "fixed_pay": 1500,
        "pay": 1000,
        "img_url": "http://by.originally.us/howmuch/images/paper-airplane-300x300.png",
        "title": "Push Notification Integration",
        "text": "Yes"
      },
      {
        "fixed_pay": 0,
        "pay": 0,
        "img_url": "http://by.originally.us/howmuch/images/no-300x300.png",
        "text": "No"
      }
    ],
    "order": 10,
    "questionTxt": "Do you need to send push Notifications to your app users?",
    "questionId": "5a1ce204310f7bc6b0f9b393"
  },
  {
    "questionId": "5a1ce204310f7bc6b0f9b395",
    "questionTxt": "Do you need to automatically send email to users? (Welcome emails, account verification emails, etc)",
    "order": 11,
    "answers": [
      {
        "text": "Yes",
        "title": "Automatically Send Emails",
        "img_url": "http://by.originally.us/howmuch/images/mailbox-300x300.png",
        "pay": 0,
        "fixed_pay": 1500
      },
      {
        "text": "No",
        "img_url": "http://by.originally.us/howmuch/images/no-300x300.png",
        "pay": 0,
        "fixed_pay": 0
      }
    ],
    "answerTxt": "Yes",
    "title": "Automatically Send Emails",
    "img_url": "http://by.originally.us/howmuch/images/mailbox-300x300.png",
    "pay": 0,
    "fixed_pay": 1500
  },
  {
    "fixed_pay": 5000,
    "pay": 2500,
    "img_url": "http://by.originally.us/howmuch/images/piggy-bank-300x300.png",
    "title": "In-App Payments",
    "answerTxt": "Yes",
    "answers": [
      {
        "fixed_pay": 5000,
        "pay": 2500,
        "img_url": "http://by.originally.us/howmuch/images/piggy-bank-300x300.png",
        "title": "In-App Payments",
        "text": "Yes"
      },
      {
        "fixed_pay": 0,
        "pay": 0,
        "img_url": "http://by.originally.us/howmuch/images/no-300x300.png",
        "text": "No"
      }
    ],
    "order": 12,
    "questionTxt": "Is there going to be payments within your app?",
    "questionId": "5a1ce204310f7bc6b0f9b396"
  },
  {
    "questionId": "5a1ce204310f7bc6b0f9b392",
    "questionTxt": "Do you need to track your users' locations or use maps?",
    "order": 13,
    "answers": [
      {
        "text": "Yes",
        "title": "Track User Locations or Use Maps",
        "img_url": "http://by.originally.us/howmuch/images/map-300x300.png",
        "pay": 1500,
        "fixed_pay": 1500
      },
      {
        "text": "No",
        "img_url": "http://by.originally.us/howmuch/images/no-300x300.png",
        "pay": 0,
        "fixed_pay": 0
      }
    ],
    "answerTxt": "No",
    "img_url": "http://by.originally.us/howmuch/images/no-300x300.png",
    "pay": 0,
    "fixed_pay": 0
  }
]
const expectedMultiplyTotal = 0
// const expectedSummary = (1000 + 500 * 0) + (1400 + 400 * 0)
const expectedSummary = 2400

const summary = computeSummary(ansArr1)

const pass = expectedSummary === summary

_("summary", summary)

pass ? _(`\x1b[42m[PASS]\x1b[0m ${TEST_CASE}`) : _(`\x1b[41m[FAIL]\x1b[0m ${TEST_CASE}`)
